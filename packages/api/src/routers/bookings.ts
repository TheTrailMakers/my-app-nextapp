import {
	bookingIdInputSchema,
	createBookingInputSchema,
	paginationInputSchema,
	verifyPaymentInputSchema,
} from "../schemas/bookings";
import {
	cancelBookingForUser,
	createBookingForUser,
	createPaymentOrderForUser,
	getBookingForUser,
	listBookingsForUser,
	verifyPaymentForUser,
} from "../queries/bookings";
import { protectedProcedure } from "../index";

export const bookingsRouter = {
	create: protectedProcedure
		.input(createBookingInputSchema)
		.handler(async ({ context, input }) => {
			return createBookingForUser(context.user.id, input);
		}),
	byId: protectedProcedure
		.input(bookingIdInputSchema)
		.handler(async ({ context, input }) => {
			return getBookingForUser(context.user.id, input.bookingId);
		}),
	listMine: protectedProcedure
		.input(paginationInputSchema.optional())
		.handler(async ({ context, input }) => {
			return listBookingsForUser(
				context.user.id,
				paginationInputSchema.parse(input ?? {}),
			);
		}),
	cancel: protectedProcedure
		.input(bookingIdInputSchema)
		.handler(async ({ context, input }) => {
			return cancelBookingForUser(context.user.id, input.bookingId);
		}),
	payments: {
		createOrder: protectedProcedure
			.input(bookingIdInputSchema)
			.handler(async ({ context, input }) => {
				return createPaymentOrderForUser(context.user.id, input.bookingId);
			}),
		verify: protectedProcedure
			.input(verifyPaymentInputSchema)
			.handler(async ({ context, input }) => {
				return verifyPaymentForUser(context.user.id, input);
			}),
	},
};