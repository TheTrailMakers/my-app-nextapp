import { ORPCError } from "@orpc/server";
import { and, db, desc, eq, gte, sql } from "@the-trail-makers/db";
import { booking, payment } from "@the-trail-makers/db/schema/booking";
import { departure, trek } from "@the-trail-makers/db/schema/catalog";
import { env } from "@the-trail-makers/env/server";

import { auditLog } from "@the-trail-makers/db/schema/rbac";

import type { CreateBookingInput, PaginationInput } from "../schemas/bookings";

function notFound(message: string) {
	return new ORPCError("NOT_FOUND", { message });
}

function badRequest(message: string) {
	return new ORPCError("BAD_REQUEST", { message });
}

function serializeDate(value: Date | null | undefined) {
	return value ? value.toISOString() : null;
}

function mapBookingRow(row: {
	booking: typeof booking.$inferSelect;
	departure: typeof departure.$inferSelect;
	trek: typeof trek.$inferSelect;
	payment: typeof payment.$inferSelect | null;
}) {
	return {
		...row.booking,
		cancelledAt: serializeDate(row.booking.cancelledAt),
		createdAt: serializeDate(row.booking.createdAt),
		updatedAt: serializeDate(row.booking.updatedAt),
		departure: {
			...row.departure,
			startDate: serializeDate(row.departure.startDate),
			endDate: serializeDate(row.departure.endDate),
			createdAt: serializeDate(row.departure.createdAt),
			updatedAt: serializeDate(row.departure.updatedAt),
			trek: {
				...row.trek,
				createdAt: serializeDate(row.trek.createdAt),
				updatedAt: serializeDate(row.trek.updatedAt),
			},
		},
		payment: row.payment
			? {
				...row.payment,
				refundedAt: serializeDate(row.payment.refundedAt),
				createdAt: serializeDate(row.payment.createdAt),
				updatedAt: serializeDate(row.payment.updatedAt),
			}
			: null,
	};
}

async function createAuditEntry(input: {
	action: string;
	entityType: string;
	entityId: string;
	userId?: string | null;
	metadata?: Record<string, unknown>;
	description: string;
	transaction?: typeof db;
}) {
	const executor = input.transaction ?? db;
	await executor.insert(auditLog).values({
		id: crypto.randomUUID(),
		action: input.action,
		entityType: input.entityType,
		entityId: input.entityId,
		userId: input.userId ?? null,
		metadata: input.metadata ? JSON.stringify(input.metadata) : null,
		description: input.description,
		createdAt: new Date(),
	});
}

async function getBookingRow(bookingId: string) {
	const rows = await db
		.select({
			booking,
			departure,
			trek,
			payment,
		})
		.from(booking)
		.innerJoin(departure, eq(booking.departureId, departure.id))
		.innerJoin(trek, eq(departure.trekId, trek.id))
		.leftJoin(payment, eq(payment.bookingId, booking.id))
		.where(eq(booking.id, bookingId))
		.limit(1);

	return rows[0] ?? null;
}

async function getPaymentRowByOrderId(orderId: string) {
	const rows = await db
		.select({
			booking,
			departure,
			trek,
			payment,
		})
		.from(payment)
		.innerJoin(booking, eq(payment.bookingId, booking.id))
		.innerJoin(departure, eq(booking.departureId, departure.id))
		.innerJoin(trek, eq(departure.trekId, trek.id))
		.where(eq(payment.transactionId, orderId))
		.limit(1);

	return rows[0] ?? null;
}

async function createRazorpayOrder(input: {
	bookingId: string;
	userId: string;
	amount: number;
	trekName: string;
	numberOfPeople: number;
}) {
	const response = await fetch("https://api.razorpay.com/v1/orders", {
		method: "POST",
		headers: {
			Authorization: `Basic ${btoa(`${env.RAZORPAY_KEY_ID}:${env.RAZORPAY_KEY_SECRET}`)}`,
			"Content-Type": "application/json",
		},
		body: JSON.stringify({
			amount: input.amount,
			currency: "INR",
			receipt: input.bookingId,
			notes: {
				bookingId: input.bookingId,
				userId: input.userId,
				trekName: input.trekName,
				numberOfPeople: String(input.numberOfPeople),
			},
		}),
	});

	if (!response.ok) {
		const message = await response.text();
		throw badRequest(`Failed to create Razorpay order: ${message}`);
	}

	return (await response.json()) as {
		id: string;
		amount: number;
		currency: string;
		status: string;
	};
}

async function createPaymentSignature(orderId: string, paymentId: string) {
	const payload = new TextEncoder().encode(`${orderId}|${paymentId}`);
	const secret = new TextEncoder().encode(env.RAZORPAY_KEY_SECRET);
	const key = await crypto.subtle.importKey(
		"raw",
		secret,
		{ name: "HMAC", hash: "SHA-256" },
		false,
		["sign"],
	);
	const signature = await crypto.subtle.sign("HMAC", key, payload);

	return Array.from(new Uint8Array(signature), (byte) =>
		byte.toString(16).padStart(2, "0"),
	).join("");
}

export async function createBookingForUser(
	userId: string,
	input: CreateBookingInput,
) {
	const departureRows = await db
		.select({ departure, trek })
		.from(departure)
		.innerJoin(trek, eq(departure.trekId, trek.id))
		.where(eq(departure.id, input.departureId))
		.limit(1);

	const departureRow = departureRows[0];

	if (!departureRow) {
		throw notFound("Departure not found.");
	}

	if (departureRow.departure.isCancelled) {
		throw badRequest("This departure has been cancelled.");
	}

	if (departureRow.departure.seatsAvailable < input.numberOfPeople) {
		throw badRequest("Not enough seats are available for this departure.");
	}

	const existingBookings = await db
		.select({ id: booking.id })
		.from(booking)
		.where(
			and(
				eq(booking.userId, userId),
				eq(booking.departureId, input.departureId),
			),
		)
		.limit(1);

	if (existingBookings.length > 0) {
		throw badRequest("You already have a booking for this departure.");
	}

	const bookingId = crypto.randomUUID();

	await db.transaction(async (transaction) => {
		const updatedDepartures = await transaction
			.update(departure)
			.set({
				seatsAvailable: sql`${departure.seatsAvailable} - ${input.numberOfPeople}`,
				updatedAt: new Date(),
			})
			.where(
				and(
					eq(departure.id, input.departureId),
					eq(departure.isCancelled, false),
					gte(departure.seatsAvailable, input.numberOfPeople),
				),
			)
			.returning({ id: departure.id });

		if (updatedDepartures.length === 0) {
			throw badRequest("The selected departure no longer has enough seats.");
		}

		await transaction.insert(booking).values({
			id: bookingId,
			userId,
			departureId: input.departureId,
			numberOfPeople: input.numberOfPeople,
			totalAmount: departureRow.departure.pricePerPerson * input.numberOfPeople,
			status: "PENDING",
			contactName: input.contactName,
			contactPhone: input.contactPhone,
			contactEmail: input.contactEmail.trim().toLowerCase(),
			createdAt: new Date(),
			updatedAt: new Date(),
		});

		await createAuditEntry({
			action: "BOOKING_CREATED",
			entityType: "BOOKING",
			entityId: bookingId,
			userId,
			metadata: {
				departureId: input.departureId,
				numberOfPeople: input.numberOfPeople,
				totalAmount: departureRow.departure.pricePerPerson * input.numberOfPeople,
			},
			description: `BOOKING_CREATED on BOOKING ${bookingId}`,
			transaction,
		});
	});

	return getBookingForUser(userId, bookingId);
}

export async function getBookingForUser(userId: string, bookingId: string) {
	const bookingRow = await getBookingRow(bookingId);

	if (!bookingRow) {
		throw notFound("Booking not found.");
	}

	if (bookingRow.booking.userId !== userId) {
		throw new ORPCError("FORBIDDEN", {
			message: "You cannot access another user's booking.",
		});
	}

	return mapBookingRow(bookingRow);
}

export async function listBookingsForUser(
	userId: string,
	input: PaginationInput,
) {
	const offset = (input.page - 1) * input.limit;

	const [rows, countRows] = await Promise.all([
		db
			.select({
				booking,
				departure,
				trek,
				payment,
			})
			.from(booking)
			.innerJoin(departure, eq(booking.departureId, departure.id))
			.innerJoin(trek, eq(departure.trekId, trek.id))
			.leftJoin(payment, eq(payment.bookingId, booking.id))
			.where(eq(booking.userId, userId))
			.orderBy(desc(booking.createdAt))
			.limit(input.limit)
			.offset(offset),
		db
			.select({ count: sql<number>`cast(count(*) as integer)` })
			.from(booking)
			.where(eq(booking.userId, userId)),
	]);

	const total = countRows[0]?.count ?? 0;

	return {
		bookings: rows.map(mapBookingRow),
		pagination: {
			page: input.page,
			limit: input.limit,
			total,
			pages: Math.ceil(total / input.limit),
		},
	};
}

export async function cancelBookingForUser(userId: string, bookingId: string) {
	const bookingRow = await getBookingRow(bookingId);

	if (!bookingRow) {
		throw notFound("Booking not found.");
	}

	if (bookingRow.booking.userId !== userId) {
		throw new ORPCError("FORBIDDEN", {
			message: "You cannot cancel another user's booking.",
		});
	}

	if (bookingRow.booking.status === "CANCELLED") {
		throw badRequest("This booking is already cancelled.");
	}

	if (bookingRow.booking.status === "COMPLETED") {
		throw badRequest("Completed trek bookings cannot be cancelled.");
	}

	await db.transaction(async (transaction) => {
		await transaction
			.update(departure)
			.set({
				seatsAvailable: sql`${departure.seatsAvailable} + ${bookingRow.booking.numberOfPeople}`,
				updatedAt: new Date(),
			})
			.where(eq(departure.id, bookingRow.booking.departureId));

		await transaction
			.update(booking)
			.set({
				status: "CANCELLED",
				cancelledAt: new Date(),
				updatedAt: new Date(),
			})
			.where(eq(booking.id, bookingId));

		if (bookingRow.payment?.status === "COMPLETED") {
			await transaction
				.update(payment)
				.set({
					status: "REFUNDED",
					refundAmount: bookingRow.payment.amount,
					refundedAt: new Date(),
					updatedAt: new Date(),
				})
				.where(eq(payment.id, bookingRow.payment.id));
		}

		await createAuditEntry({
			action: "BOOKING_CANCELLED",
			entityType: "BOOKING",
			entityId: bookingId,
			userId,
			metadata: {
				seatsReturned: bookingRow.booking.numberOfPeople,
			},
			description: `BOOKING_CANCELLED on BOOKING ${bookingId}`,
			transaction,
		});
	});

	return getBookingForUser(userId, bookingId);
}

export async function createPaymentOrderForUser(userId: string, bookingId: string) {
	const bookingRow = await getBookingRow(bookingId);

	if (!bookingRow) {
		throw notFound("Booking not found.");
	}

	if (bookingRow.booking.userId !== userId) {
		throw new ORPCError("FORBIDDEN", {
			message: "You cannot pay for another user's booking.",
		});
	}

	if (bookingRow.booking.status === "CANCELLED") {
		throw badRequest("Cancelled bookings cannot be paid.");
	}

	if (
		bookingRow.booking.status === "CONFIRMED" ||
		bookingRow.booking.status === "COMPLETED"
	) {
		throw badRequest("This booking has already been paid.");
	}

	const existingPayment = bookingRow.payment;

	if (existingPayment?.status === "COMPLETED") {
		throw badRequest("Payment already completed for this booking.");
	}

	const paymentId = existingPayment?.id ?? crypto.randomUUID();
	const paymentIntentId = existingPayment?.paymentIntentId ?? crypto.randomUUID();

	if (!existingPayment) {
		await db.insert(payment).values({
			id: paymentId,
			bookingId,
			userId,
			amount: bookingRow.booking.totalAmount,
			status: "PENDING",
			paymentGateway: "razorpay",
			paymentIntentId,
			createdAt: new Date(),
			updatedAt: new Date(),
		});
	}

	const razorpayOrder = await createRazorpayOrder({
		bookingId,
		userId,
		amount: bookingRow.booking.totalAmount,
		trekName: bookingRow.trek.name,
		numberOfPeople: bookingRow.booking.numberOfPeople,
	});

	await db
		.update(payment)
		.set({
			amount: bookingRow.booking.totalAmount,
			status: "PENDING",
			paymentGateway: "razorpay",
			transactionId: razorpayOrder.id,
			errorMessage: null,
			updatedAt: new Date(),
		})
		.where(eq(payment.id, paymentId));

	return {
		bookingId,
		paymentId,
		razorpayOrderId: razorpayOrder.id,
		amount: razorpayOrder.amount,
		currency: razorpayOrder.currency,
		status: razorpayOrder.status,
	};
}

export async function verifyPaymentForUser(
	userId: string,
	input: {
		razorpayOrderId: string;
		razorpayPaymentId: string;
		razorpaySignature: string;
	},
) {
	const paymentRow = await getPaymentRowByOrderId(input.razorpayOrderId);

	if (!paymentRow) {
		throw notFound("Payment record not found.");
	}

	if (paymentRow.booking.userId !== userId) {
		throw new ORPCError("FORBIDDEN", {
			message: "You cannot verify another user's payment.",
		});
	}

	const expectedSignature = await createPaymentSignature(
		input.razorpayOrderId,
		input.razorpayPaymentId,
	);

	if (expectedSignature !== input.razorpaySignature) {
		throw badRequest("Invalid payment signature.");
	}

	await db.transaction(async (transaction) => {
		await transaction
			.update(payment)
			.set({
				status: "COMPLETED",
				transactionId: input.razorpayPaymentId,
				metadata: JSON.stringify({
					razorpayOrderId: input.razorpayOrderId,
					razorpayPaymentId: input.razorpayPaymentId,
				}),
				updatedAt: new Date(),
			})
			.where(eq(payment.id, paymentRow.payment.id));

		await transaction
			.update(booking)
			.set({
				status: "CONFIRMED",
				updatedAt: new Date(),
			})
			.where(eq(booking.id, paymentRow.booking.id));

		await createAuditEntry({
			action: "PAYMENT_COMPLETED",
			entityType: "PAYMENT",
			entityId: paymentRow.payment.id,
			userId,
			metadata: {
				amount: paymentRow.payment.amount,
				razorpayOrderId: input.razorpayOrderId,
				razorpayPaymentId: input.razorpayPaymentId,
			},
			description: `PAYMENT_COMPLETED on PAYMENT ${paymentRow.payment.id}`,
			transaction,
		});
	});

	return getBookingForUser(userId, paymentRow.booking.id);
}