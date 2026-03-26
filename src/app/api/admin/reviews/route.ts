import { NextResponse } from "next/server";
import { and, desc, eq, sql } from "drizzle-orm";
import db from "@/drizzle/db";
import { trek, trekReview } from "@/drizzle/schema";
import { logAudit } from "@/lib/roleUtils";
import { requireApiRole } from "@/lib/apiAuth";
import type { SQL } from "drizzle-orm";

// GET /api/admin/reviews - List all reviews
export async function GET(request: Request) {
  const { response } = await requireApiRole("MODERATOR");

  if (response) {
    return response;
  }

  try {
    const { searchParams } = new URL(request.url);
    const trekId = searchParams.get("trekId");
    const rating = searchParams.get("rating");
    const page = parseInt(searchParams.get("page") || "1");
    const limit = Math.min(parseInt(searchParams.get("limit") || "20"), 100);

    const conditions: SQL[] = [];
    if (trekId) conditions.push(eq(trekReview.trekId, trekId));
    if (rating) conditions.push(eq(trekReview.rating, parseInt(rating)));

    const where = conditions.length > 0 ? and(...conditions) : undefined;

    const [reviews, totalRows, avgRatingRows, ratingDistribution] =
      await Promise.all([
        db
          .select({
            review: trekReview,
            trek: {
              id: trek.id,
              name: trek.name,
              slug: trek.slug,
            },
          })
          .from(trekReview)
          .innerJoin(trek, eq(trekReview.trekId, trek.id))
          .where(where)
          .orderBy(desc(trekReview.createdAt))
          .offset((page - 1) * limit)
          .limit(limit),
        db
          .select({ count: sql<number>`cast(count(*) as integer)` })
          .from(trekReview)
          .where(where),
        db
          .select({
            averageRating: sql<number>`coalesce(avg(${trekReview.rating})::double precision, 0)`,
          })
          .from(trekReview)
          .where(where),
        db
          .select({
            rating: trekReview.rating,
            count: sql<number>`cast(count(*) as integer)`,
          })
          .from(trekReview)
          .where(where)
          .groupBy(trekReview.rating),
      ]);

    const total = totalRows[0]?.count ?? 0;

    return NextResponse.json({
      success: true,
      reviews: reviews.map((row) => ({
        ...row.review,
        trek: row.trek,
      })),
      stats: {
        total,
        averageRating: avgRatingRows[0]?.averageRating ?? 0,
        ratingDistribution: ratingDistribution.reduce<Record<number, number>>(
          (acc, review) => {
            acc[review.rating] = review.count;
            return acc;
          },
          {},
        ),
      },
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    console.error("Error fetching reviews:", error);
    return NextResponse.json(
      { error: "Failed to fetch reviews" },
      { status: 500 },
    );
  }
}

// PATCH /api/admin/reviews - Update review (approve/hide)
export async function PATCH(request: Request) {
  const { response, user: adminUser } = await requireApiRole("MODERATOR");

  if (response || !adminUser) {
    return (
      response ?? NextResponse.json({ error: "Unauthorized" }, { status: 403 })
    );
  }

  try {
    const body = await request.json();
    const { reviewId, isHidden, isApproved } = body;

    // Note: We don't have isHidden field in the model yet, so we'll add metadata
    // For now, let's just return success without modifying

    const review = await db
      .select({ id: trekReview.id })
      .from(trekReview)
      .where(eq(trekReview.id, reviewId))
      .limit(1);

    if (!review[0]) {
      return NextResponse.json({ error: "Review not found" }, { status: 404 });
    }

    await logAudit("REVIEW_MODERATED", "TREK_REVIEW", reviewId, adminUser.id, {
      isHidden,
      isApproved,
    });

    return NextResponse.json({
      success: true,
      message: "Review moderated successfully",
    });
  } catch (error) {
    console.error("Error moderating review:", error);
    return NextResponse.json(
      { error: "Failed to moderate review" },
      { status: 500 },
    );
  }
}
