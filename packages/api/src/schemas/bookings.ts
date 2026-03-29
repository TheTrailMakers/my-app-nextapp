import { z } from "zod";

export const paginationInputSchema = z.object({
	page: z.number().int().positive().default(1),
	limit: z.number().int().positive().max(100).default(10),
});

export const bookingIdInputSchema = z.object({
	bookingId: z.string().min(1),
});

export const createBookingInputSchema = z.object({
	departureId: z.string().min(1),
	numberOfPeople: z.number().int().positive().max(20),
	contactName: z.string().trim().min(2).max(120),
	contactPhone: z.string().trim().min(8).max(32),
	contactEmail: z.email(),
});

export const verifyPaymentInputSchema = z.object({
	razorpayOrderId: z.string().min(1),
	razorpayPaymentId: z.string().min(1),
	razorpaySignature: z.string().min(1),
});

export type CreateBookingInput = z.infer<typeof createBookingInputSchema>;
export type PaginationInput = z.infer<typeof paginationInputSchema>;