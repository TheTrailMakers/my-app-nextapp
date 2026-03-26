import { redirect } from "next/navigation";
import { desc } from "drizzle-orm";
import db from "@/drizzle/db";
import { userTable } from "@/drizzle/schema";
import { getAppSession } from "@/lib/auth-session";
import type { UserRole } from "@/lib/user-role";
import AdminClient, { type AdminUserRecord } from "./admin-client";

export const dynamic = "force-dynamic";

async function getAdminUsers(): Promise<AdminUserRecord[]> {
  return db
    .select({
      id: userTable.id,
      email: userTable.email,
      username: userTable.username,
      firstName: userTable.firstName,
      lastName: userTable.lastName,
      role: userTable.role,
      isActive: userTable.isActive,
      isLocked: userTable.isLocked,
      isDenied: userTable.isDenied,
      accountLockedUntil: userTable.accountLockedUntil,
      lastLoginAt: userTable.lastLoginAt,
      createdAt: userTable.createdAt,
    })
    .from(userTable)
    .orderBy(desc(userTable.createdAt));
}

export default async function AdminPage() {
  const session = await getAppSession();

  if (!session?.user?.email) {
    redirect("/login");
  }

  if (session.user.role !== "ADMIN" && session.user.role !== "SUPER_ADMIN") {
    redirect("/access-denied");
  }

  const users = await getAdminUsers();

  return (
    <AdminClient
      initialUsers={users}
      currentUserId={session.user.id}
      currentUserRole={session.user.role as UserRole}
    />
  );
}
