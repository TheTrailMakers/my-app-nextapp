-- Current sql file was generated after introspecting the database
-- If you want to run this migration please uncomment this code before executing migrations
/*
CREATE TYPE "TrekDifficulty" AS ENUM('EASY', 'EASY_MODERATE', 'MODERATE', 'HARD', 'VERY_HARD');--> statement-breakpoint
CREATE TYPE "BookingStatus" AS ENUM('PENDING', 'CONFIRMED', 'CANCELLED', 'COMPLETED');--> statement-breakpoint
CREATE TYPE "PaymentStatus" AS ENUM('PENDING', 'COMPLETED', 'FAILED', 'REFUNDED');--> statement-breakpoint
CREATE TYPE "UserRole" AS ENUM('ADMIN', 'MODERATOR', 'USER', 'SUPER_ADMIN', 'TREK_LEADER');--> statement-breakpoint
CREATE TABLE "Account" (
	"id" text PRIMARY KEY,
	"accountId" text NOT NULL,
	"providerId" text NOT NULL,
	"userId" text NOT NULL,
	"accessToken" text,
	"refreshToken" text,
	"idToken" text,
	"accessTokenExpiresAt" timestamp(3),
	"refreshTokenExpiresAt" timestamp(3),
	"scope" text,
	"password" text,
	"createdAt" timestamp(3) DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"updatedAt" timestamp(3) NOT NULL
);
--> statement-breakpoint
CREATE TABLE "AdminPermission" (
	"id" text PRIMARY KEY,
	"permission" text NOT NULL,
	"category" text NOT NULL,
	"description" text,
	"createdAt" timestamp(3) DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"updatedAt" timestamp(3) NOT NULL
);
--> statement-breakpoint
CREATE TABLE "AuditLog" (
	"id" text PRIMARY KEY,
	"action" text NOT NULL,
	"entityType" text NOT NULL,
	"entityId" text NOT NULL,
	"userId" text,
	"changes" text,
	"metadata" text,
	"createdAt" timestamp(3) DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"description" text
);
--> statement-breakpoint
CREATE TABLE "Booking" (
	"id" text PRIMARY KEY,
	"userId" text NOT NULL,
	"departureId" text NOT NULL,
	"numberOfPeople" integer DEFAULT 1 NOT NULL,
	"totalAmount" integer NOT NULL,
	"status" "BookingStatus" DEFAULT 'PENDING'::"BookingStatus" NOT NULL,
	"contactName" text NOT NULL,
	"contactPhone" text NOT NULL,
	"contactEmail" text NOT NULL,
	"cancellationReason" text,
	"cancelledAt" timestamp(3),
	"createdAt" timestamp(3) DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"updatedAt" timestamp(3) NOT NULL,
	"emergencyContactName" text,
	"emergencyContactPhone" text,
	"emergencyContactRelation" text,
	"idDocumentType" text,
	"idVerificationDate" timestamp(3),
	"idVerified" boolean DEFAULT false NOT NULL,
	"isRepeatTrekker" boolean DEFAULT false NOT NULL,
	"medicalFormDate" timestamp(3),
	"medicalFormSubmitted" boolean DEFAULT false NOT NULL,
	"previousTreksCount" integer DEFAULT 0 NOT NULL,
	"waiverSigned" boolean DEFAULT false NOT NULL,
	"waiverSignedDate" timestamp(3)
);
--> statement-breakpoint
CREATE TABLE "Course" (
	"id" text PRIMARY KEY,
	"slug" text NOT NULL,
	"name" text NOT NULL,
	"description" text NOT NULL,
	"longDescription" text,
	"location" text NOT NULL,
	"price" integer NOT NULL,
	"duration" integer NOT NULL,
	"difficulty" "TrekDifficulty" NOT NULL,
	"imageUrl" text,
	"thumbnailUrl" text,
	"tags" text[] DEFAULT ARRAY[]::text[],
	"curriculum" text NOT NULL,
	"inclusions" text[] DEFAULT ARRAY[]::text[],
	"exclusions" text[] DEFAULT ARRAY[]::text[],
	"requirements" text[] DEFAULT ARRAY[]::text[],
	"instructor" text,
	"createdAt" timestamp(3) DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"updatedAt" timestamp(3) NOT NULL
);
--> statement-breakpoint
CREATE TABLE "CourseSession" (
	"id" text PRIMARY KEY,
	"courseId" text NOT NULL,
	"startDate" timestamp(3) NOT NULL,
	"endDate" timestamp(3) NOT NULL,
	"seatsAvailable" integer NOT NULL,
	"totalSeats" integer NOT NULL,
	"pricePerPerson" integer NOT NULL,
	"isCancelled" boolean DEFAULT false NOT NULL,
	"cancellationReason" text,
	"createdAt" timestamp(3) DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"updatedAt" timestamp(3) NOT NULL
);
--> statement-breakpoint
CREATE TABLE "Departure" (
	"id" text PRIMARY KEY,
	"trekId" text NOT NULL,
	"startDate" timestamp(3) NOT NULL,
	"endDate" timestamp(3) NOT NULL,
	"seatsAvailable" integer NOT NULL,
	"totalSeats" integer NOT NULL,
	"pricePerPerson" integer NOT NULL,
	"isCancelled" boolean DEFAULT false NOT NULL,
	"cancellationReason" text,
	"createdAt" timestamp(3) DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"updatedAt" timestamp(3) NOT NULL,
	"maxWaitlist" integer DEFAULT 5 NOT NULL,
	"status" text DEFAULT 'OPEN' NOT NULL,
	"trekLeaderId" text,
	"trekLeaderName" text,
	"waitlistCount" integer DEFAULT 0 NOT NULL
);
--> statement-breakpoint
CREATE TABLE "Expedition" (
	"id" text PRIMARY KEY,
	"slug" text NOT NULL,
	"name" text NOT NULL,
	"description" text NOT NULL,
	"longDescription" text,
	"state" text NOT NULL,
	"basePrice" integer NOT NULL,
	"difficulty" "TrekDifficulty" NOT NULL,
	"duration" integer NOT NULL,
	"maxAltitude" integer,
	"distance" double precision,
	"bestSeason" text,
	"imageUrl" text,
	"thumbnailUrl" text,
	"tags" text[] DEFAULT ARRAY[]::text[],
	"itinerary" text NOT NULL,
	"inclusions" text[] DEFAULT ARRAY[]::text[],
	"exclusions" text[] DEFAULT ARRAY[]::text[],
	"requirements" text[] DEFAULT ARRAY[]::text[],
	"createdAt" timestamp(3) DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"updatedAt" timestamp(3) NOT NULL
);
--> statement-breakpoint
CREATE TABLE "ExpeditionSession" (
	"id" text PRIMARY KEY,
	"expeditionId" text NOT NULL,
	"startDate" timestamp(3) NOT NULL,
	"endDate" timestamp(3) NOT NULL,
	"seatsAvailable" integer NOT NULL,
	"totalSeats" integer NOT NULL,
	"pricePerPerson" integer NOT NULL,
	"isCancelled" boolean DEFAULT false NOT NULL,
	"cancellationReason" text,
	"createdAt" timestamp(3) DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"updatedAt" timestamp(3) NOT NULL
);
--> statement-breakpoint
CREATE TABLE "FailedLoginAttempt" (
	"id" text PRIMARY KEY,
	"userId" text NOT NULL,
	"email" text NOT NULL,
	"ipAddress" text,
	"userAgent" text,
	"createdAt" timestamp(3) DEFAULT CURRENT_TIMESTAMP NOT NULL
);
--> statement-breakpoint
CREATE TABLE "FAQ" (
	"id" text PRIMARY KEY,
	"question" text NOT NULL,
	"answer" text NOT NULL,
	"category" text,
	"order" integer DEFAULT 0 NOT NULL,
	"createdAt" timestamp(3) DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"updatedAt" timestamp(3) NOT NULL
);
--> statement-breakpoint
CREATE TABLE "IPRestriction" (
	"id" text PRIMARY KEY,
	"ipAddress" text NOT NULL,
	"isAllowed" boolean DEFAULT true NOT NULL,
	"reason" text,
	"createdAt" timestamp(3) DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"updatedAt" timestamp(3) NOT NULL
);
--> statement-breakpoint
CREATE TABLE "MarketingMetric" (
	"id" text PRIMARY KEY,
	"date" timestamp(3) DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"websiteVisitors" integer DEFAULT 0 NOT NULL,
	"websitePageViews" integer DEFAULT 0 NOT NULL,
	"conversionRate" double precision DEFAULT 0 NOT NULL,
	"instagramClicks" integer DEFAULT 0 NOT NULL,
	"instagramImpressions" integer DEFAULT 0 NOT NULL,
	"totalBookings" integer DEFAULT 0 NOT NULL,
	"referralBookings" integer DEFAULT 0 NOT NULL,
	"repeatCustomerBookings" integer DEFAULT 0 NOT NULL,
	"topTreks" text,
	"createdAt" timestamp(3) DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"updatedAt" timestamp(3) NOT NULL
);
--> statement-breakpoint
CREATE TABLE "Payment" (
	"id" text PRIMARY KEY,
	"bookingId" text NOT NULL,
	"userId" text NOT NULL,
	"amount" integer NOT NULL,
	"status" "PaymentStatus" DEFAULT 'PENDING'::"PaymentStatus" NOT NULL,
	"paymentGateway" text NOT NULL,
	"transactionId" text,
	"paymentIntentId" text,
	"metadata" text,
	"errorMessage" text,
	"refundAmount" integer,
	"refundedAt" timestamp(3),
	"refundTransactionId" text,
	"createdAt" timestamp(3) DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"updatedAt" timestamp(3) NOT NULL,
	"advanceAmount" integer,
	"balanceAmount" integer,
	"gstAmount" integer,
	"gstNumber" text,
	"paymentMethod" text,
	"trekLeaderPayoutAmount" integer,
	"trekLeaderPayoutStatus" text
);
--> statement-breakpoint
CREATE TABLE "RolePermission" (
	"id" text PRIMARY KEY,
	"permissionId" text NOT NULL,
	"role" "UserRole" NOT NULL,
	"isEnabled" boolean DEFAULT true NOT NULL,
	"createdAt" timestamp(3) DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"updatedAt" timestamp(3) NOT NULL
);
--> statement-breakpoint
CREATE TABLE "Session" (
	"id" text PRIMARY KEY,
	"expiresAt" timestamp(3) NOT NULL,
	"token" text NOT NULL,
	"createdAt" timestamp(3) DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"updatedAt" timestamp(3) NOT NULL,
	"ipAddress" text,
	"userAgent" text,
	"userId" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE "Trek" (
	"id" text PRIMARY KEY,
	"slug" text NOT NULL,
	"name" text NOT NULL,
	"description" text NOT NULL,
	"longDescription" text,
	"state" text NOT NULL,
	"basePrice" integer NOT NULL,
	"difficulty" "TrekDifficulty" NOT NULL,
	"duration" integer NOT NULL,
	"maxAltitude" integer,
	"distance" double precision,
	"bestSeason" text,
	"imageUrl" text,
	"thumbnailUrl" text,
	"tags" text[] DEFAULT ARRAY[]::text[],
	"itinerary" text NOT NULL,
	"inclusions" text[] DEFAULT ARRAY[]::text[],
	"exclusions" text[] DEFAULT ARRAY[]::text[],
	"requirements" text[] DEFAULT ARRAY[]::text[],
	"createdAt" timestamp(3) DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"updatedAt" timestamp(3) NOT NULL,
	"aboutText" text,
	"accommodationType" text,
	"bestFor" text,
	"bestTimeJson" text,
	"contentGeneratedAt" timestamp(3),
	"contentSources" text[] DEFAULT ARRAY[]::text[],
	"contentVerified" boolean DEFAULT false NOT NULL,
	"difficultyDetails" text,
	"dropoffTime" text,
	"faqsJson" text,
	"gearChecklist" text,
	"gettingThere" text,
	"itineraryJson" text,
	"permits" text,
	"pickupTime" text,
	"schemaMarkup" text,
	"seoDescription" text,
	"seoKeywords" text[] DEFAULT ARRAY[]::text[],
	"seoTitle" text,
	"tagline" text
);
--> statement-breakpoint
CREATE TABLE "TrekLeaderPayout" (
	"id" text PRIMARY KEY,
	"trekLeaderId" text NOT NULL,
	"departureId" text NOT NULL,
	"amount" integer NOT NULL,
	"status" text DEFAULT 'PENDING' NOT NULL,
	"paymentMethod" text,
	"transactionId" text,
	"paidAt" timestamp(3),
	"notes" text,
	"createdAt" timestamp(3) DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"updatedAt" timestamp(3) NOT NULL
);
--> statement-breakpoint
CREATE TABLE "TrekReview" (
	"id" text PRIMARY KEY,
	"trekId" text NOT NULL,
	"userId" text NOT NULL,
	"rating" integer NOT NULL,
	"title" text NOT NULL,
	"content" text NOT NULL,
	"createdAt" timestamp(3) DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"updatedAt" timestamp(3) NOT NULL
);
--> statement-breakpoint
CREATE TABLE "User" (
	"id" text PRIMARY KEY,
	"email" text NOT NULL,
	"username" text NOT NULL,
	"password" text,
	"createdAt" timestamp(3) DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"updatedAt" timestamp(3) NOT NULL,
	"address" text,
	"city" text,
	"firstName" text,
	"lastName" text,
	"phoneNumber" text,
	"pincode" text,
	"state" text,
	"accountLockedUntil" timestamp(3),
	"isActive" boolean DEFAULT true NOT NULL,
	"isLocked" boolean DEFAULT false NOT NULL,
	"lastLoginAt" timestamp(3),
	"passwordChangedAt" timestamp(3),
	"role" "UserRole" DEFAULT 'USER'::"UserRole" NOT NULL,
	"isDenied" boolean DEFAULT false NOT NULL,
	"resetToken" text,
	"resetTokenExpiry" timestamp(3),
	"emailVerified" boolean DEFAULT false NOT NULL,
	"image" text,
	"name" text DEFAULT '' NOT NULL
);
--> statement-breakpoint
CREATE TABLE "Verification" (
	"id" text PRIMARY KEY,
	"identifier" text NOT NULL,
	"value" text NOT NULL,
	"expiresAt" timestamp(3) NOT NULL,
	"createdAt" timestamp(3) DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"updatedAt" timestamp(3) NOT NULL
);
--> statement-breakpoint
CREATE INDEX "Account_userId_idx" ON "Account" ("userId");--> statement-breakpoint
CREATE INDEX "AdminPermission_category_idx" ON "AdminPermission" ("category");--> statement-breakpoint
CREATE UNIQUE INDEX "AdminPermission_permission_key" ON "AdminPermission" ("permission");--> statement-breakpoint
CREATE INDEX "AuditLog_action_idx" ON "AuditLog" ("action");--> statement-breakpoint
CREATE INDEX "AuditLog_createdAt_idx" ON "AuditLog" ("createdAt");--> statement-breakpoint
CREATE INDEX "AuditLog_entityId_idx" ON "AuditLog" ("entityId");--> statement-breakpoint
CREATE INDEX "AuditLog_entityType_idx" ON "AuditLog" ("entityType");--> statement-breakpoint
CREATE INDEX "AuditLog_userId_idx" ON "AuditLog" ("userId");--> statement-breakpoint
CREATE INDEX "Booking_createdAt_idx" ON "Booking" ("createdAt");--> statement-breakpoint
CREATE INDEX "Booking_departureId_idx" ON "Booking" ("departureId");--> statement-breakpoint
CREATE INDEX "Booking_status_idx" ON "Booking" ("status");--> statement-breakpoint
CREATE UNIQUE INDEX "Booking_userId_departureId_key" ON "Booking" ("userId","departureId");--> statement-breakpoint
CREATE INDEX "Booking_userId_idx" ON "Booking" ("userId");--> statement-breakpoint
CREATE INDEX "Course_difficulty_idx" ON "Course" ("difficulty");--> statement-breakpoint
CREATE INDEX "Course_location_idx" ON "Course" ("location");--> statement-breakpoint
CREATE INDEX "Course_slug_idx" ON "Course" ("slug");--> statement-breakpoint
CREATE UNIQUE INDEX "Course_slug_key" ON "Course" ("slug");--> statement-breakpoint
CREATE INDEX "CourseSession_courseId_idx" ON "CourseSession" ("courseId");--> statement-breakpoint
CREATE UNIQUE INDEX "CourseSession_courseId_startDate_key" ON "CourseSession" ("courseId","startDate");--> statement-breakpoint
CREATE INDEX "CourseSession_startDate_idx" ON "CourseSession" ("startDate");--> statement-breakpoint
CREATE INDEX "Departure_isCancelled_idx" ON "Departure" ("isCancelled");--> statement-breakpoint
CREATE INDEX "Departure_startDate_idx" ON "Departure" ("startDate");--> statement-breakpoint
CREATE INDEX "Departure_status_idx" ON "Departure" ("status");--> statement-breakpoint
CREATE INDEX "Departure_trekId_idx" ON "Departure" ("trekId");--> statement-breakpoint
CREATE UNIQUE INDEX "Departure_trekId_startDate_key" ON "Departure" ("trekId","startDate");--> statement-breakpoint
CREATE INDEX "Expedition_difficulty_idx" ON "Expedition" ("difficulty");--> statement-breakpoint
CREATE INDEX "Expedition_slug_idx" ON "Expedition" ("slug");--> statement-breakpoint
CREATE UNIQUE INDEX "Expedition_slug_key" ON "Expedition" ("slug");--> statement-breakpoint
CREATE INDEX "Expedition_state_idx" ON "Expedition" ("state");--> statement-breakpoint
CREATE INDEX "ExpeditionSession_expeditionId_idx" ON "ExpeditionSession" ("expeditionId");--> statement-breakpoint
CREATE UNIQUE INDEX "ExpeditionSession_expeditionId_startDate_key" ON "ExpeditionSession" ("expeditionId","startDate");--> statement-breakpoint
CREATE INDEX "ExpeditionSession_startDate_idx" ON "ExpeditionSession" ("startDate");--> statement-breakpoint
CREATE INDEX "FailedLoginAttempt_createdAt_idx" ON "FailedLoginAttempt" ("createdAt");--> statement-breakpoint
CREATE INDEX "FailedLoginAttempt_email_idx" ON "FailedLoginAttempt" ("email");--> statement-breakpoint
CREATE INDEX "FailedLoginAttempt_ipAddress_idx" ON "FailedLoginAttempt" ("ipAddress");--> statement-breakpoint
CREATE INDEX "FailedLoginAttempt_userId_idx" ON "FailedLoginAttempt" ("userId");--> statement-breakpoint
CREATE INDEX "FAQ_category_idx" ON "FAQ" ("category");--> statement-breakpoint
CREATE INDEX "FAQ_order_idx" ON "FAQ" ("order");--> statement-breakpoint
CREATE INDEX "IPRestriction_ipAddress_idx" ON "IPRestriction" ("ipAddress");--> statement-breakpoint
CREATE UNIQUE INDEX "IPRestriction_ipAddress_key" ON "IPRestriction" ("ipAddress");--> statement-breakpoint
CREATE INDEX "IPRestriction_isAllowed_idx" ON "IPRestriction" ("isAllowed");--> statement-breakpoint
CREATE INDEX "MarketingMetric_date_idx" ON "MarketingMetric" ("date");--> statement-breakpoint
CREATE INDEX "Payment_bookingId_idx" ON "Payment" ("bookingId");--> statement-breakpoint
CREATE UNIQUE INDEX "Payment_bookingId_key" ON "Payment" ("bookingId");--> statement-breakpoint
CREATE INDEX "Payment_createdAt_idx" ON "Payment" ("createdAt");--> statement-breakpoint
CREATE INDEX "Payment_status_idx" ON "Payment" ("status");--> statement-breakpoint
CREATE UNIQUE INDEX "Payment_transactionId_key" ON "Payment" ("transactionId");--> statement-breakpoint
CREATE INDEX "Payment_userId_idx" ON "Payment" ("userId");--> statement-breakpoint
CREATE UNIQUE INDEX "RolePermission_permissionId_role_key" ON "RolePermission" ("permissionId","role");--> statement-breakpoint
CREATE UNIQUE INDEX "Session_token_key" ON "Session" ("token");--> statement-breakpoint
CREATE INDEX "Session_userId_idx" ON "Session" ("userId");--> statement-breakpoint
CREATE INDEX "Trek_contentVerified_idx" ON "Trek" ("contentVerified");--> statement-breakpoint
CREATE INDEX "Trek_difficulty_idx" ON "Trek" ("difficulty");--> statement-breakpoint
CREATE INDEX "Trek_slug_idx" ON "Trek" ("slug");--> statement-breakpoint
CREATE UNIQUE INDEX "Trek_slug_key" ON "Trek" ("slug");--> statement-breakpoint
CREATE INDEX "Trek_state_idx" ON "Trek" ("state");--> statement-breakpoint
CREATE INDEX "TrekLeaderPayout_status_idx" ON "TrekLeaderPayout" ("status");--> statement-breakpoint
CREATE INDEX "TrekLeaderPayout_trekLeaderId_idx" ON "TrekLeaderPayout" ("trekLeaderId");--> statement-breakpoint
CREATE INDEX "TrekReview_rating_idx" ON "TrekReview" ("rating");--> statement-breakpoint
CREATE INDEX "TrekReview_trekId_idx" ON "TrekReview" ("trekId");--> statement-breakpoint
CREATE INDEX "User_createdAt_idx" ON "User" ("createdAt");--> statement-breakpoint
CREATE INDEX "User_email_idx" ON "User" ("email");--> statement-breakpoint
CREATE UNIQUE INDEX "User_email_key" ON "User" ("email");--> statement-breakpoint
CREATE INDEX "User_isActive_idx" ON "User" ("isActive");--> statement-breakpoint
CREATE INDEX "User_role_idx" ON "User" ("role");--> statement-breakpoint
CREATE UNIQUE INDEX "User_username_key" ON "User" ("username");--> statement-breakpoint
CREATE INDEX "Verification_identifier_idx" ON "Verification" ("identifier");--> statement-breakpoint
ALTER TABLE "Departure" ADD CONSTRAINT "Departure_trekId_fkey" FOREIGN KEY ("trekId") REFERENCES "Trek"("id") ON DELETE CASCADE ON UPDATE CASCADE;--> statement-breakpoint
ALTER TABLE "Departure" ADD CONSTRAINT "Departure_trekLeaderId_fkey" FOREIGN KEY ("trekLeaderId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;--> statement-breakpoint
ALTER TABLE "Booking" ADD CONSTRAINT "Booking_departureId_fkey" FOREIGN KEY ("departureId") REFERENCES "Departure"("id") ON DELETE CASCADE ON UPDATE CASCADE;--> statement-breakpoint
ALTER TABLE "Booking" ADD CONSTRAINT "Booking_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;--> statement-breakpoint
ALTER TABLE "Payment" ADD CONSTRAINT "Payment_bookingId_fkey" FOREIGN KEY ("bookingId") REFERENCES "Booking"("id") ON DELETE CASCADE ON UPDATE CASCADE;--> statement-breakpoint
ALTER TABLE "Payment" ADD CONSTRAINT "Payment_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;--> statement-breakpoint
ALTER TABLE "TrekReview" ADD CONSTRAINT "TrekReview_trekId_fkey" FOREIGN KEY ("trekId") REFERENCES "Trek"("id") ON DELETE CASCADE ON UPDATE CASCADE;--> statement-breakpoint
ALTER TABLE "AuditLog" ADD CONSTRAINT "AuditLog_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;--> statement-breakpoint
ALTER TABLE "ExpeditionSession" ADD CONSTRAINT "ExpeditionSession_expeditionId_fkey" FOREIGN KEY ("expeditionId") REFERENCES "Expedition"("id") ON DELETE CASCADE ON UPDATE CASCADE;--> statement-breakpoint
ALTER TABLE "CourseSession" ADD CONSTRAINT "CourseSession_courseId_fkey" FOREIGN KEY ("courseId") REFERENCES "Course"("id") ON DELETE CASCADE ON UPDATE CASCADE;--> statement-breakpoint
ALTER TABLE "FailedLoginAttempt" ADD CONSTRAINT "FailedLoginAttempt_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;--> statement-breakpoint
ALTER TABLE "RolePermission" ADD CONSTRAINT "RolePermission_permissionId_fkey" FOREIGN KEY ("permissionId") REFERENCES "AdminPermission"("id") ON DELETE CASCADE ON UPDATE CASCADE;--> statement-breakpoint
ALTER TABLE "TrekLeaderPayout" ADD CONSTRAINT "TrekLeaderPayout_departureId_fkey" FOREIGN KEY ("departureId") REFERENCES "Departure"("id") ON DELETE RESTRICT ON UPDATE CASCADE;--> statement-breakpoint
ALTER TABLE "TrekLeaderPayout" ADD CONSTRAINT "TrekLeaderPayout_trekLeaderId_fkey" FOREIGN KEY ("trekLeaderId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;--> statement-breakpoint
ALTER TABLE "Session" ADD CONSTRAINT "Session_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;--> statement-breakpoint
ALTER TABLE "Account" ADD CONSTRAINT "Account_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
*/