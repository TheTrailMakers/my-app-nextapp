import { redirect } from "next/navigation";
import { getAppSession } from "@/lib/auth-session";
import LoginClient from "./login-client";

type LoginPageProps = {
  searchParams: Promise<{
    next?: string;
  }>;
};

export default async function LoginPage({ searchParams }: LoginPageProps) {
  const session = await getAppSession();
  const params = await searchParams;
  const nextPath = params.next ?? null;

  if (session?.user) {
    if (nextPath) {
      redirect(nextPath);
    }

    if (
      session.user.role === "ADMIN" ||
      session.user.role === "SUPER_ADMIN" ||
      session.user.role === "MODERATOR"
    ) {
      redirect("/admin");
    }

    redirect("/dashboard");
  }

  return <LoginClient nextPath={nextPath} />;
}
