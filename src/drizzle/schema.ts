import {
  pgEnum,
  pgTable,
  text,
  timestamp,
  integer,
  boolean,
  doublePrecision,
  index,
  uniqueIndex,
} from "drizzle-orm/pg-core";
import { randomUUID } from "node:crypto";
import { sql } from "drizzle-orm";

export const trekDifficulty = pgEnum("TrekDifficulty", [
  "EASY",
  "EASY_MODERATE",
  "MODERATE",
  "HARD",
  "VERY_HARD",
]);
export const bookingStatus = pgEnum("BookingStatus", [
  "PENDING",
  "CONFIRMED",
  "CANCELLED",
  "COMPLETED",
]);
export const paymentStatus = pgEnum("PaymentStatus", [
  "PENDING",
  "COMPLETED",
  "FAILED",
  "REFUNDED",
]);
export const userRole = pgEnum("UserRole", [
  "ADMIN",
  "MODERATOR",
  "USER",
  "SUPER_ADMIN",
  "TREK_LEADER",
]);

// Auth related tables
export const accountTable = pgTable(
  "Account",
  {
    id: text()
      .$defaultFn(() => randomUUID())
      .primaryKey(),
    accountId: text().notNull(),
    providerId: text().notNull(),
    userId: text()
      .notNull()
      .references(() => userTable.id, {
        onDelete: "cascade",
        onUpdate: "cascade",
      }),
    accessToken: text(),
    refreshToken: text(),
    idToken: text(),
    accessTokenExpiresAt: timestamp({ precision: 3 }),
    refreshTokenExpiresAt: timestamp({ precision: 3 }),
    scope: text(),
    password: text(),
    createdAt: timestamp({ precision: 3 })
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
    updatedAt: timestamp({ precision: 3 }).notNull(),
  },
  (table) => [
    index("Account_userId_idx").using("btree", table.userId.asc().nullsLast()),
  ],
);

export const sessionTable = pgTable(
  "Session",
  {
    id: text()
      .$defaultFn(() => randomUUID())
      .primaryKey(),
    expiresAt: timestamp({ precision: 3 }).notNull(),
    token: text().notNull(),
    createdAt: timestamp({ precision: 3 })
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
    updatedAt: timestamp({ precision: 3 }).notNull(),
    ipAddress: text(),
    userAgent: text(),
    userId: text()
      .notNull()
      .references(() => userTable.id, {
        onDelete: "cascade",
        onUpdate: "cascade",
      }),
  },
  (table) => [
    uniqueIndex("Session_token_key").using(
      "btree",
      table.token.asc().nullsLast(),
    ),
    index("Session_userId_idx").using("btree", table.userId.asc().nullsLast()),
  ],
);

export const userTable = pgTable(
  "User",
  {
    id: text()
      .$defaultFn(() => randomUUID())
      .primaryKey(),
    email: text().notNull(),
    username: text().notNull(),
    password: text(),
    createdAt: timestamp({ precision: 3 })
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
    updatedAt: timestamp({ precision: 3 }).notNull(),
    address: text(),
    city: text(),
    firstName: text(),
    lastName: text(),
    phoneNumber: text(),
    pincode: text(),
    state: text(),
    accountLockedUntil: timestamp({ precision: 3 }),
    isActive: boolean().default(true).notNull(),
    isLocked: boolean().default(false).notNull(),
    lastLoginAt: timestamp({ precision: 3 }),
    passwordChangedAt: timestamp({ precision: 3 }),
    role: userRole().default("USER").notNull(),
    isDenied: boolean().default(false).notNull(),
    resetToken: text(),
    resetTokenExpiry: timestamp({ precision: 3 }),
    emailVerified: boolean().default(false).notNull(),
    image: text(),
    name: text().default("").notNull(),
  },
  (table) => [
    index("User_createdAt_idx").using(
      "btree",
      table.createdAt.asc().nullsLast(),
    ),
    index("User_email_idx").using("btree", table.email.asc().nullsLast()),
    uniqueIndex("User_email_key").using("btree", table.email.asc().nullsLast()),
    index("User_isActive_idx").using("btree", table.isActive.asc().nullsLast()),
    index("User_role_idx").using("btree", table.role.asc().nullsLast()),
    uniqueIndex("User_username_key").using(
      "btree",
      table.username.asc().nullsLast(),
    ),
  ],
);

export const verificationTable = pgTable(
  "Verification",
  {
    id: text()
      .$defaultFn(() => randomUUID())
      .primaryKey(),
    identifier: text().notNull(),
    value: text().notNull(),
    expiresAt: timestamp({ precision: 3 }).notNull(),
    createdAt: timestamp({ precision: 3 })
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
    updatedAt: timestamp({ precision: 3 }).notNull(),
  },
  (table) => [
    index("Verification_identifier_idx").using(
      "btree",
      table.identifier.asc().nullsLast(),
    ),
  ],
);

// Application specific tables
export const adminPermission = pgTable(
  "AdminPermission",
  {
    id: text().primaryKey(),
    permission: text().notNull(),
    category: text().notNull(),
    description: text(),
    createdAt: timestamp({ precision: 3 })
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
    updatedAt: timestamp({ precision: 3 }).notNull(),
  },
  (table) => [
    index("AdminPermission_category_idx").using(
      "btree",
      table.category.asc().nullsLast(),
    ),
    uniqueIndex("AdminPermission_permission_key").using(
      "btree",
      table.permission.asc().nullsLast(),
    ),
  ],
);

export const auditLog = pgTable(
  "AuditLog",
  {
    id: text().primaryKey(),
    action: text().notNull(),
    entityType: text().notNull(),
    entityId: text().notNull(),
    userId: text().references(() => userTable.id, {
      onDelete: "set null",
      onUpdate: "cascade",
    }),
    changes: text(),
    metadata: text(),
    createdAt: timestamp({ precision: 3 })
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
    description: text(),
  },
  (table) => [
    index("AuditLog_action_idx").using("btree", table.action.asc().nullsLast()),
    index("AuditLog_createdAt_idx").using(
      "btree",
      table.createdAt.asc().nullsLast(),
    ),
    index("AuditLog_entityId_idx").using(
      "btree",
      table.entityId.asc().nullsLast(),
    ),
    index("AuditLog_entityType_idx").using(
      "btree",
      table.entityType.asc().nullsLast(),
    ),
    index("AuditLog_userId_idx").using("btree", table.userId.asc().nullsLast()),
  ],
);

export const booking = pgTable(
  "Booking",
  {
    id: text().primaryKey(),
    userId: text()
      .notNull()
      .references(() => userTable.id, {
        onDelete: "cascade",
        onUpdate: "cascade",
      }),
    departureId: text()
      .notNull()
      .references(() => departure.id, {
        onDelete: "cascade",
        onUpdate: "cascade",
      }),
    numberOfPeople: integer().default(1).notNull(),
    totalAmount: integer().notNull(),
    status: bookingStatus().default("PENDING").notNull(),
    contactName: text().notNull(),
    contactPhone: text().notNull(),
    contactEmail: text().notNull(),
    cancellationReason: text(),
    cancelledAt: timestamp({ precision: 3 }),
    createdAt: timestamp({ precision: 3 })
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
    updatedAt: timestamp({ precision: 3 }).notNull(),
    emergencyContactName: text(),
    emergencyContactPhone: text(),
    emergencyContactRelation: text(),
    idDocumentType: text(),
    idVerificationDate: timestamp({ precision: 3 }),
    idVerified: boolean().default(false).notNull(),
    isRepeatTrekker: boolean().default(false).notNull(),
    medicalFormDate: timestamp({ precision: 3 }),
    medicalFormSubmitted: boolean().default(false).notNull(),
    previousTreksCount: integer().default(0).notNull(),
    waiverSigned: boolean().default(false).notNull(),
    waiverSignedDate: timestamp({ precision: 3 }),
  },
  (table) => [
    index("Booking_createdAt_idx").using(
      "btree",
      table.createdAt.asc().nullsLast(),
    ),
    index("Booking_departureId_idx").using(
      "btree",
      table.departureId.asc().nullsLast(),
    ),
    index("Booking_status_idx").using("btree", table.status.asc().nullsLast()),
    uniqueIndex("Booking_userId_departureId_key").using(
      "btree",
      table.userId.asc().nullsLast(),
      table.departureId.asc().nullsLast(),
    ),
    index("Booking_userId_idx").using("btree", table.userId.asc().nullsLast()),
  ],
);

export const course = pgTable(
  "Course",
  {
    id: text().primaryKey(),
    slug: text().notNull(),
    name: text().notNull(),
    description: text().notNull(),
    longDescription: text(),
    location: text().notNull(),
    price: integer().notNull(),
    duration: integer().notNull(),
    difficulty: trekDifficulty().notNull(),
    imageUrl: text(),
    thumbnailUrl: text(),
    tags: text()
      .array()
      .default(sql`ARRAY[]`),
    curriculum: text().notNull(),
    inclusions: text()
      .array()
      .default(sql`ARRAY[]`),
    exclusions: text()
      .array()
      .default(sql`ARRAY[]`),
    requirements: text()
      .array()
      .default(sql`ARRAY[]`),
    instructor: text(),
    createdAt: timestamp({ precision: 3 })
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
    updatedAt: timestamp({ precision: 3 }).notNull(),
  },
  (table) => [
    index("Course_difficulty_idx").using(
      "btree",
      table.difficulty.asc().nullsLast(),
    ),
    index("Course_location_idx").using(
      "btree",
      table.location.asc().nullsLast(),
    ),
    index("Course_slug_idx").using("btree", table.slug.asc().nullsLast()),
    uniqueIndex("Course_slug_key").using("btree", table.slug.asc().nullsLast()),
  ],
);

export const courseSession = pgTable(
  "CourseSession",
  {
    id: text().primaryKey(),
    courseId: text()
      .notNull()
      .references(() => course.id, {
        onDelete: "cascade",
        onUpdate: "cascade",
      }),
    startDate: timestamp({ precision: 3 }).notNull(),
    endDate: timestamp({ precision: 3 }).notNull(),
    seatsAvailable: integer().notNull(),
    totalSeats: integer().notNull(),
    pricePerPerson: integer().notNull(),
    isCancelled: boolean().default(false).notNull(),
    cancellationReason: text(),
    createdAt: timestamp({ precision: 3 })
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
    updatedAt: timestamp({ precision: 3 }).notNull(),
  },
  (table) => [
    index("CourseSession_courseId_idx").using(
      "btree",
      table.courseId.asc().nullsLast(),
    ),
    uniqueIndex("CourseSession_courseId_startDate_key").using(
      "btree",
      table.courseId.asc().nullsLast(),
      table.startDate.asc().nullsLast(),
    ),
    index("CourseSession_startDate_idx").using(
      "btree",
      table.startDate.asc().nullsLast(),
    ),
  ],
);

export const departure = pgTable(
  "Departure",
  {
    id: text().primaryKey(),
    trekId: text()
      .notNull()
      .references(() => trek.id, { onDelete: "cascade", onUpdate: "cascade" }),
    startDate: timestamp({ precision: 3 }).notNull(),
    endDate: timestamp({ precision: 3 }).notNull(),
    seatsAvailable: integer().notNull(),
    totalSeats: integer().notNull(),
    pricePerPerson: integer().notNull(),
    isCancelled: boolean().default(false).notNull(),
    cancellationReason: text(),
    createdAt: timestamp({ precision: 3 })
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
    updatedAt: timestamp({ precision: 3 }).notNull(),
    maxWaitlist: integer().default(5).notNull(),
    status: text().default("OPEN").notNull(),
    trekLeaderId: text().references(() => userTable.id, {
      onDelete: "set null",
      onUpdate: "cascade",
    }),
    trekLeaderName: text(),
    waitlistCount: integer().default(0).notNull(),
  },
  (table) => [
    index("Departure_isCancelled_idx").using(
      "btree",
      table.isCancelled.asc().nullsLast(),
    ),
    index("Departure_startDate_idx").using(
      "btree",
      table.startDate.asc().nullsLast(),
    ),
    index("Departure_status_idx").using(
      "btree",
      table.status.asc().nullsLast(),
    ),
    index("Departure_trekId_idx").using(
      "btree",
      table.trekId.asc().nullsLast(),
    ),
    uniqueIndex("Departure_trekId_startDate_key").using(
      "btree",
      table.trekId.asc().nullsLast(),
      table.startDate.asc().nullsLast(),
    ),
  ],
);

export const expedition = pgTable(
  "Expedition",
  {
    id: text().primaryKey(),
    slug: text().notNull(),
    name: text().notNull(),
    description: text().notNull(),
    longDescription: text(),
    state: text().notNull(),
    basePrice: integer().notNull(),
    difficulty: trekDifficulty().notNull(),
    duration: integer().notNull(),
    maxAltitude: integer(),
    distance: doublePrecision(),
    bestSeason: text(),
    imageUrl: text(),
    thumbnailUrl: text(),
    tags: text()
      .array()
      .default(sql`ARRAY[]`),
    itinerary: text().notNull(),
    inclusions: text()
      .array()
      .default(sql`ARRAY[]`),
    exclusions: text()
      .array()
      .default(sql`ARRAY[]`),
    requirements: text()
      .array()
      .default(sql`ARRAY[]`),
    createdAt: timestamp({ precision: 3 })
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
    updatedAt: timestamp({ precision: 3 }).notNull(),
  },
  (table) => [
    index("Expedition_difficulty_idx").using(
      "btree",
      table.difficulty.asc().nullsLast(),
    ),
    index("Expedition_slug_idx").using("btree", table.slug.asc().nullsLast()),
    uniqueIndex("Expedition_slug_key").using(
      "btree",
      table.slug.asc().nullsLast(),
    ),
    index("Expedition_state_idx").using("btree", table.state.asc().nullsLast()),
  ],
);

export const expeditionSession = pgTable(
  "ExpeditionSession",
  {
    id: text().primaryKey(),
    expeditionId: text()
      .notNull()
      .references(() => expedition.id, {
        onDelete: "cascade",
        onUpdate: "cascade",
      }),
    startDate: timestamp({ precision: 3 }).notNull(),
    endDate: timestamp({ precision: 3 }).notNull(),
    seatsAvailable: integer().notNull(),
    totalSeats: integer().notNull(),
    pricePerPerson: integer().notNull(),
    isCancelled: boolean().default(false).notNull(),
    cancellationReason: text(),
    createdAt: timestamp({ precision: 3 })
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
    updatedAt: timestamp({ precision: 3 }).notNull(),
  },
  (table) => [
    index("ExpeditionSession_expeditionId_idx").using(
      "btree",
      table.expeditionId.asc().nullsLast(),
    ),
    uniqueIndex("ExpeditionSession_expeditionId_startDate_key").using(
      "btree",
      table.expeditionId.asc().nullsLast(),
      table.startDate.asc().nullsLast(),
    ),
    index("ExpeditionSession_startDate_idx").using(
      "btree",
      table.startDate.asc().nullsLast(),
    ),
  ],
);

export const failedLoginAttempt = pgTable(
  "FailedLoginAttempt",
  {
    id: text().primaryKey(),
    userId: text()
      .notNull()
      .references(() => userTable.id, {
        onDelete: "cascade",
        onUpdate: "cascade",
      }),
    email: text().notNull(),
    ipAddress: text(),
    userAgent: text(),
    createdAt: timestamp({ precision: 3 })
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
  },
  (table) => [
    index("FailedLoginAttempt_createdAt_idx").using(
      "btree",
      table.createdAt.asc().nullsLast(),
    ),
    index("FailedLoginAttempt_email_idx").using(
      "btree",
      table.email.asc().nullsLast(),
    ),
    index("FailedLoginAttempt_ipAddress_idx").using(
      "btree",
      table.ipAddress.asc().nullsLast(),
    ),
    index("FailedLoginAttempt_userId_idx").using(
      "btree",
      table.userId.asc().nullsLast(),
    ),
  ],
);

export const faq = pgTable(
  "FAQ",
  {
    id: text().primaryKey(),
    question: text().notNull(),
    answer: text().notNull(),
    category: text(),
    order: integer().default(0).notNull(),
    createdAt: timestamp({ precision: 3 })
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
    updatedAt: timestamp({ precision: 3 }).notNull(),
  },
  (table) => [
    index("FAQ_category_idx").using("btree", table.category.asc().nullsLast()),
    index("FAQ_order_idx").using("btree", table.order.asc().nullsLast()),
  ],
);

export const ipRestriction = pgTable(
  "IPRestriction",
  {
    id: text().primaryKey(),
    ipAddress: text().notNull(),
    isAllowed: boolean().default(true).notNull(),
    reason: text(),
    createdAt: timestamp({ precision: 3 })
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
    updatedAt: timestamp({ precision: 3 }).notNull(),
  },
  (table) => [
    index("IPRestriction_ipAddress_idx").using(
      "btree",
      table.ipAddress.asc().nullsLast(),
    ),
    uniqueIndex("IPRestriction_ipAddress_key").using(
      "btree",
      table.ipAddress.asc().nullsLast(),
    ),
    index("IPRestriction_isAllowed_idx").using(
      "btree",
      table.isAllowed.asc().nullsLast(),
    ),
  ],
);

export const marketingMetric = pgTable(
  "MarketingMetric",
  {
    id: text().primaryKey(),
    date: timestamp({ precision: 3 })
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
    websiteVisitors: integer().default(0).notNull(),
    websitePageViews: integer().default(0).notNull(),
    conversionRate: doublePrecision().default(0).notNull(),
    instagramClicks: integer().default(0).notNull(),
    instagramImpressions: integer().default(0).notNull(),
    totalBookings: integer().default(0).notNull(),
    referralBookings: integer().default(0).notNull(),
    repeatCustomerBookings: integer().default(0).notNull(),
    topTreks: text(),
    createdAt: timestamp({ precision: 3 })
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
    updatedAt: timestamp({ precision: 3 }).notNull(),
  },
  (table) => [
    index("MarketingMetric_date_idx").using(
      "btree",
      table.date.asc().nullsLast(),
    ),
  ],
);

export const payment = pgTable(
  "Payment",
  {
    id: text().primaryKey(),
    bookingId: text()
      .notNull()
      .references(() => booking.id, {
        onDelete: "cascade",
        onUpdate: "cascade",
      }),
    userId: text()
      .notNull()
      .references(() => userTable.id, {
        onDelete: "cascade",
        onUpdate: "cascade",
      }),
    amount: integer().notNull(),
    status: paymentStatus().default("PENDING").notNull(),
    paymentGateway: text().notNull(),
    transactionId: text(),
    paymentIntentId: text(),
    metadata: text(),
    errorMessage: text(),
    refundAmount: integer(),
    refundedAt: timestamp({ precision: 3 }),
    refundTransactionId: text(),
    createdAt: timestamp({ precision: 3 })
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
    updatedAt: timestamp({ precision: 3 }).notNull(),
    advanceAmount: integer(),
    balanceAmount: integer(),
    gstAmount: integer(),
    gstNumber: text(),
    paymentMethod: text(),
    trekLeaderPayoutAmount: integer(),
    trekLeaderPayoutStatus: text(),
  },
  (table) => [
    index("Payment_bookingId_idx").using(
      "btree",
      table.bookingId.asc().nullsLast(),
    ),
    uniqueIndex("Payment_bookingId_key").using(
      "btree",
      table.bookingId.asc().nullsLast(),
    ),
    index("Payment_createdAt_idx").using(
      "btree",
      table.createdAt.asc().nullsLast(),
    ),
    index("Payment_status_idx").using("btree", table.status.asc().nullsLast()),
    uniqueIndex("Payment_transactionId_key").using(
      "btree",
      table.transactionId.asc().nullsLast(),
    ),
    index("Payment_userId_idx").using("btree", table.userId.asc().nullsLast()),
  ],
);

export const rolePermission = pgTable(
  "RolePermission",
  {
    id: text().primaryKey(),
    permissionId: text()
      .notNull()
      .references(() => adminPermission.id, {
        onDelete: "cascade",
        onUpdate: "cascade",
      }),
    role: userRole().notNull(),
    isEnabled: boolean().default(true).notNull(),
    createdAt: timestamp({ precision: 3 })
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
    updatedAt: timestamp({ precision: 3 }).notNull(),
  },
  (table) => [
    uniqueIndex("RolePermission_permissionId_role_key").using(
      "btree",
      table.permissionId.asc().nullsLast(),
      table.role.asc().nullsLast(),
    ),
  ],
);

export const trek = pgTable(
  "Trek",
  {
    id: text().primaryKey(),
    slug: text().notNull(),
    name: text().notNull(),
    description: text().notNull(),
    longDescription: text(),
    state: text().notNull(),
    basePrice: integer().notNull(),
    difficulty: trekDifficulty().notNull(),
    duration: integer().notNull(),
    maxAltitude: integer(),
    distance: doublePrecision(),
    bestSeason: text(),
    imageUrl: text(),
    thumbnailUrl: text(),
    tags: text()
      .array()
      .default(sql`ARRAY[]`),
    itinerary: text().notNull(),
    inclusions: text()
      .array()
      .default(sql`ARRAY[]`),
    exclusions: text()
      .array()
      .default(sql`ARRAY[]`),
    requirements: text()
      .array()
      .default(sql`ARRAY[]`),
    createdAt: timestamp({ precision: 3 })
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
    updatedAt: timestamp({ precision: 3 }).notNull(),
    aboutText: text(),
    accommodationType: text(),
    bestFor: text(),
    bestTimeJson: text(),
    contentGeneratedAt: timestamp({ precision: 3 }),
    contentSources: text()
      .array()
      .default(sql`ARRAY[]`),
    contentVerified: boolean().default(false).notNull(),
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
    seoKeywords: text()
      .array()
      .default(sql`ARRAY[]`),
    seoTitle: text(),
    tagline: text(),
  },
  (table) => [
    index("Trek_contentVerified_idx").using(
      "btree",
      table.contentVerified.asc().nullsLast(),
    ),
    index("Trek_difficulty_idx").using(
      "btree",
      table.difficulty.asc().nullsLast(),
    ),
    index("Trek_slug_idx").using("btree", table.slug.asc().nullsLast()),
    uniqueIndex("Trek_slug_key").using("btree", table.slug.asc().nullsLast()),
    index("Trek_state_idx").using("btree", table.state.asc().nullsLast()),
  ],
);

export const trekLeaderPayout = pgTable(
  "TrekLeaderPayout",
  {
    id: text().primaryKey(),
    trekLeaderId: text()
      .notNull()
      .references(() => userTable.id, {
        onDelete: "restrict",
        onUpdate: "cascade",
      }),
    departureId: text()
      .notNull()
      .references(() => departure.id, {
        onDelete: "restrict",
        onUpdate: "cascade",
      }),
    amount: integer().notNull(),
    status: text().default("PENDING").notNull(),
    paymentMethod: text(),
    transactionId: text(),
    paidAt: timestamp({ precision: 3 }),
    notes: text(),
    createdAt: timestamp({ precision: 3 })
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
    updatedAt: timestamp({ precision: 3 }).notNull(),
  },
  (table) => [
    index("TrekLeaderPayout_status_idx").using(
      "btree",
      table.status.asc().nullsLast(),
    ),
    index("TrekLeaderPayout_trekLeaderId_idx").using(
      "btree",
      table.trekLeaderId.asc().nullsLast(),
    ),
  ],
);

export const trekReview = pgTable(
  "TrekReview",
  {
    id: text().primaryKey(),
    trekId: text()
      .notNull()
      .references(() => trek.id, { onDelete: "cascade", onUpdate: "cascade" }),
    userId: text().notNull(),
    rating: integer().notNull(),
    title: text().notNull(),
    content: text().notNull(),
    createdAt: timestamp({ precision: 3 })
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
    updatedAt: timestamp({ precision: 3 }).notNull(),
  },
  (table) => [
    index("TrekReview_rating_idx").using(
      "btree",
      table.rating.asc().nullsLast(),
    ),
    index("TrekReview_trekId_idx").using(
      "btree",
      table.trekId.asc().nullsLast(),
    ),
  ],
);
