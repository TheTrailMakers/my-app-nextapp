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
import { timestampCols } from "./common";

export const trekDifficultyValues = [
  "EASY",
  "EASY_MODERATE",
  "MODERATE",
  "HARD",
  "VERY_HARD",
] as const;

export const departureStatusValues = [
  "OPEN",
  "CLOSED",
  "FULL",
  "CANCELLED",
] as const;

export const trek = sqliteTable(
  "trek",
  {
    id: text().primaryKey(),
    slug: text().notNull(),
    name: text().notNull(),
    description: text().notNull(),
    longDescription: text(),
    state: text().notNull(),
    basePrice: integer().notNull(),
    difficulty: text().default("MODERATE").notNull(),
    duration: integer().notNull(),
    maxAltitude: integer(),
    distance: real(),
    bestSeason: text(),
    imageUrl: text(),
    thumbnailUrl: text(),
    tags: text().default("[]").notNull(),
    itinerary: text().notNull(),
    inclusions: text().default("[]").notNull(),
    exclusions: text().default("[]").notNull(),
    requirements: text().default("[]").notNull(),
    aboutText: text(),
    accommodationType: text(),
    bestFor: text(),
    bestTimeJson: text(),
    contentGeneratedAt: integer({ mode: "timestamp_ms" }),
    contentSources: text().default("[]").notNull(),
    contentVerified: integer({ mode: "boolean" }).default(false).notNull(),
    difficultyDetails: text(),
    dropoffTime: text(),
    faqsJson: text(),
    gearChecklist: text(),
    gettingThere: text(),
    itineraryJson: text(),
    permits: text(),
    pickupTime: text(),
    schemaMarkup: text(),
    seoDescription: text(),
    seoKeywords: text().default("[]").notNull(),
    seoTitle: text(),
    tagline: text(),
    ...timestampCols,
  },
  (table) => [
    index("trek_contentVerified_idx").on(table.contentVerified),
    index("trek_difficulty_idx").on(table.difficulty),
    index("trek_state_idx").on(table.state),
    index("trek_slug_idx").on(table.slug),
    uniqueIndex("trek_slug_key").on(table.slug),
  ],
);

export const departure = sqliteTable(
  "departure",
  {
    id: text().primaryKey(),
    trekId: text()
      .notNull()
      .references(() => trek.id, { onDelete: "cascade" }),
    startDate: integer({ mode: "timestamp_ms" }).notNull(),
    endDate: integer({ mode: "timestamp_ms" }).notNull(),
    seatsAvailable: integer().notNull(),
    totalSeats: integer().notNull(),
    pricePerPerson: integer().notNull(),
    isCancelled: integer({ mode: "boolean" }).default(false).notNull(),
    cancellationReason: text(),
    maxWaitlist: integer().default(5).notNull(),
    status: text().default("OPEN").notNull(),
    trekLeaderId: text().references(() => user.id, { onDelete: "set null" }),
    trekLeaderName: text(),
    waitlistCount: integer().default(0).notNull(),
    ...timestampCols,
  },
  (table) => [
    index("departure_isCancelled_idx").on(table.isCancelled),
    index("departure_startDate_idx").on(table.startDate),
    index("departure_status_idx").on(table.status),
    index("departure_trekId_idx").on(table.trekId),
    uniqueIndex("departure_trekId_startDate_key").on(
      table.trekId,
      table.startDate,
    ),
  ],
);

export const expedition = sqliteTable(
  "expedition",
  {
    id: text().primaryKey(),
    slug: text().notNull(),
    name: text().notNull(),
    description: text().notNull(),
    longDescription: text(),
    state: text().notNull(),
    basePrice: integer().notNull(),
    difficulty: text().default("MODERATE").notNull(),
    duration: integer().notNull(),
    maxAltitude: integer(),
    distance: real(),
    bestSeason: text(),
    imageUrl: text(),
    thumbnailUrl: text(),
    tags: text().default("[]").notNull(),
    itinerary: text().notNull(),
    inclusions: text().default("[]").notNull(),
    exclusions: text().default("[]").notNull(),
    requirements: text().default("[]").notNull(),
    ...timestampCols,
  },
  (table) => [
    index("expedition_difficulty_idx").on(table.difficulty),
    index("expedition_slug_idx").on(table.slug),
    uniqueIndex("expedition_slug_key").on(table.slug),
    index("expedition_state_idx").on(table.state),
  ],
);

export const expeditionSession = sqliteTable(
  "expedition_session",
  {
    id: text().primaryKey(),
    expeditionId: text()
      .notNull()
      .references(() => expedition.id, { onDelete: "cascade" }),
    startDate: integer({ mode: "timestamp_ms" }).notNull(),
    endDate: integer({ mode: "timestamp_ms" }).notNull(),
    seatsAvailable: integer().notNull(),
    totalSeats: integer().notNull(),
    pricePerPerson: integer().notNull(),
    isCancelled: integer({ mode: "boolean" }).default(false).notNull(),
    cancellationReason: text(),
    ...timestampCols,
  },
  (table) => [
    index("expeditionSession_expeditionId_idx").on(table.expeditionId),
    index("expeditionSession_startDate_idx").on(table.startDate),
    uniqueIndex("expeditionSession_expeditionId_startDate_key").on(
      table.expeditionId,
      table.startDate,
    ),
  ],
);

export const course = sqliteTable(
  "course",
  {
    id: text().primaryKey(),
    slug: text().notNull(),
    name: text().notNull(),
    description: text().notNull(),
    longDescription: text(),
    location: text().notNull(),
    price: integer().notNull(),
    duration: integer().notNull(),
    difficulty: text().default("MODERATE").notNull(),
    imageUrl: text(),
    thumbnailUrl: text(),
    tags: text().default("[]").notNull(),
    curriculum: text().notNull(),
    inclusions: text().default("[]").notNull(),
    exclusions: text().default("[]").notNull(),
    requirements: text().default("[]").notNull(),
    instructor: text(),
    ...timestampCols,
  },
  (table) => [
    index("course_difficulty_idx").on(table.difficulty),
    index("course_location_idx").on(table.location),
    index("course_slug_idx").on(table.slug),
    uniqueIndex("course_slug_key").on(table.slug),
  ],
);

export const courseSession = sqliteTable(
  "course_session",
  {
    id: text().primaryKey(),
    courseId: text()
      .notNull()
      .references(() => course.id, { onDelete: "cascade" }),
    startDate: integer({ mode: "timestamp_ms" }).notNull(),
    endDate: integer({ mode: "timestamp_ms" }).notNull(),
    seatsAvailable: integer().notNull(),
    totalSeats: integer().notNull(),
    pricePerPerson: integer().notNull(),
    isCancelled: integer({ mode: "boolean" }).default(false).notNull(),
    cancellationReason: text(),
    ...timestampCols,
  },
  (table) => [
    index("courseSession_courseId_idx").on(table.courseId),
    index("courseSession_startDate_idx").on(table.startDate),
    uniqueIndex("courseSession_courseId_startDate_key").on(
      table.courseId,
      table.startDate,
    ),
  ],
);

export const faq = sqliteTable(
  "faq",
  {
    id: text().primaryKey(),
    question: text().notNull(),
    answer: text().notNull(),
    category: text(),
    order: integer().default(0).notNull(),
    ...timestampCols,
  },
  (table) => [
    index("faq_category_idx").on(table.category),
    index("faq_order_idx").on(table.order),
  ],
);

export const trekReview = sqliteTable(
  "trek_review",
  {
    id: text().primaryKey(),
    trekId: text()
      .notNull()
      .references(() => trek.id, { onDelete: "cascade" }),
    userId: text().references(() => user.id, { onDelete: "set null" }),
    rating: integer().notNull(),
    title: text().notNull(),
    content: text().notNull(),
    ...timestampCols,
  },
  (table) => [
    index("trekReview_rating_idx").on(table.rating),
    index("trekReview_trekId_idx").on(table.trekId),
  ],
);

export const trekRelations = relations(trek, ({ many }) => ({
  departures: many(departure),
  reviews: many(trekReview),
}));

export const departureRelations = relations(departure, ({ one }) => ({
  trek: one(trek, {
    fields: [departure.trekId],
    references: [trek.id],
  }),
  trekLeader: one(user, {
    fields: [departure.trekLeaderId],
    references: [user.id],
  }),
}));

export const expeditionRelations = relations(expedition, ({ many }) => ({
  sessions: many(expeditionSession),
}));

export const expeditionSessionRelations = relations(
  expeditionSession,
  ({ one }) => ({
    expedition: one(expedition, {
      fields: [expeditionSession.expeditionId],
      references: [expedition.id],
    }),
  }),
);

export const courseRelations = relations(course, ({ many }) => ({
  sessions: many(courseSession),
}));

export const courseSessionRelations = relations(courseSession, ({ one }) => ({
  course: one(course, {
    fields: [courseSession.courseId],
    references: [course.id],
  }),
}));

export const faqRelations = relations(faq, () => ({}));

export const trekReviewRelations = relations(trekReview, ({ one }) => ({
  trek: one(trek, {
    fields: [trekReview.trekId],
    references: [trek.id],
  }),
  user: one(user, {
    fields: [trekReview.userId],
    references: [user.id],
  }),
}));
