import { redirect } from "next/navigation";
import { getAdminDashboardOverview } from "@/lib/services/adminDashboardService";
import { getAppSession } from "@/lib/auth-session";
import AdminDashboardClient from "./dashboard-client";
export const dynamic = "force-dynamic";

export default async function AdminDashboardPage() {
  const session = await getAppSession();

  if (!session?.user?.email) {
    redirect("/login");
  }

  if (
    session.user.role !== "SUPER_ADMIN" &&
    session.user.role !== "ADMIN" &&
    session.user.role !== "MODERATOR"
  ) {
    redirect("/access-denied");
  }

  const initialStats = await getAdminDashboardOverview();

  return (
    <AdminDashboardClient
      initialRole={session.user.role}
      initialStats={initialStats}
    />
  );
}
