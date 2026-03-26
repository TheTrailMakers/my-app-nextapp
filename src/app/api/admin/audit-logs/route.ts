import { NextResponse } from "next/server";
import { and, desc, eq, gte, lte, sql } from "drizzle-orm";
import db from "@/drizzle/db";
import { auditLog, userTable } from "@/drizzle/schema";
import { requireApiRole } from "@/lib/apiAuth";
import type { SQL } from "drizzle-orm";

function parseJsonField(value: string | null) {
  if (!value) {
    return null;
  }

  try {
    return JSON.parse(value) as unknown;
  } catch {
    return null;
  }
}

// GET audit logs (admin & moderator)
export async function GET(request: Request) {
  const { response } = await requireApiRole("MODERATOR");

  if (response) {
    return response;
  }

  try {
    const { searchParams } = new URL(request.url);
    const action = searchParams.get("action");
    const entityType = searchParams.get("entityType");
    const userId = searchParams.get("userId");
    const limit = Math.min(parseInt(searchParams.get("limit") || "50"), 100);
    const page = parseInt(searchParams.get("page") || "1");
    const startDate = searchParams.get("startDate");
    const endDate = searchParams.get("endDate");

    const conditions: SQL[] = [];
    if (action) conditions.push(eq(auditLog.action, action));
    if (entityType) conditions.push(eq(auditLog.entityType, entityType));
    if (userId) conditions.push(eq(auditLog.userId, userId));
    if (startDate)
      conditions.push(gte(auditLog.createdAt, new Date(startDate)));
    if (endDate) conditions.push(lte(auditLog.createdAt, new Date(endDate)));

    const where = conditions.length > 0 ? and(...conditions) : undefined;

    const [logs, totalRows] = await Promise.all([
      db
        .select({
          log: auditLog,
          user: {
            id: userTable.id,
            email: userTable.email,
            username: userTable.username,
            firstName: userTable.firstName,
            lastName: userTable.lastName,
          },
        })
        .from(auditLog)
        .leftJoin(userTable, eq(auditLog.userId, userTable.id))
        .where(where)
        .orderBy(desc(auditLog.createdAt))
        .offset((page - 1) * limit)
        .limit(limit),
      db
        .select({ count: sql<number>`cast(count(*) as integer)` })
        .from(auditLog)
        .where(where),
    ]);

    const total = totalRows[0]?.count ?? 0;

    // Parse JSON fields
    const parsedLogs = logs.map((row) => ({
      ...row.log,
      user: row.user?.id ? row.user : null,
      changes: parseJsonField(row.log.changes),
      metadata: parseJsonField(row.log.metadata),
    }));

    return NextResponse.json({
      success: true,
      logs: parsedLogs,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    console.error("Error fetching audit logs:", error);
    return NextResponse.json(
      { error: "Failed to fetch audit logs" },
      { status: 500 },
    );
  }
}
