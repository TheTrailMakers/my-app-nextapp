import { NextRequest, NextResponse } from "next/server";
import {
  UnauthorizedError,
  NotFoundError,
  ValidationError,
} from "@/lib/errors";
import { createErrorResponse } from "@/lib/errors";
import { getAppSession } from "@/lib/auth-session";
import { createPaymentIntent } from "@/lib/services/paymentService";

export async function POST(request: NextRequest) {
  try {
    const session = await getAppSession();
    const userId = (session?.user as { id?: string })?.id;
    if (!userId) {
      throw new UnauthorizedError("You must be logged in to make a payment");
    }

    const { bookingId, amount } = await request.json();

    if (!bookingId || !amount) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 },
      );
    }

    const amountNum =
      typeof amount === "string" ? parseInt(amount, 10) : amount;
    if (isNaN(amountNum) || amountNum <= 0) {
      throw new ValidationError("Invalid amount");
    }

    const { razorpayOrder } = await createPaymentIntent(
      bookingId,
      userId,
      amountNum,
    );

    return NextResponse.json(
      {
        success: true,
        data: {
          razorpayOrderId: razorpayOrder.id,
          amount: razorpayOrder.amount,
          currency: razorpayOrder.currency,
        },
      },
      { status: 200 },
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
      { status: 500 },
    );
  }
}
