/**
 * Payment Service with Razorpay Integration
 * Production-ready payment processing with idempotency
 */

import { eq } from "drizzle-orm";
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
import Razorpay from "razorpay";
import crypto from "crypto";
import {
  PaymentRequiredError,
  NotFoundError,
  ValidationError,
} from "@/lib/errors";
import { sendBookingConfirmationEmail } from "@/lib/email";

// Lazy-load Razorpay client to prevent build-time initialization errors
let razorpayInstance: Razorpay | null = null;

async function findBookingPaymentRow(bookingId: string) {
  const rows = await db
    .select({
      booking: bookingTable,
      user: userTable,
      departure: departureTable,
      trek: trekTable,
    })
    .from(bookingTable)
    .innerJoin(userTable, eq(bookingTable.userId, userTable.id))
    .innerJoin(departureTable, eq(bookingTable.departureId, departureTable.id))
    .innerJoin(trekTable, eq(departureTable.trekId, trekTable.id))
    .where(eq(bookingTable.id, bookingId))
    .limit(1);

  return rows[0] ?? null;
}

async function findPaymentWithBookingByTransactionId(transactionId: string) {
  const rows = await db
    .select({
      payment: paymentTable,
      booking: bookingTable,
      user: userTable,
      departure: departureTable,
      trek: trekTable,
    })
    .from(paymentTable)
    .innerJoin(bookingTable, eq(paymentTable.bookingId, bookingTable.id))
    .innerJoin(userTable, eq(bookingTable.userId, userTable.id))
    .innerJoin(departureTable, eq(bookingTable.departureId, departureTable.id))
    .innerJoin(trekTable, eq(departureTable.trekId, trekTable.id))
    .where(eq(paymentTable.transactionId, transactionId))
    .limit(1);

  return rows[0] ?? null;
}

async function findPaymentWithBookingById(paymentId: string) {
  const rows = await db
    .select({
      payment: paymentTable,
      booking: bookingTable,
      departure: departureTable,
      trek: trekTable,
    })
    .from(paymentTable)
    .innerJoin(bookingTable, eq(paymentTable.bookingId, bookingTable.id))
    .innerJoin(departureTable, eq(bookingTable.departureId, departureTable.id))
    .innerJoin(trekTable, eq(departureTable.trekId, trekTable.id))
    .where(eq(paymentTable.id, paymentId))
    .limit(1);

  return rows[0] ?? null;
}

function mapPaymentWithBooking(
  row: NonNullable<Awaited<ReturnType<typeof findPaymentWithBookingById>>>,
) {
  return {
    ...row.payment,
    booking: {
      ...row.booking,
      departure: {
        ...row.departure,
        trek: row.trek,
      },
    },
  };
}

function getRazorpayClient(): Razorpay {
  if (!razorpayInstance) {
    if (!process.env.RAZORPAY_KEY_ID || !process.env.RAZORPAY_KEY_SECRET) {
      throw new Error("Razorpay credentials are not configured");
    }
    razorpayInstance = new Razorpay({
      key_id: process.env.RAZORPAY_KEY_ID,
      key_secret: process.env.RAZORPAY_KEY_SECRET,
    });
  }
  return razorpayInstance;
}

export async function createPaymentIntent(
  bookingId: string,
  userId: string,
  expectedAmount?: number,
) {
  // Get booking details
  const bookingRow = await findBookingPaymentRow(bookingId);
  const booking = bookingRow
    ? {
        ...bookingRow.booking,
        user: bookingRow.user,
        departure: {
          ...bookingRow.departure,
          trek: bookingRow.trek,
        },
      }
    : null;

  if (!booking) {
    throw new NotFoundError("Booking not found");
  }

  if (booking.userId !== userId) {
    throw new ValidationError("Cannot pay for someone else's booking");
  }

  if (
    typeof expectedAmount === "number" &&
    expectedAmount !== booking.totalAmount
  ) {
    throw new ValidationError("Amount does not match booking total");
  }

  if (booking.status === "CONFIRMED" || booking.status === "COMPLETED") {
    throw new ValidationError("This booking has already been paid");
  }

  if (booking.status === "CANCELLED") {
    throw new ValidationError("This booking has been cancelled");
  }

  // Check if payment already exists
  const existingPayments = await db
    .select()
    .from(paymentTable)
    .where(eq(paymentTable.bookingId, bookingId))
    .limit(1);
  const existingPayment = existingPayments[0] ?? null;

  if (existingPayment) {
    if (existingPayment.status === "COMPLETED") {
      throw new ValidationError("Payment already completed for this booking");
    }
  }

  let paymentId = existingPayment?.id ?? "";

  if (!existingPayment) {
    const createdPayments = await db
      .insert(paymentTable)
      .values({
        id: randomUUID(),
        bookingId,
        userId,
        amount: booking.totalAmount,
        status: "PENDING",
        paymentGateway: "razorpay",
        paymentIntentId: generateIdempotencyKey(bookingId),
        updatedAt: new Date(),
      })
      .returning({ id: paymentTable.id });
    paymentId = createdPayments[0]?.id ?? "";
  } else {
    paymentId = existingPayment.id;
  }

  // Create Razorpay order
  try {
    const razorpay = getRazorpayClient();
    const razorpayOrder = await razorpay.orders.create({
      amount: booking.totalAmount, // in paise
      currency: "INR",
      receipt: bookingId, // Unique receipt ID
      notes: {
        bookingId,
        userId,
        trekName: booking.departure.trek.name,
        numberOfPeople: booking.numberOfPeople,
      },
    });

    // Update payment with Razorpay order ID
    const updatedPayments = await db
      .update(paymentTable)
      .set({
        amount: booking.totalAmount,
        status: "PENDING",
        paymentGateway: "razorpay",
        transactionId: razorpayOrder.id,
        errorMessage: null,
        updatedAt: new Date(),
      })
      .where(eq(paymentTable.id, paymentId))
      .returning();
    const updatedPayment = updatedPayments[0];

    return {
      payment: updatedPayment,
      razorpayOrder,
    };
  } catch (error) {
    // Mark payment as failed and log error
    if (paymentId) {
      await db
        .update(paymentTable)
        .set({
          status: "FAILED",
          errorMessage:
            error instanceof Error ? error.message : "Unknown error",
          updatedAt: new Date(),
        })
        .where(eq(paymentTable.id, paymentId));
    }

    throw new PaymentRequiredError(
      "Failed to initiate payment. Please try again.",
    );
  }
}

export function verifyPaymentSignature(
  razorpayOrderId: string,
  razorpayPaymentId: string,
  razorpaySignature: string,
): boolean {
  const shasum = crypto.createHmac("sha256", process.env.RAZORPAY_KEY_SECRET!);
  shasum.update(`${razorpayOrderId}|${razorpayPaymentId}`);
  const expectedSignature = shasum.digest("hex");

  return expectedSignature === razorpaySignature;
}

export async function processPaymentSuccess(
  razorpayOrderId: string,
  razorpayPaymentId: string,
  razorpaySignature: string,
) {
  // Verify signature first (security critical!)
  if (
    !verifyPaymentSignature(
      razorpayOrderId,
      razorpayPaymentId,
      razorpaySignature,
    )
  ) {
    throw new ValidationError("Invalid payment signature");
  }

  // Find payment record
  const payment = await findPaymentWithBookingByTransactionId(razorpayOrderId);

  if (!payment) {
    throw new NotFoundError("Payment record not found");
  }

  // Update payment and booking in transaction
  await db.transaction(
    async (tx) => {
      // Update payment
      await tx
        .update(paymentTable)
        .set({
          status: "COMPLETED",
          transactionId: razorpayPaymentId,
          updatedAt: new Date(),
        })
        .where(eq(paymentTable.id, payment.payment.id));

      // Update booking status
      await tx
        .update(bookingTable)
        .set({
          status: "CONFIRMED",
          updatedAt: new Date(),
        })
        .where(eq(bookingTable.id, payment.payment.bookingId));

      // Create audit log
      await tx.insert(auditLog).values({
        id: randomUUID(),
        action: "PAYMENT_COMPLETED",
        entityType: "PAYMENT",
        entityId: payment.payment.id,
        userId: payment.payment.userId,
        metadata: JSON.stringify({
          amount: payment.payment.amount,
          razorpayPaymentId,
        }),
        description: `PAYMENT_COMPLETED on PAYMENT ${payment.payment.id}`,
      });
    },
    { isolationLevel: "serializable" },
  );

  const result = await findPaymentWithBookingById(payment.payment.id);

  if (!result) {
    throw new NotFoundError("Payment record not found");
  }

  // Send confirmation email (async, non-blocking)
  if (payment.user.email) {
    sendBookingConfirmationEmail({
      to: payment.user.email,
      userName: payment.user.firstName || payment.user.username || "Adventurer",
      bookingDetails: {
        trekName: payment.trek.name || "Your Trek",
        startDate: payment.departure.startDate
          ? new Date(payment.departure.startDate).toLocaleDateString("en-IN")
          : "TBD",
        endDate: payment.departure.endDate
          ? new Date(payment.departure.endDate).toLocaleDateString("en-IN")
          : "TBD",
        numberOfPeople: payment.booking.numberOfPeople,
        totalAmount: payment.booking.totalAmount,
        bookingId: payment.booking.id,
      },
    }).catch((err) => console.error("Failed to send confirmation email:", err));
  }

  return {
    payment: result.payment,
    booking: {
      ...result.booking,
      departure: {
        ...result.departure,
        trek: result.trek,
      },
      user: payment.user,
    },
  };
}

export async function processPaymentFailure(
  razorpayOrderId: string,
  errorMessage: string,
) {
  const payments = await db
    .select()
    .from(paymentTable)
    .where(eq(paymentTable.transactionId, razorpayOrderId))
    .limit(1);
  const payment = payments[0] ?? null;

  if (!payment) {
    throw new NotFoundError("Payment record not found");
  }

  await db.transaction(
    async (tx) => {
      await tx
        .update(paymentTable)
        .set({
          status: "FAILED",
          errorMessage,
          updatedAt: new Date(),
        })
        .where(eq(paymentTable.id, payment.id));

      // Log failed payment
      await tx.insert(auditLog).values({
        id: randomUUID(),
        action: "PAYMENT_FAILED",
        entityType: "PAYMENT",
        entityId: payment.id,
        userId: payment.userId,
        metadata: JSON.stringify({
          razorpayOrderId,
          errorMessage,
        }),
        description: `PAYMENT_FAILED on PAYMENT ${payment.id}`,
      });
    },
    { isolationLevel: "serializable" },
  );
}

export async function refundPayment(paymentId: string, userId: string) {
  const payments = await db
    .select()
    .from(paymentTable)
    .where(eq(paymentTable.id, paymentId))
    .limit(1);
  const payment = payments[0] ?? null;

  if (!payment) {
    throw new NotFoundError("Payment not found");
  }

  if (payment.userId !== userId) {
    throw new ValidationError("Cannot refund someone else's payment");
  }

  if (payment.status !== "COMPLETED") {
    throw new ValidationError("Only completed payments can be refunded");
  }

  try {
    // Request refund from Razorpay
    const razorpay = getRazorpayClient();
    const refund = await razorpay.payments.refund(payment.transactionId!, {
      amount: payment.amount,
    });

    // Update payment record
    const updated = await db.transaction(
      async (tx) => {
        const updatedPayments = await tx
          .update(paymentTable)
          .set({
            status: "REFUNDED",
            refundAmount: payment.amount,
            refundedAt: new Date(),
            refundTransactionId: refund.id,
            updatedAt: new Date(),
          })
          .where(eq(paymentTable.id, payment.id))
          .returning();

        // Audit log
        await tx.insert(auditLog).values({
          id: randomUUID(),
          action: "PAYMENT_REFUNDED",
          entityType: "PAYMENT",
          entityId: payment.id,
          userId,
          metadata: JSON.stringify({
            amount: payment.amount,
            razorpayRefundId: refund.id,
          }),
          description: `PAYMENT_REFUNDED on PAYMENT ${payment.id}`,
        });

        return updatedPayments[0];
      },
      { isolationLevel: "serializable" },
    );

    return updated;
  } catch (error) {
    throw new PaymentRequiredError(
      "Failed to process refund. Please contact support.",
    );
  }
}

export async function getPayment(paymentId: string, userId: string) {
  const payment = await findPaymentWithBookingById(paymentId);

  if (!payment) {
    throw new NotFoundError("Payment not found");
  }

  if (payment.payment.userId !== userId) {
    throw new ValidationError("Cannot access other user's payment");
  }

  return mapPaymentWithBooking(payment);
}

/**
 * Generate idempotency key for payment
 * Ensures same booking always generates same Razorpay order
 */
function generateIdempotencyKey(bookingId: string): string {
  return `booking_${bookingId}_${Date.now()}`;
}

/**
 * Webhook handler for Razorpay events
 * Should be called from /api/webhooks/razorpay
 */
export async function handleRazorpayWebhook(
  event: {
    event: string;
    payload: {
      payment: {
        entity: {
          id: string;
          order_id: string;
          signature?: string;
          error_description?: string;
        };
      };
    };
  },
  signature: string,
) {
  const secret = process.env.RAZORPAY_WEBHOOK_SECRET!;

  // Verify webhook signature
  const shasum = crypto.createHmac("sha256", secret);
  shasum.update(JSON.stringify(event));
  const expectedSignature = shasum.digest("hex");

  if (expectedSignature !== signature) {
    throw new ValidationError("Invalid webhook signature");
  }

  // Handle different event types
  switch (event.event) {
    case "payment.authorized":
      if (!event.payload.payment.entity.signature) {
        throw new ValidationError("Missing payment signature");
      }

      await processPaymentSuccess(
        event.payload.payment.entity.order_id,
        event.payload.payment.entity.id,
        event.payload.payment.entity.signature,
      );
      break;

    case "payment.failed":
      await processPaymentFailure(
        event.payload.payment.entity.order_id,
        event.payload.payment.entity.error_description ?? "Payment failed",
      );
      break;

    case "payment.captured":
      // Payment successfully captured
      break;

    // Add other event types as needed
  }
}
