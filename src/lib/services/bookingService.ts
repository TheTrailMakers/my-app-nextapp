/**
 * Booking Service with Transaction Logic
 * Handles seat availability checks and atomic operations
 * CRITICAL: Prevents race conditions in concurrent booking scenarios
 */

import { and, desc, eq, gte, sql } from "drizzle-orm";
import { randomUUID } from "node:crypto";
import db from "@/drizzle/db";
import {
  auditLog,
  booking as bookingTable,
  departure as departureTable,
  payment as paymentTable,
  trek as trekTable,
  userTable,
} from "@/drizzle/schema";
import {
  InsufficientSeatsError,
  DuplicateBookingError,
  NotFoundError,
  ValidationError,
} from "@/lib/errors";

function isDatabaseError(error: unknown): error is { code?: string } {
  return Boolean(error && typeof error === "object" && "code" in error);
}

async function findBookingDetailsRow(bookingId: string) {
  const rows = await db
    .select({
      booking: bookingTable,
      user: userTable,
      departure: departureTable,
      trek: trekTable,
      payment: paymentTable,
    })
    .from(bookingTable)
    .innerJoin(userTable, eq(bookingTable.userId, userTable.id))
    .innerJoin(departureTable, eq(bookingTable.departureId, departureTable.id))
    .innerJoin(trekTable, eq(departureTable.trekId, trekTable.id))
    .leftJoin(paymentTable, eq(paymentTable.bookingId, bookingTable.id))
    .where(eq(bookingTable.id, bookingId))
    .limit(1);

  return rows[0] ?? null;
}

function mapBookingDetails(
  row: NonNullable<Awaited<ReturnType<typeof findBookingDetailsRow>>>,
) {
  const { booking, user, departure, trek, payment } = row;

  return {
    ...booking,
    user: {
      id: user.id,
      email: user.email,
      username: user.username,
    },
    departure: {
      ...departure,
      trek,
    },
    payment,
  };
}

function mapUserBookingRow(row: {
  booking: typeof bookingTable.$inferSelect;
  departure: typeof departureTable.$inferSelect;
  trek: typeof trekTable.$inferSelect;
  payment: typeof paymentTable.$inferSelect | null;
}) {
  const { booking, departure, trek, payment } = row;

  return {
    ...booking,
    departure: {
      ...departure,
      trek,
    },
    payment,
  };
}

export async function createBooking(
  userId: string,
  departureId: string,
  numberOfPeople: number,
  contactName: string,
  contactPhone: string,
  contactEmail: string,
) {
  // Validate departure exists and isn't cancelled
  const departureRows = await db
    .select({
      departure: departureTable,
      trek: trekTable,
    })
    .from(departureTable)
    .innerJoin(trekTable, eq(departureTable.trekId, trekTable.id))
    .where(eq(departureTable.id, departureId))
    .limit(1);
  const departure = departureRows[0]?.departure;

  if (!departure) {
    throw new NotFoundError("Departure not found");
  }

  if (departure.isCancelled) {
    throw new ValidationError("This trek departure has been cancelled");
  }

  if (numberOfPeople > departure.seatsAvailable) {
    throw new InsufficientSeatsError();
  }

  // Execute booking creation in a transaction
  // This ensures atomicity: either all operations succeed or all rollback
  let newBookingId = "";

  try {
    await db.transaction(
      async (tx) => {
        // Step 1: Check for duplicate booking (user already booked this departure)
        const existingBooking = await tx
          .select({ id: bookingTable.id })
          .from(bookingTable)
          .where(
            and(
              eq(bookingTable.userId, userId),
              eq(bookingTable.departureId, departureId),
            ),
          )
          .limit(1);

        if (existingBooking.length > 0) {
          throw new DuplicateBookingError();
        }

        // Step 2 and 3: atomically reserve seats only if still available.
        const updatedDeparture = await tx
          .update(departureTable)
          .set({
            seatsAvailable: sql`${departureTable.seatsAvailable} - ${numberOfPeople}`,
            updatedAt: new Date(),
          })
          .where(
            and(
              eq(departureTable.id, departureId),
              eq(departureTable.isCancelled, false),
              gte(departureTable.seatsAvailable, numberOfPeople),
            ),
          )
          .returning({ id: departureTable.id });

        if (updatedDeparture.length === 0) {
          const latestDeparture = await tx
            .select({
              id: departureTable.id,
              isCancelled: departureTable.isCancelled,
              seatsAvailable: departureTable.seatsAvailable,
            })
            .from(departureTable)
            .where(eq(departureTable.id, departureId))
            .limit(1);

          if (latestDeparture.length === 0) {
            throw new NotFoundError("Departure not found");
          }

          if (latestDeparture[0].isCancelled) {
            throw new ValidationError("This trek departure has been cancelled");
          }

          throw new InsufficientSeatsError();
        }

        const totalAmount = numberOfPeople * departure.pricePerPerson;
        const insertedBookings = await tx
          .insert(bookingTable)
          .values({
            id: randomUUID(),
            userId,
            departureId,
            numberOfPeople,
            totalAmount,
            contactName,
            contactPhone,
            contactEmail,
            status: "PENDING",
            updatedAt: new Date(),
          })
          .returning({ id: bookingTable.id });

        newBookingId = insertedBookings[0]?.id ?? "";

        await tx.insert(auditLog).values({
          id: randomUUID(),
          action: "BOOKING_CREATED",
          entityType: "BOOKING",
          entityId: newBookingId,
          userId,
          metadata: JSON.stringify({
            departureId,
            numberOfPeople,
            totalAmount,
          }),
          description: `BOOKING_CREATED on BOOKING ${newBookingId}`,
        });
      },
      {
        isolationLevel: "serializable",
      },
    );
  } catch (error) {
    if (error instanceof DuplicateBookingError) {
      throw error;
    }

    if (isDatabaseError(error) && error.code === "23505") {
      throw new DuplicateBookingError();
    }

    throw error;
  }

  return getBooking(newBookingId, userId);
}

export async function confirmBookingForTest(bookingId: string, userId: string) {
  const bookingRow = await findBookingDetailsRow(bookingId);
  const booking = bookingRow ? mapBookingDetails(bookingRow) : null;

  if (!booking) {
    throw new NotFoundError("Booking not found");
  }

  if (booking.userId !== userId) {
    throw new ValidationError("Cannot confirm someone else's booking");
  }

  if (booking.status !== "PENDING") {
    throw new ValidationError("Booking is not pending");
  }

  const transactionId = `test_${bookingId}_${Date.now()}`;

  await db.transaction(
    async (tx) => {
      await tx
        .update(bookingTable)
        .set({
          status: "CONFIRMED",
          updatedAt: new Date(),
        })
        .where(eq(bookingTable.id, bookingId));

      await tx
        .insert(paymentTable)
        .values({
          id: randomUUID(),
          bookingId,
          userId,
          amount: booking.totalAmount,
          status: "COMPLETED",
          paymentGateway: "razorpay",
          transactionId,
          metadata: JSON.stringify({ testMode: true }),
          updatedAt: new Date(),
        })
        .onConflictDoUpdate({
          target: paymentTable.bookingId,
          set: {
            status: "COMPLETED",
            transactionId,
            metadata: JSON.stringify({ testMode: true }),
            updatedAt: new Date(),
          },
        });
    },
    { isolationLevel: "serializable" },
  );

  return getBooking(bookingId, userId);
}

export async function cancelBooking(bookingId: string, userId: string) {
  const bookingRow = await findBookingDetailsRow(bookingId);
  const booking = bookingRow ? mapBookingDetails(bookingRow) : null;

  if (!booking) {
    throw new NotFoundError("Booking not found");
  }

  if (booking.userId !== userId) {
    throw new ValidationError("Cannot cancel someone else's booking");
  }

  if (booking.status === "CANCELLED") {
    throw new ValidationError("Booking is already cancelled");
  }

  if (booking.status === "COMPLETED") {
    throw new ValidationError("Cannot cancel a completed trek booking");
  }

  await db.transaction(
    async (tx) => {
      // Return seats to availability
      await tx
        .update(departureTable)
        .set({
          seatsAvailable: sql`${departureTable.seatsAvailable} + ${booking.numberOfPeople}`,
          updatedAt: new Date(),
        })
        .where(eq(departureTable.id, booking.departureId));

      // Update booking status
      await tx
        .update(bookingTable)
        .set({
          status: "CANCELLED",
          cancelledAt: new Date(),
          updatedAt: new Date(),
        })
        .where(eq(bookingTable.id, bookingId));

      // If payment was completed, mark for refund
      const payment = await tx
        .select({
          id: paymentTable.id,
          amount: paymentTable.amount,
          status: paymentTable.status,
        })
        .from(paymentTable)
        .where(eq(paymentTable.bookingId, bookingId))
        .limit(1);

      if (payment[0] && payment[0].status === "COMPLETED") {
        await tx
          .update(paymentTable)
          .set({
            status: "REFUNDED",
            refundAmount: payment[0].amount,
            refundedAt: new Date(),
            updatedAt: new Date(),
          })
          .where(eq(paymentTable.id, payment[0].id));
      }

      // Audit log
      await tx.insert(auditLog).values({
        id: randomUUID(),
        action: "BOOKING_CANCELLED",
        entityType: "BOOKING",
        entityId: bookingId,
        userId,
        metadata: JSON.stringify({
          seatsReturned: booking.numberOfPeople,
        }),
        description: `BOOKING_CANCELLED on BOOKING ${bookingId}`,
      });
    },
    { isolationLevel: "serializable" },
  );

  return getBooking(bookingId, userId);
}

export async function getBooking(bookingId: string, userId: string) {
  const row = await findBookingDetailsRow(bookingId);

  if (!row) {
    throw new NotFoundError("Booking not found");
  }

  if (row.booking.userId !== userId) {
    throw new ValidationError("Cannot access someone else's booking");
  }

  return mapBookingDetails(row);
}

export async function getUserBookings(
  userId: string,
  page: number = 1,
  limit: number = 10,
) {
  const skip = (page - 1) * limit;

  const [rows, totalRows] = await Promise.all([
    db
      .select({
        booking: bookingTable,
        departure: departureTable,
        trek: trekTable,
        payment: paymentTable,
      })
      .from(bookingTable)
      .innerJoin(
        departureTable,
        eq(bookingTable.departureId, departureTable.id),
      )
      .innerJoin(trekTable, eq(departureTable.trekId, trekTable.id))
      .leftJoin(paymentTable, eq(paymentTable.bookingId, bookingTable.id))
      .where(eq(bookingTable.userId, userId))
      .orderBy(desc(bookingTable.createdAt))
      .limit(limit)
      .offset(skip),
    db
      .select({ count: sql<number>`cast(count(*) as integer)` })
      .from(bookingTable)
      .where(eq(bookingTable.userId, userId)),
  ]);

  const bookings = rows.map(mapUserBookingRow);
  const total = totalRows[0]?.count ?? 0;

  return {
    bookings,
    pagination: {
      page,
      limit,
      total,
      pages: Math.ceil(total / limit),
    },
  };
}

export async function checkAvailability(departureId: string) {
  const rows = await db
    .select({
      id: departureTable.id,
      totalSeats: departureTable.totalSeats,
      seatsAvailable: departureTable.seatsAvailable,
      isCancelled: departureTable.isCancelled,
      trekName: trekTable.name,
    })
    .from(departureTable)
    .innerJoin(trekTable, eq(departureTable.trekId, trekTable.id))
    .where(eq(departureTable.id, departureId))
    .limit(1);
  const departure = rows[0];

  if (!departure) {
    throw new NotFoundError("Departure not found");
  }

  return {
    departureId,
    trekName: departure.trekName,
    totalSeats: departure.totalSeats,
    seatsAvailable: departure.seatsAvailable,
    seatsBooked: departure.totalSeats - departure.seatsAvailable,
    occupancyRate: (
      ((departure.totalSeats - departure.seatsAvailable) /
        departure.totalSeats) *
      100
    ).toFixed(1),
    isCancelled: departure.isCancelled,
    isAvailable: !departure.isCancelled && departure.seatsAvailable > 0,
  };
}
