import { NextResponse } from 'next/server';
import { checkUserRole, logAudit } from '@/lib/roleUtils';
import { prisma } from '@/lib/prisma';

// GET /api/admin/departures - List all departures
export async function GET(request: Request) {
  const { authorized } = await checkUserRole('MODERATOR');
  
  if (!authorized) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 403 });
  }

  try {
    const { searchParams } = new URL(request.url);
    const trekId = searchParams.get('trekId');
    const status = searchParams.get('status');
    const page = parseInt(searchParams.get('page') || '1');
    const limit = Math.min(parseInt(searchParams.get('limit') || '20'), 100);

    const where: any = {};
    if (trekId) where.trekId = trekId;
    if (status) where.status = status;

    const departures = await (prisma as any).departure.findMany({
      where,
      include: {
        trek: {
          select: {
            id: true,
            name: true,
            slug: true
          }
        },
        trekLeader: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            email: true
          }
        },
        _count: {
          select: {
            bookings: true
          }
        }
      },
      orderBy: { startDate: 'asc' },
      skip: (page - 1) * limit,
      take: limit
    });

    const total = await (prisma as any).departure.count({ where });

    return NextResponse.json({
      success: true,
      departures,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit)
      }
    });
  } catch (error) {
    console.error('Error fetching departures:', error);
    return NextResponse.json(
      { error: 'Failed to fetch departures' },
      { status: 500 }
    );
  }
}

// POST /api/admin/departures - Create new departure
export async function POST(request: Request) {
  const { authorized, user: adminUser } = await checkUserRole('ADMIN');
  
  if (!authorized) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 403 });
  }

  try {
    const body = await request.json();
    const {
      trekId,
      startDate,
      endDate,
      totalSeats,
      pricePerPerson,
      trekLeaderId,
      trekLeaderName,
      maxWaitlist
    } = body;

    // Check if departure already exists for this trek and date
    const existing = await (prisma as any).departure.findUnique({
      where: {
        trekId_startDate: {
          trekId,
          startDate: new Date(startDate)
        }
      }
    });

    if (existing) {
      return NextResponse.json(
        { error: 'Departure already exists for this trek on this date' },
        { status: 400 }
      );
    }

    const departure = await (prisma as any).departure.create({
      data: {
        trekId,
        startDate: new Date(startDate),
        endDate: new Date(endDate),
        totalSeats: parseInt(totalSeats),
        seatsAvailable: parseInt(totalSeats),
        pricePerPerson: parseInt(pricePerPerson),
        trekLeaderId: trekLeaderId || null,
        trekLeaderName: trekLeaderName || null,
        maxWaitlist: maxWaitlist ? parseInt(maxWaitlist) : 5,
        status: 'OPEN'
      }
    });

    await logAudit(
      'DEPARTURE_CREATED',
      'DEPARTURE',
      departure.id,
      adminUser.id,
      { trekId, startDate, totalSeats }
    );

    return NextResponse.json({
      success: true,
      departure
    }, { status: 201 });
  } catch (error) {
    console.error('Error creating departure:', error);
    return NextResponse.json(
      { error: 'Failed to create departure' },
      { status: 500 }
    );
  }
}

// PATCH /api/admin/departures - Update departure (capacity, status, etc.)
export async function PATCH(request: Request) {
  const { authorized, user: adminUser } = await checkUserRole('ADMIN');
  
  if (!authorized) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 403 });
  }

  try {
    const body = await request.json();
    const {
      departureId,
      totalSeats,
      pricePerPerson,
      trekLeaderId,
      trekLeaderName,
      status,
      maxWaitlist,
      isCancelled,
      cancellationReason
    } = body;

    // Get current departure to check booked seats
    const current = await (prisma as any).departure.findUnique({
      where: { id: departureId },
      include: {
        _count: {
          select: { bookings: true }
        }
      }
    });

    if (!current) {
      return NextResponse.json(
        { error: 'Departure not found' },
        { status: 404 }
      );
    }

    // If trying to decrease capacity, check if booked seats allow it
    if (totalSeats && parseInt(totalSeats) < current.totalSeats) {
      const bookedSeats = current.totalSeats - current.seatsAvailable;
      if (parseInt(totalSeats) < bookedSeats) {
        return NextResponse.json(
          { error: `Cannot decrease capacity below booked seats (${bookedSeats})` },
          { status: 400 }
        );
      }
    }

    const updateData: any = {};
    if (totalSeats !== undefined) {
      const newTotal = parseInt(totalSeats);
      const bookedSeats = current.totalSeats - current.seatsAvailable;
      updateData.totalSeats = newTotal;
      updateData.seatsAvailable = newTotal - bookedSeats;
    }
    if (pricePerPerson !== undefined) updateData.pricePerPerson = parseInt(pricePerPerson);
    if (trekLeaderId !== undefined) updateData.trekLeaderId = trekLeaderId || null;
    if (trekLeaderName !== undefined) updateData.trekLeaderName = trekLeaderName || null;
    if (status !== undefined) updateData.status = status;
    if (maxWaitlist !== undefined) updateData.maxWaitlist = parseInt(maxWaitlist);
    if (isCancelled !== undefined) {
      updateData.isCancelled = isCancelled;
      if (isCancelled) {
        updateData.cancellationReason = cancellationReason || 'Cancelled by admin';
      } else {
        updateData.cancellationReason = null;
      }
    }

    const departure = await (prisma as any).departure.update({
      where: { id: departureId },
      data: updateData
    });

    await logAudit(
      'DEPARTURE_UPDATED',
      'DEPARTURE',
      departure.id,
      adminUser.id,
      updateData
    );

    return NextResponse.json({
      success: true,
      departure
    });
  } catch (error) {
    console.error('Error updating departure:', error);
    return NextResponse.json(
      { error: 'Failed to update departure' },
      { status: 500 }
    );
  }
}
