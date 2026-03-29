import { relations } from "drizzle-orm";
import {
  index,
  integer,
  sqliteTable,
  text,
  uniqueIndex,
} from "drizzle-orm/sqlite-core";

import { user } from "./auth";
import { departure } from "./catalog";
import { timestampCols } from "./common";

export const bookingStatusValues = [
  "PENDING",
  "CONFIRMED",
  "CANCELLED",
  "COMPLETED",
] as const;
export const paymentStatusValues = [
  "PENDING",
  "COMPLETED",
  "FAILED",
  "REFUNDED",
] as const;

export const booking = sqliteTable(
  "booking",
  {
    id: text().primaryKey(),
    userId: text()
      .notNull()
      .references(() => user.id, { onDelete: "cascade" }),
    departureId: text()
      .notNull()
      .references(() => departure.id, { onDelete: "cascade" }),
    numberOfPeople: integer().default(1).notNull(),
    totalAmount: integer().notNull(),
    status: text().default("PENDING").notNull(),
    contactName: text().notNull(),
    contactPhone: text().notNull(),
    contactEmail: text().notNull(),
    cancellationReason: text(),
    cancelledAt: integer({ mode: "timestamp_ms" }),
    emergencyContactName: text(),
    emergencyContactPhone: text(),
    emergencyContactRelation: text(),
    idDocumentType: text(),
    idVerificationDate: integer({ mode: "timestamp_ms" }),
    idVerified: integer({ mode: "boolean" }).default(false).notNull(),
    isRepeatTrekker: integer({ mode: "boolean" }).default(false).notNull(),
    medicalFormDate: integer({ mode: "timestamp_ms" }),
    medicalFormSubmitted: integer({ mode: "boolean" }).default(false).notNull(),
    previousTreksCount: integer().default(0).notNull(),
    waiverSigned: integer({ mode: "boolean" }).default(false).notNull(),
    waiverSignedDate: integer({ mode: "timestamp_ms" }),
    ...timestampCols,
  },
  (table) => [
    index("booking_createdAt_idx").on(table.createdAt),
    index("booking_departureId_idx").on(table.departureId),
    index("booking_status_idx").on(table.status),
    index("booking_userId_idx").on(table.userId),
    uniqueIndex("booking_userId_departureId_key").on(
      table.userId,
      table.departureId,
    ),
  ],
);

export const payment = sqliteTable(
  "payment",
  {
    id: text().primaryKey(),
    bookingId: text()
      .notNull()
      .references(() => booking.id, { onDelete: "cascade" }),
    userId: text()
      .notNull()
      .references(() => user.id, { onDelete: "cascade" }),
    amount: integer().notNull(),
    status: text().default("PENDING").notNull(),
    paymentGateway: text().notNull(),
    transactionId: text(),
    paymentIntentId: text(),
    metadata: text(),
    errorMessage: text(),
    refundAmount: integer(),
    refundedAt: integer({ mode: "timestamp_ms" }),
    refundTransactionId: text(),
    advanceAmount: integer(),
    balanceAmount: integer(),
    gstAmount: integer(),
    gstNumber: text(),
    paymentMethod: text(),
    trekLeaderPayoutAmount: integer(),
    trekLeaderPayoutStatus: text(),
    ...timestampCols,
  },
  (table) => [
    index("payment_bookingId_idx").on(table.bookingId),
    index("payment_createdAt_idx").on(table.createdAt),
    index("payment_status_idx").on(table.status),
    index("payment_userId_idx").on(table.userId),
    uniqueIndex("payment_bookingId_key").on(table.bookingId),
    uniqueIndex("payment_transactionId_key").on(table.transactionId),
  ],
);

export const bookingRelations = relations(booking, ({ one }) => ({
  departure: one(departure, {
    fields: [booking.departureId],
    references: [departure.id],
  }),
  payment: one(payment, {
    fields: [booking.id],
    references: [payment.bookingId],
  }),
  user: one(user, {
    fields: [booking.userId],
    references: [user.id],
  }),
}));

export const paymentRelations = relations(payment, ({ one }) => ({
  booking: one(booking, {
    fields: [payment.bookingId],
    references: [booking.id],
  }),
  user: one(user, {
    fields: [payment.userId],
    references: [user.id],
  }),
}));
