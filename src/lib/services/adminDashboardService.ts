import {
  and,
  desc,
  eq,
  gte,
  ilike,
  inArray,
  isNotNull,
  isNull,
  lt,
  lte,
  ne,
  or,
  sql,
  type SQL,
} from "drizzle-orm";
import db from "@/drizzle/db";
import {
  booking as bookingTable,
  departure as departureTable,
  marketingMetric,
  payment as paymentTable,
  trek as trekTable,
  trekLeaderPayout,
  trekReview,
  userTable,
} from "@/drizzle/schema";

export type AdminFinancePeriod = "month" | "quarter" | "year" | "all";
export type AdminMarketingPeriod = "week" | "month" | "quarter" | "year";

export interface DashboardStats {
  totalBookingsThisMonth: number;
  revenueThisMonth: number;
  upcomingTreksNext30Days: number;
  occupancyRate: number;
  cancellationRate: number;
  refundPending: number;
}

export interface AdminFinanceSummary {
  totalRevenue: number;
  advanceCollected: number;
  balancePending: number;
  gstCollected: number;
  paymentMethodSplit: { method: string; amount: number; count: number }[];
  trekLeaderPayouts: {
    pending: number;
    paid: number;
    pendingCount: number;
    paidCount: number;
  };
}

export interface AdminParticipantsQuery {
  filter?: string | null;
  paymentStatus?: string | null;
  medicalStatus?: string | null;
  idVerified?: string | null;
  waiverSigned?: string | null;
  page?: number;
  limit?: number;
  search?: string | null;
}

export interface AdminTreksQuery {
  page?: number;
  limit?: number;
}

export interface AdminMarketingSummary {
  websiteVisitors: number;
  websitePageViews: number;
  conversionRate: number;
  instagramClicks: number;
  instagramImpressions: number;
  totalBookings: number;
  referralBookings: number;
  repeatCustomerPercent: number;
  topTreks: {
    trekId: string;
    trekName: string;
    trekSlug: string;
    bookingCount: number;
    revenue: number;
  }[];
  period: AdminMarketingPeriod;
}

type AggregatedMarketingMetrics = {
  websiteVisitors: number;
  websitePageViews: number;
  instagramClicks: number;
  instagramImpressions: number;
  totalBookings: number;
  referralBookings: number;
  repeatCustomerBookings: number;
};

function parsePositiveInteger(value: string | null, fallback: number) {
  const parsedValue = Number.parseInt(value || "", 10);

  return Number.isFinite(parsedValue) && parsedValue > 0
    ? parsedValue
    : fallback;
}

export function parseAdminFinancePeriod(
  value: string | null,
): AdminFinancePeriod {
  return value === "month" ||
    value === "quarter" ||
    value === "year" ||
    value === "all"
    ? value
    : "all";
}

export function parseAdminMarketingPeriod(
  value: string | null,
): AdminMarketingPeriod {
  return value === "week" ||
    value === "month" ||
    value === "quarter" ||
    value === "year"
    ? value
    : "month";
}

export function parseAdminPagination(
  pageValue: string | null,
  limitValue: string | null,
  defaultLimit: number,
) {
  return {
    page: parsePositiveInteger(pageValue, 1),
    limit: parsePositiveInteger(limitValue, defaultLimit),
  };
}

function getPeriodStartDate(period: AdminFinancePeriod): Date {
  const now = new Date();

  if (period === "month") {
    return new Date(now.getFullYear(), now.getMonth(), 1);
  }

  if (period === "quarter") {
    const quarter = Math.floor(now.getMonth() / 3);
    return new Date(now.getFullYear(), quarter * 3, 1);
  }

  if (period === "year") {
    return new Date(now.getFullYear(), 0, 1);
  }

  return new Date(0);
}

function getMarketingStartDate(period: AdminMarketingPeriod): Date {
  const now = new Date();

  if (period === "week") {
    return new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
  }

  return getPeriodStartDate(period);
}

function buildParticipantConditions(
  query: AdminParticipantsQuery,
  now: Date,
): SQL[] {
  const conditions: SQL[] = [];

  if (query.filter === "upcoming") {
    conditions.push(
      and(
        gte(departureTable.startDate, now),
        inArray(bookingTable.status, ["PENDING", "CONFIRMED"]),
      )!,
    );
  } else if (query.filter === "past") {
    conditions.push(
      and(
        lt(departureTable.endDate, now),
        eq(bookingTable.status, "COMPLETED"),
      )!,
    );
  } else if (query.filter === "repeat") {
    conditions.push(eq(bookingTable.isRepeatTrekker, true));
  }

  if (query.paymentStatus === "paid") {
    conditions.push(eq(paymentTable.status, "COMPLETED"));
  } else if (query.paymentStatus === "pending") {
    conditions.push(
      or(isNull(paymentTable.id), eq(paymentTable.status, "PENDING"))!,
    );
  }

  if (query.medicalStatus === "submitted") {
    conditions.push(eq(bookingTable.medicalFormSubmitted, true));
  } else if (query.medicalStatus === "pending") {
    conditions.push(eq(bookingTable.medicalFormSubmitted, false));
  }

  if (query.idVerified === "true") {
    conditions.push(eq(bookingTable.idVerified, true));
  } else if (query.idVerified === "false") {
    conditions.push(eq(bookingTable.idVerified, false));
  }

  if (query.waiverSigned === "true") {
    conditions.push(eq(bookingTable.waiverSigned, true));
  } else if (query.waiverSigned === "false") {
    conditions.push(eq(bookingTable.waiverSigned, false));
  }

  if (query.search) {
    const searchTerm = `%${query.search}%`;
    conditions.push(
      or(
        ilike(bookingTable.contactName, searchTerm),
        ilike(bookingTable.contactEmail, searchTerm),
        ilike(bookingTable.contactPhone, searchTerm),
        ilike(userTable.email, searchTerm),
      )!,
    );
  }

  return conditions;
}

export async function getAdminDashboardOverview(): Promise<DashboardStats> {
  const now = new Date();
  const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
  const endOfMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0);
  const next30Days = new Date(now.getTime() + 30 * 24 * 60 * 60 * 1000);

  const [
    thisMonthBookings,
    thisMonthRevenue,
    upcomingTreks,
    totalBookings,
    cancelledBookings,
    pendingRefunds,
    departures,
  ] = await Promise.all([
    db
      .select({ count: sql<number>`cast(count(*) as integer)` })
      .from(bookingTable)
      .where(
        and(
          gte(bookingTable.createdAt, startOfMonth),
          lte(bookingTable.createdAt, endOfMonth),
          ne(bookingTable.status, "CANCELLED"),
        ),
      ),
    db
      .select({
        amount: sql<number>`cast(coalesce(sum(${paymentTable.amount}), 0) as integer)`,
      })
      .from(paymentTable)
      .where(
        and(
          gte(paymentTable.createdAt, startOfMonth),
          lte(paymentTable.createdAt, endOfMonth),
          eq(paymentTable.status, "COMPLETED"),
        ),
      ),
    db
      .select({ count: sql<number>`cast(count(*) as integer)` })
      .from(departureTable)
      .where(
        and(
          gte(departureTable.startDate, now),
          lte(departureTable.startDate, next30Days),
          eq(departureTable.isCancelled, false),
        ),
      ),
    db
      .select({ count: sql<number>`cast(count(*) as integer)` })
      .from(bookingTable)
      .where(
        and(
          gte(bookingTable.createdAt, startOfMonth),
          lte(bookingTable.createdAt, endOfMonth),
        ),
      ),
    db
      .select({ count: sql<number>`cast(count(*) as integer)` })
      .from(bookingTable)
      .where(
        and(
          gte(bookingTable.createdAt, startOfMonth),
          lte(bookingTable.createdAt, endOfMonth),
          eq(bookingTable.status, "CANCELLED"),
        ),
      ),
    db
      .select({
        refundAmount: sql<number>`cast(coalesce(sum(${paymentTable.refundAmount}), 0) as integer)`,
      })
      .from(paymentTable)
      .where(
        and(
          eq(paymentTable.status, "REFUNDED"),
          isNotNull(paymentTable.refundedAt),
          gte(paymentTable.refundedAt, startOfMonth),
          lte(paymentTable.refundedAt, endOfMonth),
        ),
      ),
    db
      .select({
        totalSeats: departureTable.totalSeats,
        seatsAvailable: departureTable.seatsAvailable,
      })
      .from(departureTable)
      .where(
        and(
          gte(departureTable.startDate, now),
          eq(departureTable.isCancelled, false),
        ),
      ),
  ]);

  const totalSeats = departures.reduce(
    (sum, departure) => sum + departure.totalSeats,
    0,
  );
  const bookedSeats = departures.reduce(
    (sum, departure) => sum + (departure.totalSeats - departure.seatsAvailable),
    0,
  );

  return {
    totalBookingsThisMonth: thisMonthBookings[0]?.count ?? 0,
    revenueThisMonth: thisMonthRevenue[0]?.amount ?? 0,
    upcomingTreksNext30Days: upcomingTreks[0]?.count ?? 0,
    occupancyRate:
      totalSeats > 0 ? Math.round((bookedSeats / totalSeats) * 100) : 0,
    cancellationRate:
      (totalBookings[0]?.count ?? 0) > 0
        ? Math.round(
            ((cancelledBookings[0]?.count ?? 0) /
              (totalBookings[0]?.count ?? 0)) *
              100,
          )
        : 0,
    refundPending: pendingRefunds[0]?.refundAmount ?? 0,
  };
}

export async function getAdminFinanceSummary(
  period: AdminFinancePeriod = "all",
): Promise<AdminFinanceSummary> {
  const startDate = getPeriodStartDate(period);

  const [revenue, advance, balance, gst, paymentsByMethod, trekLeaderPayouts] =
    await Promise.all([
      db
        .select({
          amount: sql<number>`cast(coalesce(sum(${paymentTable.amount}), 0) as integer)`,
        })
        .from(paymentTable)
        .where(
          and(
            eq(paymentTable.status, "COMPLETED"),
            gte(paymentTable.createdAt, startDate),
          ),
        ),
      db
        .select({
          advanceAmount: sql<number>`cast(coalesce(sum(${paymentTable.advanceAmount}), 0) as integer)`,
        })
        .from(paymentTable)
        .where(
          and(
            eq(paymentTable.status, "COMPLETED"),
            isNotNull(paymentTable.advanceAmount),
            gte(paymentTable.createdAt, startDate),
          ),
        ),
      db
        .select({
          balanceAmount: sql<number>`cast(coalesce(sum(${paymentTable.balanceAmount}), 0) as integer)`,
        })
        .from(paymentTable)
        .where(
          and(
            inArray(paymentTable.status, ["PENDING", "COMPLETED"]),
            isNotNull(paymentTable.balanceAmount),
            gte(paymentTable.createdAt, startDate),
          ),
        ),
      db
        .select({
          gstAmount: sql<number>`cast(coalesce(sum(${paymentTable.gstAmount}), 0) as integer)`,
        })
        .from(paymentTable)
        .where(
          and(
            eq(paymentTable.status, "COMPLETED"),
            isNotNull(paymentTable.gstAmount),
            gte(paymentTable.createdAt, startDate),
          ),
        ),
      db
        .select({
          paymentMethod: paymentTable.paymentMethod,
          amount: sql<number>`cast(coalesce(sum(${paymentTable.amount}), 0) as integer)`,
          count: sql<number>`cast(count(*) as integer)`,
        })
        .from(paymentTable)
        .where(
          and(
            eq(paymentTable.status, "COMPLETED"),
            gte(paymentTable.createdAt, startDate),
          ),
        )
        .groupBy(paymentTable.paymentMethod),
      db
        .select({
          status: trekLeaderPayout.status,
          amount: sql<number>`cast(coalesce(sum(${trekLeaderPayout.amount}), 0) as integer)`,
          count: sql<number>`cast(count(*) as integer)`,
        })
        .from(trekLeaderPayout)
        .where(gte(trekLeaderPayout.createdAt, startDate))
        .groupBy(trekLeaderPayout.status),
    ]);

  const pendingPayouts = trekLeaderPayouts.find(
    (payout) => payout.status === "PENDING",
  );
  const paidPayouts = trekLeaderPayouts.find(
    (payout) => payout.status === "PAID",
  );

  return {
    totalRevenue: revenue[0]?.amount ?? 0,
    advanceCollected: advance[0]?.advanceAmount ?? 0,
    balancePending: balance[0]?.balanceAmount ?? 0,
    gstCollected: gst[0]?.gstAmount ?? 0,
    paymentMethodSplit: paymentsByMethod.map((payment) => ({
      method: payment.paymentMethod || "unknown",
      amount: payment.amount ?? 0,
      count: payment.count,
    })),
    trekLeaderPayouts: {
      pending: pendingPayouts?.amount || 0,
      paid: paidPayouts?.amount || 0,
      pendingCount: pendingPayouts?.count || 0,
      paidCount: paidPayouts?.count || 0,
    },
  };
}

export async function getAdminParticipants(query: AdminParticipantsQuery) {
  const page = query.page && query.page > 0 ? query.page : 1;
  const limit = Math.min(
    query.limit && query.limit > 0 ? query.limit : 20,
    100,
  );
  const now = new Date();
  const participantConditions = buildParticipantConditions(query, now);
  const participantWhere =
    participantConditions.length > 0
      ? and(...participantConditions)
      : undefined;

  const [participants, total, stats] = await Promise.all([
    db
      .select({
        booking: bookingTable,
        user: {
          id: userTable.id,
          email: userTable.email,
          firstName: userTable.firstName,
          lastName: userTable.lastName,
          phoneNumber: userTable.phoneNumber,
        },
        departure: departureTable,
        trek: {
          id: trekTable.id,
          name: trekTable.name,
          slug: trekTable.slug,
        },
        payment: {
          id: paymentTable.id,
          amount: paymentTable.amount,
          status: paymentTable.status,
          advanceAmount: paymentTable.advanceAmount,
          balanceAmount: paymentTable.balanceAmount,
          paymentMethod: paymentTable.paymentMethod,
          createdAt: paymentTable.createdAt,
        },
      })
      .from(bookingTable)
      .innerJoin(userTable, eq(bookingTable.userId, userTable.id))
      .innerJoin(
        departureTable,
        eq(bookingTable.departureId, departureTable.id),
      )
      .innerJoin(trekTable, eq(departureTable.trekId, trekTable.id))
      .leftJoin(paymentTable, eq(paymentTable.bookingId, bookingTable.id))
      .where(participantWhere)
      .orderBy(desc(bookingTable.createdAt))
      .limit(limit)
      .offset((page - 1) * limit),
    db
      .select({ count: sql<number>`cast(count(*) as integer)` })
      .from(bookingTable)
      .innerJoin(userTable, eq(bookingTable.userId, userTable.id))
      .innerJoin(
        departureTable,
        eq(bookingTable.departureId, departureTable.id),
      )
      .leftJoin(paymentTable, eq(paymentTable.bookingId, bookingTable.id))
      .where(participantWhere),
    db
      .select({
        status: bookingTable.status,
        count: sql<number>`cast(count(*) as integer)`,
      })
      .from(bookingTable)
      .innerJoin(
        departureTable,
        eq(bookingTable.departureId, departureTable.id),
      )
      .where(gte(departureTable.startDate, now))
      .groupBy(bookingTable.status),
  ]);

  return {
    participants: participants.map((participant) => ({
      ...participant.booking,
      user: participant.user,
      departure: {
        ...participant.departure,
        trek: participant.trek,
      },
      payment: participant.payment?.id ? participant.payment : null,
    })),
    stats: stats.map((stat) => ({
      status: stat.status,
      _count: {
        _all: stat.count,
      },
    })),
    pagination: {
      page,
      limit,
      total: total[0]?.count ?? 0,
      pages: Math.ceil((total[0]?.count ?? 0) / limit),
    },
  };
}

export async function getAdminTreks(query: AdminTreksQuery) {
  const page = query.page && query.page > 0 ? query.page : 1;
  const limit = Math.min(
    query.limit && query.limit > 0 ? query.limit : 20,
    100,
  );

  const [treks, totalRows] = await Promise.all([
    db
      .select()
      .from(trekTable)
      .orderBy(desc(trekTable.createdAt))
      .limit(limit)
      .offset((page - 1) * limit),
    db
      .select({ count: sql<number>`cast(count(*) as integer)` })
      .from(trekTable),
  ]);

  const trekIds = treks.map((trek) => trek.id);
  const [departures, reviewCounts] = await Promise.all([
    trekIds.length > 0
      ? db
          .select({
            departure: departureTable,
            user: {
              id: userTable.id,
              firstName: userTable.firstName,
              lastName: userTable.lastName,
            },
          })
          .from(departureTable)
          .leftJoin(userTable, eq(departureTable.trekLeaderId, userTable.id))
          .where(
            and(
              inArray(departureTable.trekId, trekIds),
              gte(departureTable.startDate, new Date()),
              eq(departureTable.isCancelled, false),
            ),
          )
      : Promise.resolve([]),
    trekIds.length > 0
      ? db
          .select({
            trekId: trekReview.trekId,
            count: sql<number>`cast(count(*) as integer)`,
          })
          .from(trekReview)
          .where(inArray(trekReview.trekId, trekIds))
          .groupBy(trekReview.trekId)
      : Promise.resolve([]),
  ]);

  const departuresByTrekId = departures.reduce<
    Map<
      string,
      Array<
        typeof departureTable.$inferSelect & {
          trekLeader: {
            id: string | null;
            firstName: string | null;
            lastName: string | null;
          } | null;
        }
      >
    >
  >((accumulator, row) => {
    const existing = accumulator.get(row.departure.trekId) ?? [];
    existing.push({
      ...row.departure,
      trekLeader: row.user?.id
        ? {
            id: row.user.id,
            firstName: row.user.firstName,
            lastName: row.user.lastName,
          }
        : null,
    });
    accumulator.set(row.departure.trekId, existing);
    return accumulator;
  }, new Map());

  const reviewCountByTrekId = new Map(
    reviewCounts.map((review) => [review.trekId, review.count]),
  );

  const normalizedTreks = treks.map((trek) => ({
    ...trek,
    departures: departuresByTrekId.get(trek.id) ?? [],
    _count: {
      reviews: reviewCountByTrekId.get(trek.id) ?? 0,
    },
  }));

  return {
    treks: normalizedTreks,
    pagination: {
      page,
      limit,
      total: totalRows[0]?.count ?? 0,
      pages: Math.ceil((totalRows[0]?.count ?? 0) / limit),
    },
  };
}

export async function getAdminMarketingSummary(
  period: AdminMarketingPeriod = "month",
): Promise<AdminMarketingSummary> {
  const startDate = getMarketingStartDate(period);

  const [metrics, topBookings] = await Promise.all([
    db
      .select()
      .from(marketingMetric)
      .where(gte(marketingMetric.date, startDate))
      .orderBy(desc(marketingMetric.date)),
    db
      .select({
        departureId: bookingTable.departureId,
        totalAmount: bookingTable.totalAmount,
      })
      .from(bookingTable)
      .where(
        and(
          gte(bookingTable.createdAt, startDate),
          inArray(bookingTable.status, ["CONFIRMED", "COMPLETED"]),
        ),
      ),
  ]);

  const aggregated = metrics.reduce<AggregatedMarketingMetrics>(
    (accumulator, metric) => {
      accumulator.websiteVisitors += metric.websiteVisitors;
      accumulator.websitePageViews += metric.websitePageViews;
      accumulator.instagramClicks += metric.instagramClicks;
      accumulator.instagramImpressions += metric.instagramImpressions;
      accumulator.totalBookings += metric.totalBookings;
      accumulator.referralBookings += metric.referralBookings;
      accumulator.repeatCustomerBookings += metric.repeatCustomerBookings;
      return accumulator;
    },
    {
      websiteVisitors: 0,
      websitePageViews: 0,
      instagramClicks: 0,
      instagramImpressions: 0,
      totalBookings: 0,
      referralBookings: 0,
      repeatCustomerBookings: 0,
    },
  );

  const topTrekMap = topBookings.reduce<
    Map<string, { bookingCount: number; revenue: number }>
  >((accumulator, booking) => {
    const existing = accumulator.get(booking.departureId) || {
      bookingCount: 0,
      revenue: 0,
    };

    existing.bookingCount += 1;
    existing.revenue += booking.totalAmount;
    accumulator.set(booking.departureId, existing);

    return accumulator;
  }, new Map());

  const topTreks = Array.from(topTrekMap.entries())
    .map(([departureId, value]) => ({ departureId, ...value }))
    .sort((left, right) => right.bookingCount - left.bookingCount)
    .slice(0, 10);

  const departureIds = topTreks.map((trek) => trek.departureId);
  const departureDetails =
    departureIds.length > 0
      ? await db
          .select({
            id: departureTable.id,
            trekName: trekTable.name,
            trekSlug: trekTable.slug,
          })
          .from(departureTable)
          .innerJoin(trekTable, eq(departureTable.trekId, trekTable.id))
          .where(inArray(departureTable.id, departureIds))
      : [];

  const departuresById = new Map(
    departureDetails.map((departure) => [departure.id, departure]),
  );

  return {
    websiteVisitors: aggregated.websiteVisitors,
    websitePageViews: aggregated.websitePageViews,
    conversionRate:
      aggregated.websiteVisitors > 0
        ? Number(
            (
              (aggregated.totalBookings / aggregated.websiteVisitors) *
              100
            ).toFixed(2),
          )
        : 0,
    instagramClicks: aggregated.instagramClicks,
    instagramImpressions: aggregated.instagramImpressions,
    totalBookings: aggregated.totalBookings,
    referralBookings: aggregated.referralBookings,
    repeatCustomerPercent:
      aggregated.totalBookings > 0
        ? Number(
            (
              (aggregated.repeatCustomerBookings / aggregated.totalBookings) *
              100
            ).toFixed(2),
          )
        : 0,
    topTreks: topTreks.map((trekSummary) => {
      const departure = departuresById.get(trekSummary.departureId);

      return {
        trekId: trekSummary.departureId,
        trekName: departure?.trekName || "Unknown",
        trekSlug: departure?.trekSlug || "unknown",
        bookingCount: trekSummary.bookingCount,
        revenue: trekSummary.revenue,
      };
    }),
    period,
  };
}
