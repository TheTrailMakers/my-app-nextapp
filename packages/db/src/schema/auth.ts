import { relations, sql } from "drizzle-orm";
import { index, integer, sqliteTable, text } from "drizzle-orm/sqlite-core";

const timestampMs = () =>
	integer({ mode: "timestamp_ms" })
		.default(sql`(unixepoch() * 1000)`)
		.notNull();

const timestampCols = {
	createdAt: timestampMs(),
	updatedAt: timestampMs().$onUpdate(() => /* @__PURE__ */ new Date()),
};

export const user = sqliteTable("user", {
	id: text().primaryKey(),
	name: text().notNull(),
	email: text().notNull().unique(),
	emailVerified: integer({ mode: "boolean" }).default(false).notNull(),
	image: text(),
	...timestampCols,
});

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
	(table) => [index("session_userId_idx").on(table.userId)]
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
	(table) => [index("account_userId_idx").on(table.userId)]
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
	(table) => [index("verification_identifier_idx").on(table.identifier)]
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
