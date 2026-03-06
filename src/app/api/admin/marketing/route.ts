import { NextResponse } from 'next/server';
import { checkUserRole, logAudit } from '@/lib/roleUtils';
import { prisma } from '@/lib/prisma';

// GET /api/admin/marketing - Get marketing metrics
export async function GET(request: Request) {
  const { authorized } = await checkUserRole('MODERATOR');
  
  if (!authorized) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 403 });
  }

  try {
    const { searchParams } = new URL(request.url);
    const period = searchParams.get('period') || 'month';

    // Calculate date range
    const now = new Date();
    let startDate = new Date(0);
    
    if (period === 'week') {
      startDate = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
    } else if (period === 'month') {
      startDate = new Date(now.getFullYear(), now.getMonth(), 1);
    } else if (period === 'quarter') {
      const quarter = Math.floor(now.getMonth() / 3);
      startDate = new Date(now.getFullYear(), quarter * 3, 1);
    } else if (period === 'year') {
      startDate = new Date(now.getFullYear(), 0, 1);
    }

    // Get marketing metrics
    const metrics = await (prisma as any).marketingMetric.findMany({
      where: {
        date: { gte: startDate }
      },
      orderBy: { date: 'desc' }
    });

    // Aggregate metrics
    const aggregated = metrics.reduce((acc: any, m: any) => {
      acc.websiteVisitors += m.websiteVisitors;
      acc.websitePageViews += m.websitePageViews;
      acc.instagramClicks += m.instagramClicks;
      acc.instagramImpressions += m.instagramImpressions;
      acc.totalBookings += m.totalBookings;
      acc.referralBookings += m.referralBookings;
      acc.repeatCustomerBookings += m.repeatCustomerBookings;
      return acc;
    }, {
      websiteVisitors: 0,
      websitePageViews: 0,
      instagramClicks: 0,
      instagramImpressions: 0,
      totalBookings: 0,
      referralBookings: 0,
      repeatCustomerBookings: 0
    });

    // Calculate conversion rate
    const conversionRate = aggregated.websiteVisitors > 0 
      ? (aggregated.totalBookings / aggregated.websiteVisitors * 100).toFixed(2)
      : 0;

    // Calculate repeat customer %
    const repeatCustomerPercent = aggregated.totalBookings > 0
      ? (aggregated.repeatCustomerBookings / aggregated.totalBookings * 100).toFixed(2)
      : 0;

    // Get top performing treks
    const topTreks = await (prisma as any).booking.groupBy({
      by: ['departureId'],
      where: {
        createdAt: { gte: startDate },
        status: { in: ['CONFIRMED', 'COMPLETED'] }
      },
      _count: true,
      _sum: {
        totalAmount: true
      },
      orderBy: {
        _count: {
          id: 'desc'
        }
      },
      take: 10
    });

    // Get trek details for each
    const topTreksWithDetails = await Promise.all(
      topTreks.map(async (t: any) => {
        const departure = await (prisma as any).departure.findUnique({
          where: { id: t.departureId },
          include: {
            trek: {
              select: {
                name: true,
                slug: true
              }
            }
          }
        });
        return {
          trekId: t.departureId,
          trekName: departure?.trek?.name || 'Unknown',
          trekSlug: departure?.trek?.slug || 'unknown',
          bookingCount: t._count,
          revenue: t._sum.totalAmount || 0
        };
      })
    );

    return NextResponse.json({
      success: true,
      data: {
        websiteVisitors: aggregated.websiteVisitors,
        websitePageViews: aggregated.websitePageViews,
        conversionRate: parseFloat(conversionRate as string),
        instagramClicks: aggregated.instagramClicks,
        instagramImpressions: aggregated.instagramImpressions,
        totalBookings: aggregated.totalBookings,
        referralBookings: aggregated.referralBookings,
        repeatCustomerPercent: parseFloat(repeatCustomerPercent as string),
        topTreks: topTreksWithDetails,
        period
      }
    });
  } catch (error) {
    console.error('Error fetching marketing data:', error);
    return NextResponse.json(
      { error: 'Failed to fetch marketing data' },
      { status: 500 }
    );
  }
}

// POST /api/admin/marketing - Add/update marketing metrics
export async function POST(request: Request) {
  const { authorized, user: adminUser } = await checkUserRole('ADMIN');
  
  if (!authorized) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 403 });
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
      topTreks
    } = body;

    const metricDate = date ? new Date(date) : new Date();
    const startOfDay = new Date(metricDate.setHours(0, 0, 0, 0));

    // Check if metric exists for this date
    const existing = await (prisma as any).marketingMetric.findFirst({
      where: {
        date: {
          gte: startOfDay,
          lt: new Date(startOfDay.getTime() + 24 * 60 * 60 * 1000)
        }
      }
    });

    let metric;
    if (existing) {
      // Update existing
      metric = await (prisma as any).marketingMetric.update({
        where: { id: existing.id },
        data: {
          websiteVisitors: websiteVisitors || existing.websiteVisitors,
          websitePageViews: websitePageViews || existing.websitePageViews,
          conversionRate: conversionRate || existing.conversionRate,
          instagramClicks: instagramClicks || existing.instagramClicks,
          instagramImpressions: instagramImpressions || existing.instagramImpressions,
          totalBookings: totalBookings || existing.totalBookings,
          referralBookings: referralBookings || existing.referralBookings,
          repeatCustomerBookings: repeatCustomerBookings || existing.repeatCustomerBookings,
          topTreks: topTreks ? JSON.stringify(topTreks) : existing.topTreks
        }
      });
    } else {
      // Create new
      metric = await (prisma as any).marketingMetric.create({
        data: {
          date: startOfDay,
          websiteVisitors: websiteVisitors || 0,
          websitePageViews: websitePageViews || 0,
          conversionRate: conversionRate || 0,
          instagramClicks: instagramClicks || 0,
          instagramImpressions: instagramImpressions || 0,
          totalBookings: totalBookings || 0,
          referralBookings: referralBookings || 0,
          repeatCustomerBookings: repeatCustomerBookings || 0,
          topTreks: topTreks ? JSON.stringify(topTreks) : null
        }
      });
    }

    await logAudit(
      'MARKETING_METRICS_UPDATED',
      'MARKETING_METRIC',
      metric.id,
      adminUser.id,
      { date: startOfDay }
    );

    return NextResponse.json({
      success: true,
      metric
    });
  } catch (error) {
    console.error('Error saving marketing metrics:', error);
    return NextResponse.json(
      { error: 'Failed to save marketing metrics' },
      { status: 500 }
    );
  }
}
