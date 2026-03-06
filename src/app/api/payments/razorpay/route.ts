import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import Razorpay from "razorpay";
import { prisma } from "@/lib/prisma";
import { UnauthorizedError, NotFoundError, ValidationError } from "@/lib/errors";
import { createErrorResponse } from "@/lib/errors";

function getRazorpayClient() {
  const key_id = process.env.RAZORPAY_KEY_ID;
  const key_secret = process.env.RAZORPAY_KEY_SECRET;
  if (!key_id || !key_secret) {
    throw new Error("Razorpay credentials not configured");
  }
  return new Razorpay({ key_id, key_secret });
}

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    const userId = (session?.user as { id?: string })?.id;
    if (!userId) {
      throw new UnauthorizedError("You must be logged in to make a payment");
    }

    const { bookingId, amount } = await request.json();

    if (!bookingId || !amount) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const amountNum = typeof amount === "string" ? parseInt(amount, 10) : amount;
    if (isNaN(amountNum) || amountNum <= 0) {
      throw new ValidationError("Invalid amount");
    }

    // Fetch booking and verify ownership
    const booking = await prisma.booking.findUnique({
      where: { id: bookingId },
      include: { departure: true },
    });

    if (!booking) {
      throw new NotFoundError("Booking not found");
    }

    if (booking.userId !== userId) {
      throw new UnauthorizedError("You can only pay for your own bookings");
    }

    if (booking.status === "CONFIRMED" || booking.status === "COMPLETED") {
      throw new ValidationError("This booking has already been paid");
    }

    if (booking.status === "CANCELLED") {
      throw new ValidationError("This booking has been cancelled");
    }

    // Verify amount matches booking total
    if (amountNum !== booking.totalAmount) {
      throw new ValidationError("Amount does not match booking total");
    }

    // Check for existing payment
    const existingPayment = await prisma.payment.findUnique({
      where: { bookingId },
    });

    if (existingPayment?.status === "COMPLETED") {
      throw new ValidationError("Payment already completed for this booking");
    }

    // Create Razorpay order
    const order = await Razorpay.orders.create({
      amount: amountNum,
      currency: "INR",
      receipt: bookingId,
      notes: {
        bookingId,
      },
    });

    // Create or update Payment record so verify can find it
    if (existingPayment && existingPayment.status === "PENDING") {
      await prisma.payment.update({
        where: { id: existingPayment.id },
        data: {
          transactionId: order.id,
          amount: amountNum,
          errorMessage: null,
        },
      });
    } else {
      await prisma.payment.create({
        data: {
          bookingId,
          userId,
          amount: amountNum,
          status: "PENDING",
          paymentGateway: "razorpay",
          transactionId: order.id,
        },
      });
    }

    return NextResponse.json(
      {
        success: true,
        data: {
          razorpayOrderId: order.id,
          amount: order.amount,
          currency: order.currency,
        },
      },
      { status: 200 }
    );
  } catch (error: unknown) {
    if (
      error instanceof UnauthorizedError ||
      error instanceof NotFoundError ||
      error instanceof ValidationError
    ) {
      const errorResponse = createErrorResponse(error);
      return NextResponse.json(errorResponse, {
        status: error instanceof UnauthorizedError ? 401 : 400,
      });
    }
    console.error("Razorpay order creation failed:", error);
    return NextResponse.json(
      { error: "Failed to create payment order" },
      { status: 500 }
    );
  }
}
