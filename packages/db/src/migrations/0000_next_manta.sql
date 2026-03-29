CREATE TABLE `account` (
	`id` text PRIMARY KEY NOT NULL,
	`account_id` text NOT NULL,
	`provider_id` text NOT NULL,
	`user_id` text NOT NULL,
	`access_token` text,
	`refresh_token` text,
	`id_token` text,
	`access_token_expires_at` integer,
	`refresh_token_expires_at` integer,
	`scope` text,
	`password` text,
	`created_at` integer DEFAULT (unixepoch() * 1000) NOT NULL,
	`updated_at` integer DEFAULT (unixepoch() * 1000) NOT NULL,
	FOREIGN KEY (`user_id`) REFERENCES `user`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE INDEX `account_userId_idx` ON `account` (`user_id`);--> statement-breakpoint
CREATE TABLE `session` (
	`id` text PRIMARY KEY NOT NULL,
	`expires_at` integer NOT NULL,
	`token` text NOT NULL,
	`ip_address` text,
	`user_agent` text,
	`user_id` text NOT NULL,
	`created_at` integer DEFAULT (unixepoch() * 1000) NOT NULL,
	`updated_at` integer DEFAULT (unixepoch() * 1000) NOT NULL,
	FOREIGN KEY (`user_id`) REFERENCES `user`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE UNIQUE INDEX `session_token_unique` ON `session` (`token`);--> statement-breakpoint
CREATE INDEX `session_userId_idx` ON `session` (`user_id`);--> statement-breakpoint
CREATE TABLE `user` (
	`id` text PRIMARY KEY NOT NULL,
	`email` text NOT NULL,
	`username` text NOT NULL,
	`password` text,
	`email_verified` integer DEFAULT false NOT NULL,
	`address` text,
	`city` text,
	`first_name` text,
	`last_name` text,
	`phone_number` text,
	`pincode` text,
	`state` text,
	`account_locked_until` integer,
	`is_active` integer DEFAULT true NOT NULL,
	`is_locked` integer DEFAULT false NOT NULL,
	`last_login_at` integer,
	`password_changed_at` integer,
	`role` text DEFAULT 'USER' NOT NULL,
	`is_denied` integer DEFAULT false NOT NULL,
	`reset_token` text,
	`reset_token_expiry` integer,
	`image` text,
	`name` text DEFAULT '' NOT NULL,
	`created_at` integer DEFAULT (unixepoch() * 1000) NOT NULL,
	`updated_at` integer DEFAULT (unixepoch() * 1000) NOT NULL
);
--> statement-breakpoint
CREATE INDEX `user_accountLockedUntil_idx` ON `user` (`account_locked_until`);--> statement-breakpoint
CREATE INDEX `user_createdAt_idx` ON `user` (`created_at`);--> statement-breakpoint
CREATE INDEX `user_email_idx` ON `user` (`email`);--> statement-breakpoint
CREATE INDEX `user_isActive_idx` ON `user` (`is_active`);--> statement-breakpoint
CREATE INDEX `user_role_idx` ON `user` (`role`);--> statement-breakpoint
CREATE UNIQUE INDEX `user_email_key` ON `user` (`email`);--> statement-breakpoint
CREATE UNIQUE INDEX `user_username_key` ON `user` (`username`);--> statement-breakpoint
CREATE TABLE `verification` (
	`id` text PRIMARY KEY NOT NULL,
	`identifier` text NOT NULL,
	`value` text NOT NULL,
	`expires_at` integer NOT NULL,
	`created_at` integer DEFAULT (unixepoch() * 1000) NOT NULL,
	`updated_at` integer DEFAULT (unixepoch() * 1000) NOT NULL
);
--> statement-breakpoint
CREATE INDEX `verification_identifier_idx` ON `verification` (`identifier`);--> statement-breakpoint
CREATE TABLE `booking` (
	`id` text PRIMARY KEY NOT NULL,
	`user_id` text NOT NULL,
	`departure_id` text NOT NULL,
	`number_of_people` integer DEFAULT 1 NOT NULL,
	`total_amount` integer NOT NULL,
	`status` text DEFAULT 'PENDING' NOT NULL,
	`contact_name` text NOT NULL,
	`contact_phone` text NOT NULL,
	`contact_email` text NOT NULL,
	`cancellation_reason` text,
	`cancelled_at` integer,
	`emergency_contact_name` text,
	`emergency_contact_phone` text,
	`emergency_contact_relation` text,
	`id_document_type` text,
	`id_verification_date` integer,
	`id_verified` integer DEFAULT false NOT NULL,
	`is_repeat_trekker` integer DEFAULT false NOT NULL,
	`medical_form_date` integer,
	`medical_form_submitted` integer DEFAULT false NOT NULL,
	`previous_treks_count` integer DEFAULT 0 NOT NULL,
	`waiver_signed` integer DEFAULT false NOT NULL,
	`waiver_signed_date` integer,
	`created_at` integer DEFAULT (unixepoch() * 1000) NOT NULL,
	`updated_at` integer DEFAULT (unixepoch() * 1000) NOT NULL,
	FOREIGN KEY (`user_id`) REFERENCES `user`(`id`) ON UPDATE no action ON DELETE cascade,
	FOREIGN KEY (`departure_id`) REFERENCES `departure`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE INDEX `booking_createdAt_idx` ON `booking` (`created_at`);--> statement-breakpoint
CREATE INDEX `booking_departureId_idx` ON `booking` (`departure_id`);--> statement-breakpoint
CREATE INDEX `booking_status_idx` ON `booking` (`status`);--> statement-breakpoint
CREATE INDEX `booking_userId_idx` ON `booking` (`user_id`);--> statement-breakpoint
CREATE UNIQUE INDEX `booking_userId_departureId_key` ON `booking` (`user_id`,`departure_id`);--> statement-breakpoint
CREATE TABLE `payment` (
	`id` text PRIMARY KEY NOT NULL,
	`booking_id` text NOT NULL,
	`user_id` text NOT NULL,
	`amount` integer NOT NULL,
	`status` text DEFAULT 'PENDING' NOT NULL,
	`payment_gateway` text NOT NULL,
	`transaction_id` text,
	`payment_intent_id` text,
	`metadata` text,
	`error_message` text,
	`refund_amount` integer,
	`refunded_at` integer,
	`refund_transaction_id` text,
	`advance_amount` integer,
	`balance_amount` integer,
	`gst_amount` integer,
	`gst_number` text,
	`payment_method` text,
	`trek_leader_payout_amount` integer,
	`trek_leader_payout_status` text,
	`created_at` integer DEFAULT (unixepoch() * 1000) NOT NULL,
	`updated_at` integer DEFAULT (unixepoch() * 1000) NOT NULL,
	FOREIGN KEY (`booking_id`) REFERENCES `booking`(`id`) ON UPDATE no action ON DELETE cascade,
	FOREIGN KEY (`user_id`) REFERENCES `user`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE INDEX `payment_bookingId_idx` ON `payment` (`booking_id`);--> statement-breakpoint
CREATE INDEX `payment_createdAt_idx` ON `payment` (`created_at`);--> statement-breakpoint
CREATE INDEX `payment_status_idx` ON `payment` (`status`);--> statement-breakpoint
CREATE INDEX `payment_userId_idx` ON `payment` (`user_id`);--> statement-breakpoint
CREATE UNIQUE INDEX `payment_bookingId_key` ON `payment` (`booking_id`);--> statement-breakpoint
CREATE UNIQUE INDEX `payment_transactionId_key` ON `payment` (`transaction_id`);--> statement-breakpoint
CREATE TABLE `course` (
	`id` text PRIMARY KEY NOT NULL,
	`slug` text NOT NULL,
	`name` text NOT NULL,
	`description` text NOT NULL,
	`long_description` text,
	`location` text NOT NULL,
	`price` integer NOT NULL,
	`duration` integer NOT NULL,
	`difficulty` text DEFAULT 'MODERATE' NOT NULL,
	`image_url` text,
	`thumbnail_url` text,
	`tags` text DEFAULT '[]' NOT NULL,
	`curriculum` text NOT NULL,
	`inclusions` text DEFAULT '[]' NOT NULL,
	`exclusions` text DEFAULT '[]' NOT NULL,
	`requirements` text DEFAULT '[]' NOT NULL,
	`instructor` text,
	`created_at` integer DEFAULT (unixepoch() * 1000) NOT NULL,
	`updated_at` integer DEFAULT (unixepoch() * 1000) NOT NULL
);
--> statement-breakpoint
CREATE INDEX `course_difficulty_idx` ON `course` (`difficulty`);--> statement-breakpoint
CREATE INDEX `course_location_idx` ON `course` (`location`);--> statement-breakpoint
CREATE INDEX `course_slug_idx` ON `course` (`slug`);--> statement-breakpoint
CREATE UNIQUE INDEX `course_slug_key` ON `course` (`slug`);--> statement-breakpoint
CREATE TABLE `course_session` (
	`id` text PRIMARY KEY NOT NULL,
	`course_id` text NOT NULL,
	`start_date` integer NOT NULL,
	`end_date` integer NOT NULL,
	`seats_available` integer NOT NULL,
	`total_seats` integer NOT NULL,
	`price_per_person` integer NOT NULL,
	`is_cancelled` integer DEFAULT false NOT NULL,
	`cancellation_reason` text,
	`created_at` integer DEFAULT (unixepoch() * 1000) NOT NULL,
	`updated_at` integer DEFAULT (unixepoch() * 1000) NOT NULL,
	FOREIGN KEY (`course_id`) REFERENCES `course`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE INDEX `courseSession_courseId_idx` ON `course_session` (`course_id`);--> statement-breakpoint
CREATE INDEX `courseSession_startDate_idx` ON `course_session` (`start_date`);--> statement-breakpoint
CREATE UNIQUE INDEX `courseSession_courseId_startDate_key` ON `course_session` (`course_id`,`start_date`);--> statement-breakpoint
CREATE TABLE `departure` (
	`id` text PRIMARY KEY NOT NULL,
	`trek_id` text NOT NULL,
	`start_date` integer NOT NULL,
	`end_date` integer NOT NULL,
	`seats_available` integer NOT NULL,
	`total_seats` integer NOT NULL,
	`price_per_person` integer NOT NULL,
	`is_cancelled` integer DEFAULT false NOT NULL,
	`cancellation_reason` text,
	`max_waitlist` integer DEFAULT 5 NOT NULL,
	`status` text DEFAULT 'OPEN' NOT NULL,
	`trek_leader_id` text,
	`trek_leader_name` text,
	`waitlist_count` integer DEFAULT 0 NOT NULL,
	`created_at` integer DEFAULT (unixepoch() * 1000) NOT NULL,
	`updated_at` integer DEFAULT (unixepoch() * 1000) NOT NULL,
	FOREIGN KEY (`trek_id`) REFERENCES `trek`(`id`) ON UPDATE no action ON DELETE cascade,
	FOREIGN KEY (`trek_leader_id`) REFERENCES `user`(`id`) ON UPDATE no action ON DELETE set null
);
--> statement-breakpoint
CREATE INDEX `departure_isCancelled_idx` ON `departure` (`is_cancelled`);--> statement-breakpoint
CREATE INDEX `departure_startDate_idx` ON `departure` (`start_date`);--> statement-breakpoint
CREATE INDEX `departure_status_idx` ON `departure` (`status`);--> statement-breakpoint
CREATE INDEX `departure_trekId_idx` ON `departure` (`trek_id`);--> statement-breakpoint
CREATE UNIQUE INDEX `departure_trekId_startDate_key` ON `departure` (`trek_id`,`start_date`);--> statement-breakpoint
CREATE TABLE `expedition` (
	`id` text PRIMARY KEY NOT NULL,
	`slug` text NOT NULL,
	`name` text NOT NULL,
	`description` text NOT NULL,
	`long_description` text,
	`state` text NOT NULL,
	`base_price` integer NOT NULL,
	`difficulty` text DEFAULT 'MODERATE' NOT NULL,
	`duration` integer NOT NULL,
	`max_altitude` integer,
	`distance` real,
	`best_season` text,
	`image_url` text,
	`thumbnail_url` text,
	`tags` text DEFAULT '[]' NOT NULL,
	`itinerary` text NOT NULL,
	`inclusions` text DEFAULT '[]' NOT NULL,
	`exclusions` text DEFAULT '[]' NOT NULL,
	`requirements` text DEFAULT '[]' NOT NULL,
	`created_at` integer DEFAULT (unixepoch() * 1000) NOT NULL,
	`updated_at` integer DEFAULT (unixepoch() * 1000) NOT NULL
);
--> statement-breakpoint
CREATE INDEX `expedition_difficulty_idx` ON `expedition` (`difficulty`);--> statement-breakpoint
CREATE INDEX `expedition_slug_idx` ON `expedition` (`slug`);--> statement-breakpoint
CREATE UNIQUE INDEX `expedition_slug_key` ON `expedition` (`slug`);--> statement-breakpoint
CREATE INDEX `expedition_state_idx` ON `expedition` (`state`);--> statement-breakpoint
CREATE TABLE `expedition_session` (
	`id` text PRIMARY KEY NOT NULL,
	`expedition_id` text NOT NULL,
	`start_date` integer NOT NULL,
	`end_date` integer NOT NULL,
	`seats_available` integer NOT NULL,
	`total_seats` integer NOT NULL,
	`price_per_person` integer NOT NULL,
	`is_cancelled` integer DEFAULT false NOT NULL,
	`cancellation_reason` text,
	`created_at` integer DEFAULT (unixepoch() * 1000) NOT NULL,
	`updated_at` integer DEFAULT (unixepoch() * 1000) NOT NULL,
	FOREIGN KEY (`expedition_id`) REFERENCES `expedition`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE INDEX `expeditionSession_expeditionId_idx` ON `expedition_session` (`expedition_id`);--> statement-breakpoint
CREATE INDEX `expeditionSession_startDate_idx` ON `expedition_session` (`start_date`);--> statement-breakpoint
CREATE UNIQUE INDEX `expeditionSession_expeditionId_startDate_key` ON `expedition_session` (`expedition_id`,`start_date`);--> statement-breakpoint
CREATE TABLE `faq` (
	`id` text PRIMARY KEY NOT NULL,
	`question` text NOT NULL,
	`answer` text NOT NULL,
	`category` text,
	`order` integer DEFAULT 0 NOT NULL,
	`created_at` integer DEFAULT (unixepoch() * 1000) NOT NULL,
	`updated_at` integer DEFAULT (unixepoch() * 1000) NOT NULL
);
--> statement-breakpoint
CREATE INDEX `faq_category_idx` ON `faq` (`category`);--> statement-breakpoint
CREATE INDEX `faq_order_idx` ON `faq` (`order`);--> statement-breakpoint
CREATE TABLE `trek` (
	`id` text PRIMARY KEY NOT NULL,
	`slug` text NOT NULL,
	`name` text NOT NULL,
	`description` text NOT NULL,
	`long_description` text,
	`state` text NOT NULL,
	`base_price` integer NOT NULL,
	`difficulty` text DEFAULT 'MODERATE' NOT NULL,
	`duration` integer NOT NULL,
	`max_altitude` integer,
	`distance` real,
	`best_season` text,
	`image_url` text,
	`thumbnail_url` text,
	`tags` text DEFAULT '[]' NOT NULL,
	`itinerary` text NOT NULL,
	`inclusions` text DEFAULT '[]' NOT NULL,
	`exclusions` text DEFAULT '[]' NOT NULL,
	`requirements` text DEFAULT '[]' NOT NULL,
	`about_text` text,
	`accommodation_type` text,
	`best_for` text,
	`best_time_json` text,
	`content_generated_at` integer,
	`content_sources` text DEFAULT '[]' NOT NULL,
	`content_verified` integer DEFAULT false NOT NULL,
	`difficulty_details` text,
	`dropoff_time` text,
	`faqs_json` text,
	`gear_checklist` text,
	`getting_there` text,
	`itinerary_json` text,
	`permits` text,
	`pickup_time` text,
	`schema_markup` text,
	`seo_description` text,
	`seo_keywords` text DEFAULT '[]' NOT NULL,
	`seo_title` text,
	`tagline` text,
	`created_at` integer DEFAULT (unixepoch() * 1000) NOT NULL,
	`updated_at` integer DEFAULT (unixepoch() * 1000) NOT NULL
);
--> statement-breakpoint
CREATE INDEX `trek_contentVerified_idx` ON `trek` (`content_verified`);--> statement-breakpoint
CREATE INDEX `trek_difficulty_idx` ON `trek` (`difficulty`);--> statement-breakpoint
CREATE INDEX `trek_state_idx` ON `trek` (`state`);--> statement-breakpoint
CREATE INDEX `trek_slug_idx` ON `trek` (`slug`);--> statement-breakpoint
CREATE UNIQUE INDEX `trek_slug_key` ON `trek` (`slug`);--> statement-breakpoint
CREATE TABLE `trek_review` (
	`id` text PRIMARY KEY NOT NULL,
	`trek_id` text NOT NULL,
	`user_id` text,
	`rating` integer NOT NULL,
	`title` text NOT NULL,
	`content` text NOT NULL,
	`created_at` integer DEFAULT (unixepoch() * 1000) NOT NULL,
	`updated_at` integer DEFAULT (unixepoch() * 1000) NOT NULL,
	FOREIGN KEY (`trek_id`) REFERENCES `trek`(`id`) ON UPDATE no action ON DELETE cascade,
	FOREIGN KEY (`user_id`) REFERENCES `user`(`id`) ON UPDATE no action ON DELETE set null
);
--> statement-breakpoint
CREATE INDEX `trekReview_rating_idx` ON `trek_review` (`rating`);--> statement-breakpoint
CREATE INDEX `trekReview_trekId_idx` ON `trek_review` (`trek_id`);--> statement-breakpoint
CREATE TABLE `failed_login_attempt` (
	`id` text PRIMARY KEY NOT NULL,
	`user_id` text NOT NULL,
	`email` text NOT NULL,
	`ip_address` text,
	`user_agent` text,
	`created_at` integer DEFAULT (unixepoch() * 1000) NOT NULL,
	FOREIGN KEY (`user_id`) REFERENCES `user`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE INDEX `failedLoginAttempt_createdAt_idx` ON `failed_login_attempt` (`created_at`);--> statement-breakpoint
CREATE INDEX `failedLoginAttempt_email_idx` ON `failed_login_attempt` (`email`);--> statement-breakpoint
CREATE INDEX `failedLoginAttempt_ipAddress_idx` ON `failed_login_attempt` (`ip_address`);--> statement-breakpoint
CREATE INDEX `failedLoginAttempt_userId_idx` ON `failed_login_attempt` (`user_id`);--> statement-breakpoint
CREATE TABLE `ip_restriction` (
	`id` text PRIMARY KEY NOT NULL,
	`ip_address` text NOT NULL,
	`is_allowed` integer DEFAULT true NOT NULL,
	`reason` text,
	`created_at` integer DEFAULT (unixepoch() * 1000) NOT NULL,
	`updated_at` integer DEFAULT (unixepoch() * 1000) NOT NULL
);
--> statement-breakpoint
CREATE INDEX `ipRestriction_ipAddress_idx` ON `ip_restriction` (`ip_address`);--> statement-breakpoint
CREATE INDEX `ipRestriction_isAllowed_idx` ON `ip_restriction` (`is_allowed`);--> statement-breakpoint
CREATE UNIQUE INDEX `ipRestriction_ipAddress_key` ON `ip_restriction` (`ip_address`);--> statement-breakpoint
CREATE TABLE `marketing_metric` (
	`id` text PRIMARY KEY NOT NULL,
	`date` integer DEFAULT (unixepoch() * 1000) NOT NULL,
	`website_visitors` integer DEFAULT 0 NOT NULL,
	`website_page_views` integer DEFAULT 0 NOT NULL,
	`conversion_rate` real DEFAULT 0 NOT NULL,
	`instagram_clicks` integer DEFAULT 0 NOT NULL,
	`instagram_impressions` integer DEFAULT 0 NOT NULL,
	`total_bookings` integer DEFAULT 0 NOT NULL,
	`referral_bookings` integer DEFAULT 0 NOT NULL,
	`repeat_customer_bookings` integer DEFAULT 0 NOT NULL,
	`top_treks` text,
	`created_at` integer DEFAULT (unixepoch() * 1000) NOT NULL,
	`updated_at` integer DEFAULT (unixepoch() * 1000) NOT NULL
);
--> statement-breakpoint
CREATE INDEX `marketingMetric_date_idx` ON `marketing_metric` (`date`);--> statement-breakpoint
CREATE TABLE `trek_leader_payout` (
	`id` text PRIMARY KEY NOT NULL,
	`trek_leader_id` text NOT NULL,
	`departure_id` text NOT NULL,
	`amount` integer NOT NULL,
	`status` text DEFAULT 'PENDING' NOT NULL,
	`payment_method` text,
	`transaction_id` text,
	`paid_at` integer,
	`notes` text,
	`created_at` integer DEFAULT (unixepoch() * 1000) NOT NULL,
	`updated_at` integer DEFAULT (unixepoch() * 1000) NOT NULL,
	FOREIGN KEY (`trek_leader_id`) REFERENCES `user`(`id`) ON UPDATE no action ON DELETE restrict,
	FOREIGN KEY (`departure_id`) REFERENCES `departure`(`id`) ON UPDATE no action ON DELETE restrict
);
--> statement-breakpoint
CREATE INDEX `trekLeaderPayout_status_idx` ON `trek_leader_payout` (`status`);--> statement-breakpoint
CREATE INDEX `trekLeaderPayout_trekLeaderId_idx` ON `trek_leader_payout` (`trek_leader_id`);--> statement-breakpoint
CREATE TABLE `admin_permission` (
	`id` text PRIMARY KEY NOT NULL,
	`permission` text NOT NULL,
	`category` text NOT NULL,
	`description` text,
	`created_at` integer DEFAULT (unixepoch() * 1000) NOT NULL,
	`updated_at` integer DEFAULT (unixepoch() * 1000) NOT NULL
);
--> statement-breakpoint
CREATE INDEX `adminPermission_category_idx` ON `admin_permission` (`category`);--> statement-breakpoint
CREATE UNIQUE INDEX `adminPermission_permission_key` ON `admin_permission` (`permission`);--> statement-breakpoint
CREATE TABLE `audit_log` (
	`id` text PRIMARY KEY NOT NULL,
	`action` text NOT NULL,
	`entity_type` text NOT NULL,
	`entity_id` text NOT NULL,
	`user_id` text,
	`changes` text,
	`metadata` text,
	`description` text,
	`created_at` integer DEFAULT (unixepoch() * 1000) NOT NULL,
	FOREIGN KEY (`user_id`) REFERENCES `user`(`id`) ON UPDATE no action ON DELETE set null
);
--> statement-breakpoint
CREATE INDEX `auditLog_action_idx` ON `audit_log` (`action`);--> statement-breakpoint
CREATE INDEX `auditLog_createdAt_idx` ON `audit_log` (`created_at`);--> statement-breakpoint
CREATE INDEX `auditLog_entityId_idx` ON `audit_log` (`entity_id`);--> statement-breakpoint
CREATE INDEX `auditLog_entityType_idx` ON `audit_log` (`entity_type`);--> statement-breakpoint
CREATE INDEX `auditLog_userId_idx` ON `audit_log` (`user_id`);--> statement-breakpoint
CREATE TABLE `role_permission` (
	`id` text PRIMARY KEY NOT NULL,
	`permission_id` text NOT NULL,
	`role` text NOT NULL,
	`is_enabled` integer DEFAULT true NOT NULL,
	`created_at` integer DEFAULT (unixepoch() * 1000) NOT NULL,
	`updated_at` integer DEFAULT (unixepoch() * 1000) NOT NULL,
	FOREIGN KEY (`permission_id`) REFERENCES `admin_permission`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE UNIQUE INDEX `rolePermission_permissionId_role_key` ON `role_permission` (`permission_id`,`role`);