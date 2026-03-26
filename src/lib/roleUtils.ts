import { and, eq, gte, sql } from "drizzle-orm";
import { randomUUID } from "node:crypto";
import db from "@/drizzle/db";
import { auditLog, failedLoginAttempt, userTable } from "@/drizzle/schema";
import type { UserRole } from "@/lib/user-role";

type AuthorizedUser = {
  id: string;
  role: UserRole;
  isActive: boolean;
  isLocked: boolean;
  isDenied: boolean;
};

const roleHierarchy: Record<UserRole, number> = {
  SUPER_ADMIN: 5,
  ADMIN: 4,
  MODERATOR: 3,
  TREK_LEADER: 2,
  USER: 1,
};

// Check if user has required role
export async function checkUserRole(
  requiredRole: "SUPER_ADMIN" | "ADMIN" | "MODERATOR" | "USER",
) {
  const { getAppSession } = await import("@/lib/auth-session");
  const session = await getAppSession();

  if (!session?.user?.id) {
    return { authorized: false, user: null };
  }

  const users = await db
    .select({
      id: userTable.id,
      role: userTable.role,
      isActive: userTable.isActive,
      isLocked: userTable.isLocked,
      isDenied: userTable.isDenied,
    })
    .from(userTable)
    .where(eq(userTable.id, session.user.id))
    .limit(1);
  const user = users[0] ?? null;

  if (!user || !user.isActive || user.isLocked || user.isDenied) {
    return { authorized: false, user };
  }

  const userRoleLevel = roleHierarchy[user.role];
  const authorizedRoleLevel = roleHierarchy[requiredRole];
  const authorized = userRoleLevel >= authorizedRoleLevel;

  return { authorized, user: user as AuthorizedUser };
}

// Log an audit event
export async function logAudit(
  action: string,
  entityType: string,
  entityId: string,
  userId?: string | null,
  changes?: Record<string, unknown>,
  metadata?: Record<string, unknown>,
) {
  try {
    await db.insert(auditLog).values({
      id: randomUUID(),
      action,
      entityType,
      entityId,
      userId: userId ?? null,
      changes: changes ? JSON.stringify(changes) : null,
      metadata: metadata ? JSON.stringify(metadata) : null,
      description: `${action} on ${entityType} ${entityId}`,
    });
  } catch (error) {
    console.error("Failed to log audit:", error);
  }
}

// Track failed login attempt
export async function trackFailedLogin(
  email: string,
  ipAddress?: string,
  userAgent?: string,
) {
  try {
    const users = await db
      .select({ id: userTable.id })
      .from(userTable)
      .where(eq(userTable.email, email))
      .limit(1);
    const user = users[0];

    if (user) {
      await db.insert(failedLoginAttempt).values({
        id: randomUUID(),
        userId: user.id,
        email,
        ipAddress,
        userAgent,
      });

      // Check if we should lock the account (more than 5 failed attempts in 1 hour)
      const oneHourAgo = new Date(Date.now() - 60 * 60 * 1000);
      const recentFailureCounts = await db
        .select({ count: sql<number>`cast(count(*) as integer)` })
        .from(failedLoginAttempt)
        .where(
          and(
            eq(failedLoginAttempt.userId, user.id),
            gte(failedLoginAttempt.createdAt, oneHourAgo),
          ),
        );
      const recentFailures = recentFailureCounts[0]?.count ?? 0;

      if (recentFailures >= 5) {
        const lockUntil = new Date(Date.now() + 30 * 60 * 1000); // Lock for 30 minutes
        await db
          .update(userTable)
          .set({
            isLocked: true,
            accountLockedUntil: lockUntil,
            updatedAt: new Date(),
          })
          .where(eq(userTable.id, user.id));

        await logAudit(
          "ACCOUNT_LOCKED",
          "USER",
          user.id,
          null,
          { reason: "Too many failed login attempts" },
          { ipAddress, userAgent },
        );
      }
    }
  } catch (error) {
    console.error("Failed to track login attempt:", error);
  }
}

// Unlock user account (for admin)
export async function unlockUserAccount(userId: string, adminId: string) {
  try {
    await db
      .update(userTable)
      .set({
        isLocked: false,
        accountLockedUntil: null,
        updatedAt: new Date(),
      })
      .where(eq(userTable.id, userId));

    await logAudit("ACCOUNT_UNLOCKED", "USER", userId, adminId, {
      unlockedBy: adminId,
    });

    return { success: true };
  } catch (error) {
    console.error("Failed to unlock account:", error);
    return { success: false, error: (error as Error).message };
  }
}
