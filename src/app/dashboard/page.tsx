import { redirect } from "next/navigation";
import { desc, eq } from "drizzle-orm";
import db from "@/drizzle/db";
import { booking, departure, payment, trek } from "@/drizzle/schema";
import { getAppSession } from "@/lib/auth-session";
import DashboardClient from "./dashboard-client";

export const dynamic = "force-dynamic";

async function getDashboardBookings(userId: string) {
  const rows = await db
    .select({ booking, departure, trek, payment })
    .from(booking)
    .innerJoin(departure, eq(booking.departureId, departure.id))
    .innerJoin(trek, eq(departure.trekId, trek.id))
    .leftJoin(payment, eq(payment.bookingId, booking.id))
    .where(eq(booking.userId, userId))
    .orderBy(desc(booking.createdAt));

  return rows.map(({ booking, departure, trek, payment }) => ({
    ...booking,
    departure: {
      ...departure,
      trek: {
        name: trek.name,
        state: trek.state,
      },
    },
    payment: payment ? { status: payment.status } : null,
  }));
}

export default async function Dashboard() {
  const session = await getAppSession();

  if (!session?.user?.id) {
    redirect("/login");
  }

  const bookings = await getDashboardBookings(session.user.id);

  return (
    <DashboardClient
      user={{
        email: session.user.email,
        username: session.user.username,
      }}
      bookings={bookings}
    />
  );
}
