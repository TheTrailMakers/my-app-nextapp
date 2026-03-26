export const dynamic = "force-dynamic";

import { NextResponse } from "next/server";
import { desc } from "drizzle-orm";
import db from "@/drizzle/db";
import { failedLoginAttempt } from "@/drizzle/schema";
import { requireApiRole } from "@/lib/apiAuth";

export async function GET(req: Request) {
  try {
    const { response } = await requireApiRole("MODERATOR");
    if (response) {
      return response;
    }

    const recent = await db
      .select()
      .from(failedLoginAttempt)
      .orderBy(desc(failedLoginAttempt.createdAt))
      .limit(200);

    return NextResponse.json({ success: true, attempts: recent });
  } catch (error) {
    console.error("Failed to fetch login attempts", error);
    return NextResponse.json({ error: "Failed to fetch" }, { status: 500 });
  }
}
