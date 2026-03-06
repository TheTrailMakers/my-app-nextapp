import { NextResponse } from 'next/server';
import { checkUserRole } from '@/lib/roleUtils';
import { prisma } from '@/lib/prisma';

// GET /api/admin/finance - Get finance summary
export async function GET(request: Request) {
  const { authorized } = await checkUserRole('ADMIN');
  
  if (!authorized) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 403 });
  }

  try {
    const { searchParams } = new URL(request.url);
    const period = searchParams.get('period') || 'all'; // month, quarter, year, all

    // Calculate date range
    const now = new Date();
    let startDate = new Date(0); // Beginning of time
    
    if (period === 'month') {
      startDate = new Date(now.getFullYear(), now.getMonth(), 1);
    } else if (period === 'quarter') {
      const quarter = Math.floor(now.getMonth() / 3);
      startDate = new Date(now.getFullYear(), quarter * 3, 1);
    } else if (period === 'year') {
      startDate = new Date(now.getFullYear(), 0, 1);
    }

    // Total revenue
    const revenue = await (prisma as any).payment.aggregate({
      where: {
        status: 'COMPLETED',
        createdAt: { gte: startDate }
      },
      _sum: {
        amount: true
      }
    });

    // Advance collected
    const advance = await (prisma as any).payment.aggregate({
      where: {
        status: 'COMPLETED',
        advanceAmount: { not: null },
        createdAt: { gte: startDate }
      },
      _sum: {
        advanceAmount: true
      }
    });

    // Balance pending
    const balance = await (prisma as any).payment.aggregate({
      where: {
        status: { in: ['PENDING', 'COMPLETED'] },
        balanceAmount: { not: null },
        createdAt: { gte: startDate }
      },
      _sum: {
        balanceAmount: true
      }
    });

    // GST collected
    const gst = await (prisma as any).payment.aggregate({
      where: {
        status: 'COMPLETED',
        gstAmount: { not: null },
        createdAt: { gte: startDate }
      },
      _sum: {
        gstAmount: true
      }
    });

    // Payment method split
    const paymentsByMethod = await (prisma as any).payment.groupBy({
      by: ['paymentMethod'],
      where: {
        status: 'COMPLETED',
        createdAt: { gte: startDate }
      },
      _sum: {
        amount: true
      },
      _count: true
    });

    // Trek leader payouts
    const trekLeaderPayouts = await (prisma as any).trekLeaderPayout.groupBy({
      by: ['status'],
      where: {
        createdAt: { gte: startDate }
      },
      _sum: {
        amount: true
      },
      _count: true
    });

    const pendingPayouts = trekLeaderPayouts.find((p: any) => p.status === 'PENDING');
    const paidPayouts = trekLeaderPayouts.find((p: any) => p.status === 'PAID');

    return NextResponse.json({
      success: true,
      data: {
        totalRevenue: revenue._sum.amount || 0,
        advanceCollected: advance._sum.advanceAmount || 0,
        balancePending: balance._sum.balanceAmount || 0,
        gstCollected: gst._sum.gstAmount || 0,
        paymentMethodSplit: paymentsByMethod.map((p: any) => ({
          method: p.paymentMethod || 'unknown',
          amount: p._sum.amount || 0,
          count: p._count
        })),
        trekLeaderPayouts: {
          pending: pendingPayouts?._sum.amount || 0,
          paid: paidPayouts?._sum.amount || 0,
          pendingCount: pendingPayouts?._count || 0,
          paidCount: paidPayouts?._count || 0
        }
      }
    });
  } catch (error) {
    console.error('Error fetching finance data:', error);
    return NextResponse.json(
      { error: 'Failed to fetch finance data' },
      { status: 500 }
    );
  }
}

// POST /api/admin/finance/payouts - Process trek leader payout
export async function POST(request: Request) {
  const { authorized, user: adminUser } = await checkUserRole('ADMIN');
  
  if (!authorized) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 403 });
  }

  try {
    const body = await request.json();
    const {
      payoutId,
      status,
      paymentMethod,
      transactionId,
      notes
    } = body;

    if (payoutId) {
      // Update existing payout
      const payout = await (prisma as any).trekLeaderPayout.update({
        where: { id: payoutId },
        data: {
          status,
          paymentMethod,
          transactionId,
          notes,
          paidAt: status === 'PAID' ? new Date() : null
        }
      });

      return NextResponse.json({
        success: true,
        payout
      });
    }

    // Create new payout
    const {
      trekLeaderId,
      departureId,
      amount
    } = body;

    const payout = await (prisma as any).trekLeaderPayout.create({
      data: {
        trekLeaderId,
        departureId,
        amount: parseInt(amount),
        status: 'PENDING',
        notes
      }
    });

    return NextResponse.json({
      success: true,
      payout
    }, { status: 201 });
  } catch (error) {
    console.error('Error processing payout:', error);
    return NextResponse.json(
      { error: 'Failed to process payout' },
      { status: 500 }
    );
  }
}
