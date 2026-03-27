import { NextResponse } from "next/server";
import { eq } from "drizzle-orm";
import db from "@/drizzle/db";
import { userTable } from "@/drizzle/schema";
import { logAudit } from "@/lib/roleUtils";
import { requireApiRole } from "@/lib/apiAuth";
import type { UserRole } from "@/lib/user-role";

const validUserRoles: UserRole[] = [
  "ADMIN",
  "MODERATOR",
  "USER",
  "SUPER_ADMIN",
  "TREK_LEADER",
];

function parseUserRole(role: unknown): UserRole | null {
  if (typeof role !== "string") {
    return null;
  }

  return validUserRoles.includes(role as UserRole) ? (role as UserRole) : null;
}

// GET a specific user
export async function GET(
  request: Request,
  props: { params: Promise<{ userId: string }> },
) {
  const params = await props.params;
  const { response } = await requireApiRole("ADMIN");

  if (response) {
    return response;
  }

  try {
    const user = await db
      .select({
        id: userTable.id,
        email: userTable.email,
        username: userTable.username,
        firstName: userTable.firstName,
        lastName: userTable.lastName,
        phoneNumber: userTable.phoneNumber,
        role: userTable.role,
        isActive: userTable.isActive,
        isLocked: userTable.isLocked,
        isDenied: userTable.isDenied,
        accountLockedUntil: userTable.accountLockedUntil,
        lastLoginAt: userTable.lastLoginAt,
        createdAt: userTable.createdAt,
        updatedAt: userTable.updatedAt,
      })
      .from(userTable)
      .where(eq(userTable.id, params.userId))
      .limit(1);

    if (!user[0]) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true, user: user[0] });
  } catch (error) {
    console.error("Error fetching user:", error);
    return NextResponse.json(
      { error: "Failed to fetch user" },
      { status: 500 },
    );
  }
}

// UPDATE user (admin only)
export async function PATCH(
  request: Request,
  props: { params: Promise<{ userId: string }> },
) {
  const params = await props.params;
  const { response, user: adminUser } = await requireApiRole("ADMIN");

  if (response || !adminUser) {
    return (
      response ?? NextResponse.json({ error: "Unauthorized" }, { status: 403 })
    );
  }

  try {
    const { role, isActive, firstName, lastName, phoneNumber } =
      await request.json();

    const existingUser = await db
      .select({
        id: userTable.id,
        role: userTable.role,
        isActive: userTable.isActive,
      })
      .from(userTable)
      .where(eq(userTable.id, params.userId))
      .limit(1);

    const currentUser = existingUser[0];

    if (!currentUser) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    // Prevent admins from modifying themselves
    if (currentUser.id === adminUser.id) {
      return NextResponse.json(
        { error: "Cannot perform this action on yourself" },
        { status: 400 },
      );
    }

    // Prepare update data
    const updateData: {
      role?: UserRole;
      isActive?: boolean;
      firstName?: string;
      lastName?: string;
      phoneNumber?: string;
      updatedAt?: Date;
    } = {};
    const changedFields: Record<string, unknown> = {};

    if (role !== undefined) {
      const parsedRole = parseUserRole(role);

      if (!parsedRole) {
        return NextResponse.json({ error: "Invalid role" }, { status: 400 });
      }

      if (parsedRole !== currentUser.role) {
        updateData.role = parsedRole;
        changedFields.role = { from: currentUser.role, to: parsedRole };
      }
    }

    if (isActive !== undefined && isActive !== currentUser.isActive) {
      updateData.isActive = isActive;
      changedFields.isActive = { from: currentUser.isActive, to: isActive };
    }

    if (firstName !== undefined) updateData.firstName = firstName;
    if (lastName !== undefined) updateData.lastName = lastName;
    if (phoneNumber !== undefined) updateData.phoneNumber = phoneNumber;
    updateData.updatedAt = new Date();

    await db
      .update(userTable)
      .set(updateData)
      .where(eq(userTable.id, params.userId));

    const updatedUser = await db
      .select({
        id: userTable.id,
        email: userTable.email,
        username: userTable.username,
        firstName: userTable.firstName,
        lastName: userTable.lastName,
        role: userTable.role,
        isActive: userTable.isActive,
        createdAt: userTable.createdAt,
      })
      .from(userTable)
      .where(eq(userTable.id, params.userId))
      .limit(1);

    if (Object.keys(changedFields).length > 0) {
      await logAudit(
        "USER_UPDATED",
        "USER",
        params.userId,
        adminUser.id,
        changedFields,
      );
    }

    return NextResponse.json({ success: true, user: updatedUser[0] });
  } catch (error) {
    console.error("Error updating user:", error);
    return NextResponse.json(
      { error: "Failed to update user" },
      { status: 500 },
    );
  }
}

// DELETE user (admin only)
export async function DELETE(
  request: Request,
  props: { params: Promise<{ userId: string }> },
) {
  const params = await props.params;
  const { response, user: adminUser } = await requireApiRole("ADMIN");

  if (response || !adminUser) {
    return (
      response ?? NextResponse.json({ error: "Unauthorized" }, { status: 403 })
    );
  }

  try {
    const user = await db
      .select({
        id: userTable.id,
        email: userTable.email,
      })
      .from(userTable)
      .where(eq(userTable.id, params.userId))
      .limit(1);

    const existingUser = user[0];

    if (!existingUser) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    // Prevent admins from deleting (deactivating) themselves
    if (existingUser.id === adminUser.id) {
      return NextResponse.json(
        { error: "Cannot perform this action on yourself" },
        { status: 400 },
      );
    }

    // Soft delete by deactivating
    await db
      .update(userTable)
      .set({ isActive: false, updatedAt: new Date() })
      .where(eq(userTable.id, params.userId));

    await logAudit("USER_DEACTIVATED", "USER", params.userId, adminUser.id, {
      email: existingUser.email,
    });

    return NextResponse.json({ success: true, message: "User deactivated" });
  } catch (error) {
    console.error("Error deleting user:", error);
    return NextResponse.json(
      { error: "Failed to delete user" },
      { status: 500 },
    );
  }
}
