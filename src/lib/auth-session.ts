import { headers } from "next/headers";
import { auth, type AuthSession } from "@/lib/auth";

export type AppSession = AuthSession;

export async function getAppSession(): Promise<AppSession | null> {
  return (await auth.api.getSession({
    headers: await headers(),
  })) as AppSession | null;
}
