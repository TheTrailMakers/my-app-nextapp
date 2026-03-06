import { NextResponse } from 'next/server';
import { checkUserRole } from '@/lib/roleUtils';
import { prisma } from '@/lib/prisma';

// GET /api/admin/dashboard/overview - Get dashboard overview stats
export async function GET(request: Request) {
  const { authorized, user } = await checkUserRole('MODERATOR');
  
  if (!authorized) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 403 });
  }

  try {
    const now = new Date();
    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
    const endOfMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0);
    
    // Next 30 days
    const next30Days = new Date(now.getTime() + 30 * 24 * 60 * 60 * 1000);

    // Get this month's bookings
    const thisMonthBookings = await (prisma as any).booking.count({
      where: {
        createdAt: {
          gte: startOfMonth,
          lte: endOfMonth
        },
        status: { not: 'CANCELLED' }
      }
    });

    // Get this month's revenue
    const thisMonthRevenue = await (prisma as any).payment.aggregate({
      where: {
        createdAt: {
          gte: startOfMonth,
          lte: endOfMonth
        },
        status: 'COMPLETED'
      },
      _sum: {
        amount: true
      }
    });

    // Get upcoming treks (next 30 days)
    const upcomingTreks = await (prisma as any).departure.count({
      where: {
        startDate: {
          gte: now,
          lte: next30Days
        },
        isCancelled: false
      }
    });

    // Get total seats and booked seats for occupancy rate
    const departures = await (prisma as any).departure.findMany({
      where: {
        startDate: {
          gte: now
        },
        isCancelled: false
      },
      select: {
        totalSeats: true,
        seatsAvailable: true
      }
    });

    const totalSeats = departures.reduce((sum: number, d: any) => sum + d.totalSeats, 0);
    const bookedSeats = departures.reduce((sum: number, d: any) => sum + (d.totalSeats - d.seatsAvailable), 0);
    const occupancyRate = totalSeats > 0 ? Math.round((bookedSeats / totalSeats) * 100) : 0;

    // Get cancellation rate
    const totalBookings = await (prisma as any).booking.count({
      where: {
        createdAt: {
          gte: startOfMonth,
          lte: endOfMonth
        }
      }
    });

    const cancelledBookings = await (prisma as any).booking.count({
      where: {
        createdAt: {
          gte: startOfMonth,
          lte: endOfMonth
        },
        status: 'CANCELLED'
      }
    });

    const cancellationRate = totalBookings > 0 ? Math.round((cancelledBookings / totalBookings) * 100) : 0;

    // Get pending refunds
    const pendingRefunds = await (prisma as any).payment.aggregate({
      where: {
        status: 'REFUNDED',
        refundedAt: {
          gte: startOfMonth,
          lte: endOfMonth
        }
      },
      _sum: {
        refundAmount: true
      }
    });

    return NextResponse.json({
      success: true,
      data: {
        totalBookingsThisMonth: thisMonthBookings,
        revenueThisMonth: thisMonthRevenue._sum.amount || 0,
        upcomingTreksNext30Days: upcomingTreks,
        occupancyRate,
        cancellationRate,
        refundPending: pendingRefunds._sum.refundAmount || 0
      }
    });
  } catch (error) {
    console.error('Error fetching dashboard overview:', error);
    return NextResponse.json(
      { error: 'Failed to fetch dashboard overview' },
      { status: 500 }
    );
  }
}
