import { NextResponse } from "next/server";
import { randomUUID } from "node:crypto";
import { and, desc, eq, or, sql } from "drizzle-orm";
import db from "@/drizzle/db";
import { userTable } from "@/drizzle/schema";
import { logAudit } from "@/lib/roleUtils";
import bcrypt from "bcrypt";
import { requireApiRole } from "@/lib/apiAuth";
import type { SQL } from "drizzle-orm";
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

// GET all users
export async function GET(request: Request) {
  const { response } = await requireApiRole("ADMIN");

  if (response) {
    return response;
  }

  try {
    const { searchParams } = new URL(request.url);
    const requestedRole = searchParams.get("role");
    const limit = Math.min(parseInt(searchParams.get("limit") || "50"), 100);
    const page = parseInt(searchParams.get("page") || "1");

    const conditions: SQL[] = [];
    if (requestedRole) {
      const role = parseUserRole(requestedRole);

      if (!role) {
        return NextResponse.json(
          { error: "Invalid role filter" },
          { status: 400 },
        );
      }

      conditions.push(eq(userTable.role, role));
    }

    const where = conditions.length > 0 ? and(...conditions) : undefined;

    const [users, total] = await Promise.all([
      db
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
        .where(where)
        .orderBy(desc(userTable.createdAt))
        .offset((page - 1) * limit)
        .limit(limit),
      db
        .select({ count: sql<number>`cast(count(*) as integer)` })
        .from(userTable)
        .where(where),
    ]);

    const totalCount = total[0]?.count ?? 0;

    return NextResponse.json({
      success: true,
      users,
      pagination: {
        page,
        limit,
        total: totalCount,
        pages: Math.ceil(totalCount / limit),
      },
    });
  } catch (error) {
    console.error("Error fetching users:", error);
    return NextResponse.json(
      { error: "Failed to fetch users" },
      { status: 500 },
    );
  }
}

// CREATE a new user (admin only)
export async function POST(request: Request) {
  const { response, user: adminUser } = await requireApiRole("ADMIN");

  if (response) {
    return response;
  }

  try {
    const {
      email,
      username,
      password,
      firstName,
      lastName,
      role: rawRole,
    } = await request.json();

    // Validate input
    if (!email || !username || !password) {
      return NextResponse.json(
        { error: "Email, username, and password are required" },
        { status: 400 },
      );
    }

    const role = rawRole ? parseUserRole(rawRole) : "USER";
    if (!role) {
      return NextResponse.json({ error: "Invalid role" }, { status: 400 });
    }

    // Check if user already exists
    const existing = await db
      .select({ id: userTable.id })
      .from(userTable)
      .where(or(eq(userTable.email, email), eq(userTable.username, username)))
      .limit(1);

    if (existing[0]) {
      return NextResponse.json(
        { error: "Email or username already exists" },
        { status: 400 },
      );
    }

    // Hash password (in production, use bcrypt)
    const hashedPassword = await bcrypt.hash(password, 12);

    const newUserId = randomUUID();

    await db.insert(userTable).values({
      id: newUserId,
      email,
      username,
      password: hashedPassword,
      firstName,
      lastName,
      role,
      isActive: true,
      updatedAt: new Date(),
    });

    const newUser = await db
      .select({
        id: userTable.id,
        email: userTable.email,
        username: userTable.username,
        firstName: userTable.firstName,
        lastName: userTable.lastName,
        role: userTable.role,
        createdAt: userTable.createdAt,
      })
      .from(userTable)
      .where(eq(userTable.id, newUserId))
      .limit(1);

    await logAudit("USER_CREATED", "USER", newUserId, adminUser.id, {
      email,
      username,
      role,
    });

    return NextResponse.json(
      {
        success: true,
        user: newUser[0],
      },
      { status: 201 },
    );
  } catch (error) {
    console.error("Error creating user:", error);
    return NextResponse.json(
      { error: "Failed to create user" },
      { status: 500 },
    );
  }
}
