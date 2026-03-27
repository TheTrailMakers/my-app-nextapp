import { NextResponse } from "next/server";
import { randomUUID } from "node:crypto";
import { and, asc, eq, inArray, sql } from "drizzle-orm";
import db from "@/drizzle/db";
import { booking, departure, trek, userTable } from "@/drizzle/schema";
import { logAudit } from "@/lib/roleUtils";
import { requireApiRole } from "@/lib/apiAuth";
import type { SQL } from "drizzle-orm";

// GET /api/admin/departures - List all departures
export async function GET(request: Request) {
  const { response } = await requireApiRole("MODERATOR");

  if (response) {
    return response;
  }

  try {
    const { searchParams } = new URL(request.url);
    const trekId = searchParams.get("trekId");
    const status = searchParams.get("status");
    const page = parseInt(searchParams.get("page") || "1");
    const limit = Math.min(parseInt(searchParams.get("limit") || "20"), 100);

    const conditions: SQL[] = [];
    if (trekId) conditions.push(eq(departure.trekId, trekId));
    if (status) conditions.push(eq(departure.status, status));

    const where = conditions.length > 0 ? and(...conditions) : undefined;

    const [departures, totalRows] = await Promise.all([
      db
        .select({
          departure,
          trek: {
            id: trek.id,
            name: trek.name,
            slug: trek.slug,
          },
          trekLeader: {
            id: userTable.id,
            firstName: userTable.firstName,
            lastName: userTable.lastName,
            email: userTable.email,
          },
        })
        .from(departure)
        .innerJoin(trek, eq(departure.trekId, trek.id))
        .leftJoin(userTable, eq(departure.trekLeaderId, userTable.id))
        .where(where)
        .orderBy(asc(departure.startDate))
        .offset((page - 1) * limit)
        .limit(limit),
      db
        .select({ count: sql<number>`cast(count(*) as integer)` })
        .from(departure)
        .where(where),
    ]);

    const departureIds = departures.map((row) => row.departure.id);
    const bookingCounts =
      departureIds.length > 0
        ? await db
            .select({
              departureId: booking.departureId,
              count: sql<number>`cast(count(*) as integer)`,
            })
            .from(booking)
            .where(inArray(booking.departureId, departureIds))
            .groupBy(booking.departureId)
        : [];

    const bookingCountMap = new Map(
      bookingCounts.map((row) => [row.departureId, row.count]),
    );

    const normalizedDepartures = departures.map((row) => ({
      ...row.departure,
      trek: row.trek,
      trekLeader: row.trekLeader?.id ? row.trekLeader : null,
      _count: {
        bookings: bookingCountMap.get(row.departure.id) ?? 0,
      },
    }));

    const total = totalRows[0]?.count ?? 0;

    return NextResponse.json({
      success: true,
      departures: normalizedDepartures,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    console.error("Error fetching departures:", error);
    return NextResponse.json(
      { error: "Failed to fetch departures" },
      { status: 500 },
    );
  }
}

// POST /api/admin/departures - Create new departure
export async function POST(request: Request) {
  const { response, user: adminUser } = await requireApiRole("ADMIN");

  if (response) {
    return response;
  }

  try {
    const body = await request.json();
    const {
      trekId,
      startDate,
      endDate,
      totalSeats,
      pricePerPerson,
      trekLeaderId,
      trekLeaderName,
      maxWaitlist,
    } = body;

    const departureStartDate = new Date(startDate);
    const existing = await db
      .select({ id: departure.id })
      .from(departure)
      .where(
        and(
          eq(departure.trekId, trekId),
          eq(departure.startDate, departureStartDate),
        ),
      )
      .limit(1);

    if (existing[0]) {
      return NextResponse.json(
        { error: "Departure already exists for this trek on this date" },
        { status: 400 },
      );
    }

    const departureId = randomUUID();

    await db.insert(departure).values({
      id: departureId,
      trekId,
      startDate: departureStartDate,
      endDate: new Date(endDate),
      totalSeats: parseInt(totalSeats),
      seatsAvailable: parseInt(totalSeats),
      pricePerPerson: parseInt(pricePerPerson),
      trekLeaderId: trekLeaderId || null,
      trekLeaderName: trekLeaderName || null,
      maxWaitlist: maxWaitlist ? parseInt(maxWaitlist) : 5,
      status: "OPEN",
      updatedAt: new Date(),
    });

    await logAudit(
      "DEPARTURE_CREATED",
      "DEPARTURE",
      departureId,
      adminUser.id,
      { trekId, startDate, totalSeats },
    );

    const createdDeparture = await db
      .select()
      .from(departure)
      .where(eq(departure.id, departureId))
      .limit(1);

    return NextResponse.json(
      {
        success: true,
        departure: createdDeparture[0],
      },
      { status: 201 },
    );
  } catch (error) {
    console.error("Error creating departure:", error);
    return NextResponse.json(
      { error: "Failed to create departure" },
      { status: 500 },
    );
  }
}

// PATCH /api/admin/departures - Update departure (capacity, status, etc.)
export async function PATCH(request: Request) {
  const { response, user: adminUser } = await requireApiRole("ADMIN");

  if (response) {
    return response;
  }

  try {
    const body = await request.json();
    const {
      departureId,
      totalSeats,
      pricePerPerson,
      trekLeaderId,
      trekLeaderName,
      status,
      maxWaitlist,
      isCancelled,
      cancellationReason,
    } = body;

    if (!departureId) {
      return NextResponse.json(
        { error: "Departure ID is required" },
        { status: 400 },
      );
    }

    // Get current departure to check booked seats
    const current = await db
      .select({
        id: departure.id,
        totalSeats: departure.totalSeats,
        seatsAvailable: departure.seatsAvailable,
      })
      .from(departure)
      .where(eq(departure.id, departureId))
      .limit(1);

    const existingDeparture = current[0];

    if (!existingDeparture) {
      return NextResponse.json(
        { error: "Departure not found" },
        { status: 404 },
      );
    }

    // If trying to decrease capacity, check if booked seats allow it
    if (totalSeats && parseInt(totalSeats) < existingDeparture.totalSeats) {
      const bookedSeats =
        existingDeparture.totalSeats - existingDeparture.seatsAvailable;
      if (parseInt(totalSeats) < bookedSeats) {
        return NextResponse.json(
          {
            error: `Cannot decrease capacity below booked seats (${bookedSeats})`,
          },
          { status: 400 },
        );
      }
    }

    const updateData: {
      totalSeats?: number;
      seatsAvailable?: number;
      pricePerPerson?: number;
      trekLeaderId?: string | null;
      trekLeaderName?: string | null;
      status?: string;
      maxWaitlist?: number;
      isCancelled?: boolean;
      cancellationReason?: string | null;
      updatedAt: Date;
    } = {
      updatedAt: new Date(),
    };
    if (totalSeats !== undefined) {
      const newTotal = parseInt(totalSeats);
      const bookedSeats =
        existingDeparture.totalSeats - existingDeparture.seatsAvailable;
      updateData.totalSeats = newTotal;
      updateData.seatsAvailable = newTotal - bookedSeats;
    }
    if (pricePerPerson !== undefined)
      updateData.pricePerPerson = parseInt(pricePerPerson);
    if (trekLeaderId !== undefined)
      updateData.trekLeaderId = trekLeaderId || null;
    if (trekLeaderName !== undefined)
      updateData.trekLeaderName = trekLeaderName || null;
    if (status !== undefined) updateData.status = status;
    if (maxWaitlist !== undefined)
      updateData.maxWaitlist = parseInt(maxWaitlist);
    if (isCancelled !== undefined) {
      updateData.isCancelled = isCancelled;
      if (isCancelled) {
        updateData.cancellationReason =
          cancellationReason || "Cancelled by admin";
      } else {
        updateData.cancellationReason = null;
      }
    }

    await db
      .update(departure)
      .set(updateData)
      .where(eq(departure.id, departureId));

    const updatedDeparture = await db
      .select()
      .from(departure)
      .where(eq(departure.id, departureId))
      .limit(1);

    await logAudit(
      "DEPARTURE_UPDATED",
      "DEPARTURE",
      departureId,
      adminUser.id,
      updateData,
    );

    return NextResponse.json({
      success: true,
      departure: updatedDeparture[0],
    });
  } catch (error) {
    console.error("Error updating departure:", error);
    return NextResponse.json(
      { error: "Failed to update departure" },
      { status: 500 },
    );
  }
}
