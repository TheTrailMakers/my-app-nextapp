import { relations } from "drizzle-orm";
import {
  index,
  integer,
  real,
  sqliteTable,
  text,
  uniqueIndex,
} from "drizzle-orm/sqlite-core";

import { user } from "./auth";
import { departure } from "./catalog";
import { timestampCols, timestampMs } from "./common";

export const failedLoginAttempt = sqliteTable(
  "failed_login_attempt",
  {
    id: text().primaryKey(),
    userId: text()
      .notNull()
      .references(() => user.id, { onDelete: "cascade" }),
    email: text().notNull(),
    ipAddress: text(),
    userAgent: text(),
    createdAt: timestampMs(),
  },
  (table) => [
    index("failedLoginAttempt_createdAt_idx").on(table.createdAt),
    index("failedLoginAttempt_email_idx").on(table.email),
    index("failedLoginAttempt_ipAddress_idx").on(table.ipAddress),
    index("failedLoginAttempt_userId_idx").on(table.userId),
  ],
);

export const ipRestriction = sqliteTable(
  "ip_restriction",
  {
    id: text().primaryKey(),
    ipAddress: text().notNull(),
    isAllowed: integer({ mode: "boolean" }).default(true).notNull(),
    reason: text(),
    ...timestampCols,
  },
  (table) => [
    index("ipRestriction_ipAddress_idx").on(table.ipAddress),
    index("ipRestriction_isAllowed_idx").on(table.isAllowed),
    uniqueIndex("ipRestriction_ipAddress_key").on(table.ipAddress),
  ],
);

export const marketingMetric = sqliteTable(
  "marketing_metric",
  {
    id: text().primaryKey(),
    date: timestampMs(),
    websiteVisitors: integer().default(0).notNull(),
    websitePageViews: integer().default(0).notNull(),
    conversionRate: real().default(0).notNull(),
    instagramClicks: integer().default(0).notNull(),
    instagramImpressions: integer().default(0).notNull(),
    totalBookings: integer().default(0).notNull(),
    referralBookings: integer().default(0).notNull(),
    repeatCustomerBookings: integer().default(0).notNull(),
    topTreks: text(),
    ...timestampCols,
  },
  (table) => [index("marketingMetric_date_idx").on(table.date)],
);

export const trekLeaderPayout = sqliteTable(
  "trek_leader_payout",
  {
    id: text().primaryKey(),
    trekLeaderId: text()
      .notNull()
      .references(() => user.id, { onDelete: "restrict" }),
    departureId: text()
      .notNull()
      .references(() => departure.id, { onDelete: "restrict" }),
    amount: integer().notNull(),
    status: text().default("PENDING").notNull(),
    paymentMethod: text(),
    transactionId: text(),
    paidAt: integer({ mode: "timestamp_ms" }),
    notes: text(),
    ...timestampCols,
  },
  (table) => [
    index("trekLeaderPayout_status_idx").on(table.status),
    index("trekLeaderPayout_trekLeaderId_idx").on(table.trekLeaderId),
  ],
);

export const failedLoginAttemptRelations = relations(
  failedLoginAttempt,
  ({ one }) => ({
    user: one(user, {
      fields: [failedLoginAttempt.userId],
      references: [user.id],
    }),
  }),
);

export const ipRestrictionRelations = relations(ipRestriction, () => ({}));

export const marketingMetricRelations = relations(marketingMetric, () => ({}));

export const trekLeaderPayoutRelations = relations(
  trekLeaderPayout,
  ({ one }) => ({
    departure: one(departure, {
      fields: [trekLeaderPayout.departureId],
      references: [departure.id],
    }),
    trekLeader: one(user, {
      fields: [trekLeaderPayout.trekLeaderId],
      references: [user.id],
    }),
  }),
);
