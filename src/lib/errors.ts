/**
 * Custom Error Classes for Booking System
 * Production-grade error handling with proper HTTP status codes
 */

import { ZodError } from "zod";

export class AppError extends Error {
  constructor(
    public message: string,
    public statusCode: number = 500,
    public code: string = "INTERNAL_ERROR"
  ) {
    super(message);
    Object.setPrototypeOf(this, AppError.prototype);
  }
}

export class ValidationError extends AppError {
  constructor(message: string, code: string = "VALIDATION_ERROR") {
    super(message, 400, code);
    Object.setPrototypeOf(this, ValidationError.prototype);
  }
}

export class NotFoundError extends AppError {
  constructor(message: string = "Resource not found") {
    super(message, 404, "NOT_FOUND");
    Object.setPrototypeOf(this, NotFoundError.prototype);
  }
}

export class UnauthorizedError extends AppError {
  constructor(message: string = "Unauthorized") {
    super(message, 401, "UNAUTHORIZED");
    Object.setPrototypeOf(this, UnauthorizedError.prototype);
  }
}

export class ConflictError extends AppError {
  constructor(message: string, code: string = "CONFLICT") {
    super(message, 409, code);
    Object.setPrototypeOf(this, ConflictError.prototype);
  }
}

export class InsufficientSeatsError extends ConflictError {
  constructor() {
    super("Not enough seats available for this departure", "INSUFFICIENT_SEATS");
    Object.setPrototypeOf(this, InsufficientSeatsError.prototype);
  }
}

export class DuplicateBookingError extends ConflictError {
  constructor() {
    super("You already have a booking for this departure", "DUPLICATE_BOOKING");
    Object.setPrototypeOf(this, DuplicateBookingError.prototype);
  }
}

export class PaymentRequiredError extends AppError {
  constructor(message: string = "Payment processing failed") {
    super(message, 402, "PAYMENT_FAILED");
    Object.setPrototypeOf(this, PaymentRequiredError.prototype);
  }
}

export class RateLimitError extends AppError {
  constructor(message: string = "Too many requests") {
    super(message, 429, "RATE_LIMIT");
    Object.setPrototypeOf(this, RateLimitError.prototype);
  }
}

export function createErrorResponse(error: unknown) {
  if (error instanceof AppError) {
    return {
      success: false,
      error: {
        message: error.message,
        code: error.code,
        statusCode: error.statusCode,
      },
    };
  }

  // Zod validation errors - surface first issue for user
  if (error instanceof ZodError) {
    const first = error.errors[0];
    const msg = first
      ? `${first.path.join(".")}: ${first.message}`
      : "Validation failed";
    return {
      success: false,
      error: {
        message: msg,
        code: "VALIDATION_ERROR",
        statusCode: 400,
      },
    };
  }

  // Prisma errors
  if (error && typeof error === "object" && "code" in error) {
    const prismaError = error as { code: string; message?: string };
    const message =
      prismaError.code === "P2002"
        ? "A record with this value already exists"
        : prismaError.message || "Database error";
    return {
      success: false,
      error: {
        message,
        code: prismaError.code,
        statusCode: 400,
      },
    };
  }

  // Generic Error
  if (error instanceof Error) {
    console.error("Error:", error.message, error.stack);
    return {
      success: false,
      error: {
        message: error.message,
        code: "ERROR",
        statusCode: 500,
      },
    };
  }

  console.error("Unexpected error:", error);
  return {
    success: false,
    error: {
      message: "An unexpected error occurred",
      code: "INTERNAL_ERROR",
      statusCode: 500,
    },
  };
}
