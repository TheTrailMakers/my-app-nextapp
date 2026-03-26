import { NextResponse } from "next/server";
import { eq } from "drizzle-orm";
import db from "@/drizzle/db";
import { userTable } from "@/drizzle/schema";
import { logAudit } from "@/lib/roleUtils";
import { requireApiRole } from "@/lib/apiAuth";

// POST: Toggle deny access (Super Admin only)
export async function POST(
  request: Request,
  props: { params: Promise<{ userId: string }> },
) {
  const params = await props.params;
  const { response, user: adminUser } = await requireApiRole("SUPER_ADMIN");

  if (response || !adminUser) {
    return (
      response ?? NextResponse.json({ error: "Unauthorized" }, { status: 403 })
    );
  }

  try {
    const { deny } = await request.json();

    const existingUser = await db
      .select({
        id: userTable.id,
        username: userTable.username,
        isDenied: userTable.isDenied,
        role: userTable.role,
      })
      .from(userTable)
      .where(eq(userTable.id, params.userId))
      .limit(1);

    const user = existingUser[0];

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    // Prevent acting on self
    if (user.id === adminUser.id) {
      return NextResponse.json(
        { error: "Cannot perform this action on yourself" },
        { status: 400 },
      );
    }

    // Prevent denying other Super Admins
    if (deny && user.role === "SUPER_ADMIN" && user.id !== adminUser.id) {
      return NextResponse.json(
        { error: "Cannot deny access to another Super Admin" },
        { status: 403 },
      );
    }

    await db
      .update(userTable)
      .set({ isDenied: Boolean(deny), updatedAt: new Date() })
      .where(eq(userTable.id, params.userId));

    // Log the action
    await logAudit(
      deny ? "DENY_ACCESS" : "ALLOW_ACCESS",
      "User",
      params.userId,
      adminUser.id,
      { isDenied: { from: user.isDenied, to: Boolean(deny) } },
      { targetUsername: user.username },
    );

    return NextResponse.json({
      success: true,
      user: {
        id: params.userId,
        isDenied: Boolean(deny),
      },
    });
  } catch (error) {
    console.error("Error toggling deny access:", error);
    return NextResponse.json(
      { error: "Failed to toggle deny access" },
      { status: 500 },
    );
  }
}
