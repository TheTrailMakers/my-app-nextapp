import { redirect } from "next/navigation";
import { desc, eq } from "drizzle-orm";
import db from "@/drizzle/db";
import { booking, userTable } from "@/drizzle/schema";
import { getAppSession } from "@/lib/auth-session";
import ProfileClient from "./profile-client";

export const dynamic = "force-dynamic";

async function getProfileData(userId: string) {
  const users = await db
    .select({
      id: userTable.id,
      email: userTable.email,
      username: userTable.username,
      firstName: userTable.firstName,
      lastName: userTable.lastName,
      phoneNumber: userTable.phoneNumber,
      address: userTable.address,
      city: userTable.city,
      state: userTable.state,
      pincode: userTable.pincode,
    })
    .from(userTable)
    .where(eq(userTable.id, userId))
    .limit(1);
  const user = users[0];

  if (!user) {
    return null;
  }

  const bookings = await db
    .select({
      id: booking.id,
      departureId: booking.departureId,
      numberOfPeople: booking.numberOfPeople,
      totalAmount: booking.totalAmount,
      status: booking.status,
      contactName: booking.contactName,
      contactPhone: booking.contactPhone,
      createdAt: booking.createdAt,
    })
    .from(booking)
    .where(eq(booking.userId, user.id))
    .orderBy(desc(booking.createdAt));

  return { user, bookings };
}

export default async function ProfilePage() {
  const session = await getAppSession();

  if (!session?.user?.email) {
    redirect("/login");
  }

  const data = await getProfileData(session.user.id);

  if (!data) {
    redirect("/login");
  }

  return (
    <ProfileClient initialProfile={data.user} initialBookings={data.bookings} />
  );
}
