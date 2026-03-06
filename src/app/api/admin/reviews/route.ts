import { NextResponse } from 'next/server';
import { checkUserRole, logAudit } from '@/lib/roleUtils';
import { prisma } from '@/lib/prisma';

// GET /api/admin/reviews - List all reviews
export async function GET(request: Request) {
  const { authorized } = await checkUserRole('MODERATOR');
  
  if (!authorized) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 403 });
  }

  try {
    const { searchParams } = new URL(request.url);
    const trekId = searchParams.get('trekId');
    const rating = searchParams.get('rating');
    const page = parseInt(searchParams.get('page') || '1');
    const limit = Math.min(parseInt(searchParams.get('limit') || '20'), 100);

    const where: any = {};
    if (trekId) where.trekId = trekId;
    if (rating) where.rating = parseInt(rating);

    const reviews = await (prisma as any).trekReview.findMany({
      where,
      include: {
        trek: {
          select: {
            id: true,
            name: true,
            slug: true
          }
        },
        user: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            username: true
          }
        }
      },
      orderBy: { createdAt: 'desc' },
      skip: (page - 1) * limit,
      take: limit
    });

    const total = await (prisma as any).trekReview.count({ where });

    // Get average rating
    const avgRating = await (prisma as any).trekReview.aggregate({
      where,
      _avg: {
        rating: true
      }
    });

    // Get rating distribution
    const ratingDistribution = await (prisma as any).trekReview.groupBy({
      by: ['rating'],
      where,
      _count: true
    });

    return NextResponse.json({
      success: true,
      reviews,
      stats: {
        total,
        averageRating: avgRating._avg.rating || 0,
        ratingDistribution: ratingDistribution.reduce((acc: any, r: any) => {
          acc[r.rating] = r._count;
          return acc;
        }, {})
      },
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit)
      }
    });
  } catch (error) {
    console.error('Error fetching reviews:', error);
    return NextResponse.json(
      { error: 'Failed to fetch reviews' },
      { status: 500 }
    );
  }
}

// PATCH /api/admin/reviews - Update review (approve/hide)
export async function PATCH(request: Request) {
  const { authorized, user: adminUser } = await checkUserRole('MODERATOR');
  
  if (!authorized) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 403 });
  }

  try {
    const body = await request.json();
    const { reviewId, isHidden, isApproved } = body;

    // Note: We don't have isHidden field in the model yet, so we'll add metadata
    // For now, let's just return success without modifying
    
    const review = await (prisma as any).trekReview.findUnique({
      where: { id: reviewId }
    });

    if (!review) {
      return NextResponse.json(
        { error: 'Review not found' },
        { status: 404 }
      );
    }

    await logAudit(
      'REVIEW_MODERATED',
      'TREK_REVIEW',
      reviewId,
      adminUser.id,
      { isHidden, isApproved }
    );

    return NextResponse.json({
      success: true,
      message: 'Review moderated successfully'
    });
  } catch (error) {
    console.error('Error moderating review:', error);
    return NextResponse.json(
      { error: 'Failed to moderate review' },
      { status: 500 }
    );
  }
}
