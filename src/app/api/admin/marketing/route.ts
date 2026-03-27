import { NextResponse } from "next/server";
import { and, eq, gte, lt } from "drizzle-orm";
import db from "@/drizzle/db";
import { marketingMetric } from "@/drizzle/schema";
import { logAudit } from "@/lib/roleUtils";
import { requireApiRole } from "@/lib/apiAuth";
import {
  getAdminMarketingSummary,
  parseAdminMarketingPeriod,
} from "@/lib/services/adminDashboardService";

// GET /api/admin/marketing - Get marketing metrics
export async function GET(request: Request) {
  const { response } = await requireApiRole("MODERATOR");

  if (response) {
    return response;
  }

  try {
    const { searchParams } = new URL(request.url);
    const data = await getAdminMarketingSummary(
      parseAdminMarketingPeriod(searchParams.get("period")),
    );

    return NextResponse.json({
      success: true,
      data,
    });
  } catch (error) {
    console.error("Error fetching marketing data:", error);
    return NextResponse.json(
      { error: "Failed to fetch marketing data" },
      { status: 500 },
    );
  }
}

// POST /api/admin/marketing - Add/update marketing metrics
export async function POST(request: Request) {
  const { response, user: adminUser } = await requireApiRole("ADMIN");

  if (response || !adminUser) {
    return (
      response ?? NextResponse.json({ error: "Unauthorized" }, { status: 403 })
    );
  }

  try {
    const body = await request.json();
    const {
      date,
      websiteVisitors,
      websitePageViews,
      conversionRate,
      instagramClicks,
      instagramImpressions,
      totalBookings,
      referralBookings,
      repeatCustomerBookings,
      topTreks,
    } = body;

    const metricDate = date ? new Date(date) : new Date();
    const startOfDay = new Date(metricDate.setHours(0, 0, 0, 0));

    // Check if metric exists for this date
    const existingMetrics = await db
      .select()
      .from(marketingMetric)
      .where(
        and(
          gte(marketingMetric.date, startOfDay),
          lt(
            marketingMetric.date,
            new Date(startOfDay.getTime() + 24 * 60 * 60 * 1000),
          ),
        ),
      )
      .limit(1);
    const existing = existingMetrics[0];

    let metric;
    if (existing) {
      // Update existing
      const metrics = await db
        .update(marketingMetric)
        .set({
          websiteVisitors: websiteVisitors ?? existing.websiteVisitors,
          websitePageViews: websitePageViews ?? existing.websitePageViews,
          conversionRate: conversionRate ?? existing.conversionRate,
          instagramClicks: instagramClicks ?? existing.instagramClicks,
          instagramImpressions:
            instagramImpressions ?? existing.instagramImpressions,
          totalBookings: totalBookings ?? existing.totalBookings,
          referralBookings: referralBookings ?? existing.referralBookings,
          repeatCustomerBookings:
            repeatCustomerBookings ?? existing.repeatCustomerBookings,
          topTreks: topTreks ? JSON.stringify(topTreks) : existing.topTreks,
          updatedAt: new Date(),
        })
        .where(eq(marketingMetric.id, existing.id))
        .returning();
      metric = metrics[0];
    } else {
      // Create new
      const metrics = await db
        .insert(marketingMetric)
        .values({
          id: startOfDay.toISOString(),
          date: startOfDay,
          websiteVisitors: websiteVisitors ?? 0,
          websitePageViews: websitePageViews ?? 0,
          conversionRate: conversionRate ?? 0,
          instagramClicks: instagramClicks ?? 0,
          instagramImpressions: instagramImpressions ?? 0,
          totalBookings: totalBookings ?? 0,
          referralBookings: referralBookings ?? 0,
          repeatCustomerBookings: repeatCustomerBookings ?? 0,
          topTreks: topTreks ? JSON.stringify(topTreks) : null,
          updatedAt: new Date(),
        })
        .returning();
      metric = metrics[0];
    }

    await logAudit(
      "MARKETING_METRICS_UPDATED",
      "MARKETING_METRIC",
      metric.id,
      adminUser.id,
      { date: startOfDay },
    );

    return NextResponse.json({
      success: true,
      metric,
    });
  } catch (error) {
    console.error("Error saving marketing metrics:", error);
    return NextResponse.json(
      { error: "Failed to save marketing metrics" },
      { status: 500 },
    );
  }
}
