# Next.js to TanStack Start Migration Inventory

This document is the Phase 1 execution artifact for migrating `my-app-nextapp` into `trail-makers-tanstack-start`.

It captures the current source surface area, maps each responsibility to its target package or app in the TanStack monorepo, and defines the first-pass batching strategy. This is the working baseline for the migration and should be updated as execution progresses.

## Scope Summary

- Source app pages: 49
- Source app API routes: 32
- Source app shared components: 24 app-level components under `src/components`
- Source service modules: 6 under `src/lib/services`
- Source layouts: 2 (`src/app/layout.tsx`, `src/app/booking/layout.tsx`)
- Source route boundaries: 5 `loading.tsx`, 4 `error.tsx`, 1 `global-error.tsx`, 1 `sitemap.tsx`
- Target monorepo apps: `apps/web`, `apps/server`
- Target monorepo packages: `api`, `auth`, `config`, `db`, `env`, `infra`, `ui`

## Ownership Map

### `apps/web`

Owns TanStack Start route files, route loaders, page composition, route-level head metadata, error and not-found presentation, client-only interaction islands, and application-specific UI that should not be shared outside the web app.

Target responsibilities:

- Root document shell and providers
- Public routes and authenticated routes
- Route loaders and query prefetching
- App-specific components migrated from the Next app
- Navigation, redirects, and route cleanup handling
- Script loading replacements for Next client features such as Razorpay checkout

### `apps/server`

Owns the Hono entrypoint and runtime integration surface.

Target responsibilities:

- Hono app composition
- Auth handler mounting
- oRPC transport exposure
- CORS and security-header integration
- Runtime-only endpoints that should not live in the web app
- Sitemap or redirect handler support only if implemented at the server edge layer instead of TanStack routes

### `packages/api`

Owns the domain API surface and authorization-aware server procedures.

Target responsibilities:

- Domain router composition
- Procedure definitions and Zod validation
- Authenticated and role-aware procedures
- Domain-level middleware and shared context use
- Reusable query and mutation boundaries for the web app

Planned router families:

- `treks`
- `expeditions`
- `courses`
- `faqs`
- `bookings`
- `payments`
- `profile` or `users`
- `admin`
- `departures`
- `search` if kept as server-backed search

### `packages/auth`

Owns Better Auth configuration and auth lifecycle behavior.

Target responsibilities:

- Better Auth instance
- Session cookie configuration for Workers
- Sign-up and sign-in lifecycle hooks
- Account lock, deny, and account-state logic
- Password reset and verification behavior
- Shared auth helpers consumed by `packages/api` and `apps/server`

### `packages/db`

Owns the translated SQLite or D1 schema and database access boundary.

Target responsibilities:

- Modular Drizzle schema files
- Relations and indexes
- Shared db client
- Schema exports for auth and domain entities
- Migration generation and push

Expected domain modules after translation:

- `schema/auth.ts`
- `schema/users.ts`
- `schema/treks.ts`
- `schema/expeditions.ts`
- `schema/courses.ts`
- `schema/bookings.ts`
- `schema/payments.ts`
- `schema/admin.ts`
- `schema/audit.ts`

### `packages/ui`

Owns reusable low-level UI primitives.

Target responsibilities:

- Shared shadcn-style primitives
- Shared styling tokens
- Generic controls reused by multiple web routes

Do not move domain-specific page blocks here unless they become truly reusable across features.

## Target Snapshot Before Migration

Current target coverage is intentionally thin.

- `apps/web/src/routes` already contains: `index`, `login`, `signup`, `contact`, `faq`, `dashboard`, `treks`, `expeditions`, `courses`, `lessons`, and `_auth`
- `apps/web/src/components` currently contains only `loader`, `sign-in-form`, `sign-up-form`, and `user-menu`
- `packages/api/src/routers/index.ts` currently exposes only `healthCheck` and `privateData`
- `packages/auth/src/index.ts` contains a minimal Better Auth setup for SQLite
- `packages/db/src/schema/auth.ts` contains only the baseline auth tables

This means the migration is not a route-by-route port into an already equivalent app. It is a domain build-out on top of a working platform skeleton.

## Source Route Inventory

### Public marketing and narrative pages

These should land in `apps/web/src/routes` as mostly static or loader-backed TanStack routes.

- `/` from `src/app/page.tsx`
- `/company/about-us` from `src/app/company/about-us/page.tsx`
- `/company/careers` from `src/app/company/careers/page.tsx`
- `/contact` from `src/app/contact/page.tsx`
- `/faq` from `src/app/faq/page.tsx`
- `/blog` from `src/app/blog/page.tsx`
- `/blog/Understanding-The-Layering-System` from `src/app/blog/Understanding-The-Layering-System/page.tsx`
- `/blog/10-Best-Treks-in-Himachal-Pradesh` from `src/app/blog/10-Best-Treks-in-Himachal-Pradesh/page.tsx`
- `/blog/The-Only-Difference-Between-Trekking-And-Hiking` from `src/app/blog/The-Only-Difference-Between-Trekking-And-Hiking/page.tsx`
- `/blog/Why-I-would-do-Sandakphu-Trek-atleast-once` from `src/app/blog/Why-I-would-do-Sandakphu-Trek-atleast-once/page.tsx`
- `/mission/universe` from `src/app/mission/universe/page.tsx`
- `/mission/living-beings` from `src/app/mission/living-beings/page.tsx`
- `/mission/people` from `src/app/mission/people/page.tsx`
- `/mission/next-10-years` from `src/app/mission/next-10-years/page.tsx`
- `/mission/next-100-years` from `src/app/mission/next-100-years/page.tsx`
- `/mission/planet` from `src/app/mission/planet/page.tsx`
- `/footer-pages/reviews` from `src/app/footer-pages/reviews/page.tsx`
- `/footer-pages/faq` from `src/app/footer-pages/faq/page.tsx`
- `/footer-pages/news-room` from `src/app/footer-pages/news-room/page.tsx`
- `/footer-pages/get-in-touch` from `src/app/footer-pages/get-in-touch/page.tsx`
- `/trekking-guides` from `src/app/trekking-guides/page.tsx`

### Catalog and content pages with data-loading

These belong in `apps/web/src/routes` with loaders backed by `packages/api`.

- `/all` from `src/app/all/page.tsx`
- `/treks/$slug` from `src/app/treks/[slug]/page.tsx`
- `/expeditions` from `src/app/expeditions/page.tsx`
- `/expeditions/$slug` from `src/app/expeditions/[slug]/page.tsx`
- `/courses` from `src/app/courses/page.tsx`
- `/courses/$slug` from `src/app/courses/[slug]/page.tsx`
- `/lessons` from `src/app/lessons/page.tsx`
- `/search` from `src/app/search/page.tsx`

### Auth and account-state pages

These belong in `apps/web/src/routes`, backed by `packages/auth` and `packages/api`.

- `/login` from `src/app/login/page.tsx`
- `/signup` from `src/app/signup/page.tsx`
- `/forgot-password` from `src/app/forgot-password/page.tsx`
- `/reset-password` from `src/app/reset-password/page.tsx`
- `/access-denied` from `src/app/access-denied/page.tsx`
- `/account-locked` from `src/app/account-locked/page.tsx`
- `/account-deactivated` from `src/app/account-deactivated/page.tsx`

### Authenticated user pages

These belong in `apps/web/src/routes`, with protected route behavior plus server-side permission enforcement.

- `/dashboard` from `src/app/dashboard/page.tsx`
- `/profile` from `src/app/profile/page.tsx`
- `/booking/summary` from `src/app/booking/summary/page.tsx`
- `/booking/payment` from `src/app/booking/payment/page.tsx`
- `/booking/confirmation` from `src/app/booking/confirmation/page.tsx`
- `/booking/failure` from `src/app/booking/failure/page.tsx`
- `/booking/my-bookings` from `src/app/booking/my-bookings/page.tsx`
- `/booking/submit-feedback` from `src/app/booking/submit-feedback/page.tsx`
- `/booking/safety-standards` from `src/app/booking/safety-standards/page.tsx`
- `/booking/cancellation-policy` from `src/app/booking/cancellation-policy/page.tsx`

### Admin pages

These belong in `apps/web/src/routes`, but should be migrated after RBAC procedures and account-state checks are stable.

- `/admin` from `src/app/admin/page.tsx`
- `/admin/dashboard` from `src/app/admin/dashboard/page.tsx`

### Non-core or optional carry-over pages

These should not block core migration.

- `/sentry-example-page` from `src/app/sentry-example-page/page.tsx` should be excluded from V1 because Sentry is out of scope.

## Source API Inventory

All API behavior should be re-expressed through domain routers in `packages/api`, surfaced via `apps/server`, and consumed through oRPC from `apps/web`.

### Public content and catalog APIs

- `src/app/api/treks/route.ts`
- `src/app/api/expeditions/route.ts`
- `src/app/api/expeditions/[slug]/route.ts`
- `src/app/api/courses/route.ts`
- `src/app/api/courses/[slug]/route.ts`
- `src/app/api/faqs/route.ts`
- `src/app/api/departures/[id]/availability/route.ts`

Suggested target ownership:

- `packages/api/src/routers/treks.ts`
- `packages/api/src/routers/expeditions.ts`
- `packages/api/src/routers/courses.ts`
- `packages/api/src/routers/faqs.ts`
- `packages/api/src/routers/departures.ts`

### Auth and session APIs

- `src/app/api/auth/[...all]/route.ts`

Suggested target ownership:

- `packages/auth`
- `apps/server/src/index.ts`

### User and profile APIs

- `src/app/api/user/profile/route.ts`
- `src/app/api/user/bookings/route.ts`

Suggested target ownership:

- `packages/api/src/routers/profile.ts`
- `packages/api/src/routers/bookings.ts`

### Booking and payment APIs

- `src/app/api/bookings/route.ts`
- `src/app/api/bookings/[id]/route.ts`
- `src/app/api/bookings/[id]/get/route.ts`
- `src/app/api/payments/razorpay/route.ts`
- `src/app/api/payments/verify/route.ts`

Suggested target ownership:

- `packages/api/src/routers/bookings.ts`
- `packages/api/src/routers/payments.ts`

### Admin and moderator APIs

- `src/app/api/admin/dashboard/route.ts`
- `src/app/api/admin/permissions/route.ts`
- `src/app/api/admin/users/route.ts`
- `src/app/api/admin/users/[userId]/route.ts`
- `src/app/api/admin/users/[userId]/unlock/route.ts`
- `src/app/api/admin/users/[userId]/deny/route.ts`
- `src/app/api/admin/users/[userId]/reset/route.ts`
- `src/app/api/admin/departures/route.ts`
- `src/app/api/admin/treks/route.ts`
- `src/app/api/admin/participants/route.ts`
- `src/app/api/admin/reviews/route.ts`
- `src/app/api/admin/login-attempts/route.ts`
- `src/app/api/admin/finance/route.ts`
- `src/app/api/admin/marketing/route.ts`
- `src/app/api/admin/audit-logs/route.ts`

Suggested target ownership:

- `packages/api/src/routers/admin/index.ts`
- Domain subrouters under `packages/api/src/routers/admin/`

### Out-of-scope or deferred APIs

- `src/app/api/sentry-example-api/route.ts` is excluded from V1
- `src/app/api/test-email/route.ts` should be treated as a diagnostic or support endpoint, not a core migration target

## Source Cross-Cutting Files

### Root and route-structure files

- `src/app/layout.tsx` -> `apps/web/src/routes/__root.tsx`
- `src/app/booking/layout.tsx` -> likely unnecessary as a dedicated layout unless booking pages need a shared TanStack route wrapper
- `src/app/sitemap.tsx` -> route-level sitemap implementation in `apps/web` or edge-level handler in `apps/server`
- `src/app/global-error.tsx` -> root error handling in TanStack Start route tree

### Loading and error boundaries

These should be converted into TanStack pending, error, or route-component patterns.

- `src/app/all/loading.tsx`
- `src/app/all/error.tsx`
- `src/app/courses/loading.tsx`
- `src/app/courses/error.tsx`
- `src/app/expeditions/loading.tsx`
- `src/app/expeditions/error.tsx`
- `src/app/faq/loading.tsx`
- `src/app/faq/error.tsx`
- `src/app/lessons/loading.tsx`

### Next-specific platform files to replace

- `src/proxy.ts` -> route guards in `apps/web` plus authorization in `packages/api`
- `src/lib/auth-session.ts` -> request-context session helpers in `packages/api` and `packages/auth`
- `next.config.mjs` -> redirects, remote image policy, and security headers split across web and server concerns
- `src/instrumentation.ts`, `src/instrumentation-client.ts`, `sentry.*.config.ts` -> excluded from V1

## Source Shared Component Inventory

### Likely app-specific components for `apps/web/src/components`

- `heroCarousel.tsx`
- `navbar.tsx`
- `navbar-client.tsx`
- `navbar-links.tsx`
- `footer.tsx`
- `theme-provider.tsx`
- `theme-toggle.tsx`
- `auth-page-shell.tsx`
- `homecards.tsx`
- `scrollables.tsx`
- `calendar.tsx`
- `knowBeforeYouGo.tsx`
- `article.tsx`
- `whatSetUsApart.tsx`
- `narrativePage.tsx`
- `trekByRegionClient.tsx`
- `joinDate.tsx`
- `allTreksClient.tsx`
- `bookingDetailsModal.tsx`
- `itineraryMap.tsx`
- `google-button.tsx`

### Components that may become shared utilities or wrappers

- `accordion.tsx`
- `imageWithFallback.tsx`
- `galleryImage.tsx`

Default rule: move components into `apps/web` first, then promote only genuinely reusable primitives into `packages/ui` after migration pressure proves they should be shared.

## Source Service and Utility Inventory

### Service modules to port before pages

These should move into shared domain modules used by `packages/api`.

- `src/lib/services/trekService.ts`
- `src/lib/services/expeditionService.ts`
- `src/lib/services/courseService.ts`
- `src/lib/services/bookingService.ts`
- `src/lib/services/paymentService.ts`
- `src/lib/services/adminDashboardService.ts`

### Auth and role utilities

These should be evaluated for `packages/auth` or `packages/api` ownership.

- `src/lib/auth.ts`
- `src/lib/auth-client.ts`
- `src/lib/auth-password.ts`
- `src/lib/auth-session.ts`
- `src/lib/apiAuth.ts`
- `src/lib/roleUtils.ts`
- `src/lib/user-role.ts`

### Shared validation and support utilities

These should be migrated into `packages/api` or a future shared package if they are domain-agnostic.

- `src/lib/validations.ts`
- `src/lib/errors.ts`
- `src/lib/utils.ts`
- `src/lib/databaseAvailability.ts`
- `src/lib/email.ts`

### Database layer source files

- `src/drizzle/schema.ts`
- `src/drizzle/relations.ts`
- `src/drizzle/db.ts`

## First-Pass Execution Order

This first pass should be executed in this order:

1. Translate and split the database schema into target modules under `packages/db`
2. Extend `packages/auth` and `packages/api/context` to support the migrated auth and account-state model
3. Extract and port service-layer logic that can become the backend domain core
4. Replace the placeholder `packages/api` router with domain router modules and shared auth-aware procedures
5. Upgrade the `apps/web` shell to match the existing root layout and shared providers
6. Migrate public routes and route loaders
7. Migrate authenticated booking and payment routes
8. Migrate admin surfaces
9. Add SEO, redirects, and final route cleanup

## Immediate Gaps To Close In Phase 2 and Phase 3

- `packages/db` only contains auth tables and must be expanded into real domain schema modules
- `packages/api` is still a placeholder and has no domain router structure
- `apps/web` has only a starter shell and a minimal route set
- `apps/web/src/components` does not yet contain the current marketing, catalog, or booking UI building blocks
- `packages/auth` must absorb the current Better Auth lifecycle behavior from the Next app
- No target-side redirect map or metadata strategy exists yet

## Exclusions For V1

- Sentry example page and API route
- Sentry instrumentation setup
- Rate limiting migration
- Production coexistence, dual-write, or strict data compatibility work

## Completion Criteria For Phase 1

Phase 1 is complete when the following remain true:

- Every source route and support area has a target owner
- Every major domain has a provisional target router or package assignment
- The target repo contains a single migration inventory that later passes can update instead of rediscovering the app
- The next implementation pass can start schema translation and auth model expansion without reopening inventory questions
