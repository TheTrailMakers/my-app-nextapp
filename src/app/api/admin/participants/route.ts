import { NextResponse } from 'next/server';
import { checkUserRole, logAudit } from '@/lib/roleUtils';
import { prisma } from '@/lib/prisma';

// GET /api/admin/participants - List all participants
export async function GET(request: Request) {
  const { authorized } = await checkUserRole('MODERATOR');
  
  if (!authorized) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 403 });
  }

  try {
    const { searchParams } = new URL(request.url);
    const filter = searchParams.get('filter'); // all, upcoming, repeat, past
    const paymentStatus = searchParams.get('paymentStatus'); // paid, partial, pending
    const medicalStatus = searchParams.get('medicalStatus'); // submitted, pending
    const idVerified = searchParams.get('idVerified'); // true, false
    const waiverSigned = searchParams.get('waiverSigned'); // true, false
    const page = parseInt(searchParams.get('page') || '1');
    const limit = Math.min(parseInt(searchParams.get('limit') || '20'), 100);
    const search = searchParams.get('search');

    const now = new Date();

    // Build booking where clause based on filter
    let bookingWhere: any = {};
    
    if (filter === 'upcoming') {
      bookingWhere = {
        departure: {
          startDate: { gte: now }
        },
        status: { in: ['PENDING', 'CONFIRMED'] }
      };
    } else if (filter === 'past') {
      bookingWhere = {
        departure: {
          endDate: { lt: now }
        },
        status: 'COMPLETED'
      };
    } else if (filter === 'repeat') {
      bookingWhere = {
        isRepeatTrekker: true
      };
    }

    // Build payment where clause
    let paymentWhere: any = {};
    if (paymentStatus === 'paid') {
      paymentWhere = { status: 'COMPLETED' };
    } else if (paymentStatus === 'pending') {
      paymentWhere = { status: 'PENDING' };
    }

    // Build booking additional conditions
    if (medicalStatus === 'submitted') {
      bookingWhere.medicalFormSubmitted = true;
    } else if (medicalStatus === 'pending') {
      bookingWhere.medicalFormSubmitted = false;
    }

    if (idVerified === 'true') {
      bookingWhere.idVerified = true;
    } else if (idVerified === 'false') {
      bookingWhere.idVerified = false;
    }

    if (waiverSigned === 'true') {
      bookingWhere.waiverSigned = true;
    } else if (waiverSigned === 'false') {
      bookingWhere.waiverSigned = false;
    }

    // Build search
    let searchWhere: any = undefined;
    if (search) {
      searchWhere = {
        OR: [
          { contactName: { contains: search, mode: 'insensitive' } },
          { contactEmail: { contains: search, mode: 'insensitive' } },
          { contactPhone: { contains: search, mode: 'insensitive' } },
          { user: { email: { contains: search, mode: 'insensitive' } } }
        ]
      };
    }

    const where = {
      ...bookingWhere,
      ...(searchWhere && { OR: searchWhere.OR })
    };

    const bookings = await (prisma as any).booking.findMany({
      where,
      include: {
        user: {
          select: {
            id: true,
            email: true,
            firstName: true,
            lastName: true,
            phoneNumber: true
          }
        },
        departure: {
          include: {
            trek: {
              select: {
                id: true,
                name: true,
                slug: true
              }
            }
          }
        },
        payment: {
          select: {
            id: true,
            amount: true,
            status: true,
            advanceAmount: true,
            balanceAmount: true,
            paymentMethod: true,
            createdAt: true
          }
        }
      },
      orderBy: { createdAt: 'desc' },
      skip: (page - 1) * limit,
      take: limit
    });

    const total = await (prisma as any).booking.count({ where });

    // Calculate stats
    const stats = await (prisma as any).booking.groupBy({
      by: ['status'],
      _count: true,
      where: {
        departure: {
          startDate: { gte: now }
        }
      }
    });

    return NextResponse.json({
      success: true,
      participants: bookings,
      stats,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit)
      }
    });
  } catch (error) {
    console.error('Error fetching participants:', error);
    return NextResponse.json(
      { error: 'Failed to fetch participants' },
      { status: 500 }
    );
  }
}

// PATCH /api/admin/participants - Update participant status
export async function PATCH(request: Request) {
  const { authorized, user: adminUser } = await checkUserRole('MODERATOR');
  
  if (!authorized) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 403 });
  }

  try {
    const body = await request.json();
    const {
      bookingId,
      medicalFormSubmitted,
      idVerified,
      idDocumentType,
      waiverSigned,
      emergencyContactName,
      emergencyContactPhone,
      emergencyContactRelation
    } = body;

    const updateData: any = {};
    if (medicalFormSubmitted !== undefined) {
      updateData.medicalFormSubmitted = medicalFormSubmitted;
      if (medicalFormSubmitted) {
        updateData.medicalFormDate = new Date();
      }
    }
    if (idVerified !== undefined) {
      updateData.idVerified = idVerified;
      if (idVerified) {
        updateData.idVerificationDate = new Date();
      }
    }
    if (idDocumentType !== undefined) updateData.idDocumentType = idDocumentType;
    if (waiverSigned !== undefined) {
      updateData.waiverSigned = waiverSigned;
      if (waiverSigned) {
        updateData.waiverSignedDate = new Date();
      }
    }
    if (emergencyContactName !== undefined) updateData.emergencyContactName = emergencyContactName;
    if (emergencyContactPhone !== undefined) updateData.emergencyContactPhone = emergencyContactPhone;
    if (emergencyContactRelation !== undefined) updateData.emergencyContactRelation = emergencyContactRelation;

    const booking = await (prisma as any).booking.update({
      where: { id: bookingId },
      data: updateData
    });

    await logAudit(
      'PARTICIPANT_UPDATED',
      'BOOKING',
      booking.id,
      adminUser.id,
      updateData
    );

    return NextResponse.json({
      success: true,
      booking
    });
  } catch (error) {
    console.error('Error updating participant:', error);
    return NextResponse.json(
      { error: 'Failed to update participant' },
      { status: 500 }
    );
  }
}
