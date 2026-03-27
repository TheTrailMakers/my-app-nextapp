import { NextResponse } from "next/server";
import { desc, eq } from "drizzle-orm";
import db from "@/drizzle/db";
import { booking, departure, payment, trek } from "@/drizzle/schema";
import { getAppSession } from "@/lib/auth-session";

// GET user's bookings
export async function GET() {
  const session = await getAppSession();

  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const rows = await db
      .select({ booking, departure, trek, payment })
      .from(booking)
      .innerJoin(departure, eq(booking.departureId, departure.id))
      .innerJoin(trek, eq(departure.trekId, trek.id))
      .leftJoin(payment, eq(payment.bookingId, booking.id))
      .where(eq(booking.userId, session.user.id))
      .orderBy(desc(booking.createdAt));

    const bookings = rows.map(({ booking, departure, trek, payment }) => ({
      ...booking,
      departure: {
        ...departure,
        trek: {
          id: trek.id,
          name: trek.name,
          slug: trek.slug,
        },
      },
      payment: payment ? { status: payment.status } : null,
    }));

    return NextResponse.json({
      success: true,
      bookings,
    });
  } catch (error) {
    console.error("Error fetching bookings:", error);
    return NextResponse.json(
      { error: "Failed to fetch bookings" },
      { status: 500 },
    );
  }
}
