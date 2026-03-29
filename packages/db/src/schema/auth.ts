import { relations } from "drizzle-orm";
import {
  index,
  integer,
  sqliteTable,
  text,
  uniqueIndex,
} from "drizzle-orm/sqlite-core";

import { timestampCols } from "./common";

export const userRoleValues = [
  "ADMIN",
  "MODERATOR",
  "USER",
  "SUPER_ADMIN",
  "TREK_LEADER",
] as const;

export const user = sqliteTable(
  "user",
  {
    id: text().primaryKey(),
    email: text().notNull(),
    username: text().notNull(),
    password: text(),
    emailVerified: integer({ mode: "boolean" }).default(false).notNull(),
    address: text(),
    city: text(),
    firstName: text(),
    lastName: text(),
    phoneNumber: text(),
    pincode: text(),
    state: text(),
    accountLockedUntil: integer({ mode: "timestamp_ms" }),
    isActive: integer({ mode: "boolean" }).default(true).notNull(),
    isLocked: integer({ mode: "boolean" }).default(false).notNull(),
    lastLoginAt: integer({ mode: "timestamp_ms" }),
    passwordChangedAt: integer({ mode: "timestamp_ms" }),
    role: text().default("USER").notNull(),
    isDenied: integer({ mode: "boolean" }).default(false).notNull(),
    resetToken: text(),
    resetTokenExpiry: integer({ mode: "timestamp_ms" }),
    image: text(),
    name: text().default("").notNull(),
    ...timestampCols,
  },
  (table) => [
    index("user_accountLockedUntil_idx").on(table.accountLockedUntil),
    index("user_createdAt_idx").on(table.createdAt),
    index("user_email_idx").on(table.email),
    index("user_isActive_idx").on(table.isActive),
    index("user_role_idx").on(table.role),
    uniqueIndex("user_email_key").on(table.email),
    uniqueIndex("user_username_key").on(table.username),
  ],
);

export const session = sqliteTable(
  "session",
  {
    id: text().primaryKey(),
    expiresAt: integer({ mode: "timestamp_ms" }).notNull(),
    token: text().notNull().unique(),
    ipAddress: text(),
    userAgent: text("user_agent"),
    userId: text("user_id")
      .notNull()
      .references(() => user.id, { onDelete: "cascade" }),
    ...timestampCols,
  },
  (table) => [index("session_userId_idx").on(table.userId)],
);

export const account = sqliteTable(
  "account",
  {
    id: text().primaryKey(),
    accountId: text().notNull(),
    providerId: text().notNull(),
    userId: text()
      .notNull()
      .references(() => user.id, { onDelete: "cascade" }),
    accessToken: text(),
    refreshToken: text(),
    idToken: text(),
    accessTokenExpiresAt: integer({
      mode: "timestamp_ms",
    }),
    refreshTokenExpiresAt: integer({
      mode: "timestamp_ms",
    }),
    scope: text(),
    password: text(),
    ...timestampCols,
  },
  (table) => [index("account_userId_idx").on(table.userId)],
);

export const verification = sqliteTable(
  "verification",
  {
    id: text().primaryKey(),
    identifier: text().notNull(),
    value: text().notNull(),
    expiresAt: integer({ mode: "timestamp_ms" }).notNull(),
    ...timestampCols,
  },
  (table) => [index("verification_identifier_idx").on(table.identifier)],
);

export const userRelations = relations(user, ({ many }) => ({
  sessions: many(session),
  accounts: many(account),
}));

export const sessionRelations = relations(session, ({ one }) => ({
  user: one(user, {
    fields: [session.userId],
    references: [user.id],
  }),
}));

export const accountRelations = relations(account, ({ one }) => ({
  user: one(user, {
    fields: [account.userId],
    references: [user.id],
  }),
}));
