import { ORPCError } from "@orpc/server";

import type { Context } from "./context";

export type RequiredRole =
  | "SUPER_ADMIN"
  | "ADMIN"
  | "MODERATOR"
  | "TREK_LEADER"
  | "USER";

export type ContextUser = NonNullable<NonNullable<Context["session"]>["user"]> & {
  role?: string | null;
  isActive?: boolean | null;
  isLocked?: boolean | null;
  isDenied?: boolean | null;
  username?: string | null;
};

const roleHierarchy: Record<RequiredRole, number> = {
  SUPER_ADMIN: 5,
  ADMIN: 4,
  MODERATOR: 3,
  TREK_LEADER: 2,
  USER: 1,
};

export function requireContextUser(session: Context["session"]): ContextUser {
  const sessionUser = session?.user;
  if (!sessionUser) {
    throw new ORPCError("UNAUTHORIZED");
  }

  return sessionUser as ContextUser;
}

export function assertActiveUser(user: ContextUser) {
  if (user.isDenied) {
    throw new ORPCError("FORBIDDEN", {
      message: "Your account does not have access.",
    });
  }

  if (user.isActive === false) {
    throw new ORPCError("FORBIDDEN", {
      message: "Your account is deactivated.",
    });
  }

  if (user.isLocked) {
    throw new ORPCError("FORBIDDEN", {
      message: "Your account is locked.",
    });
  }

  return user;
}

export function hasRequiredRole(role: string | null | undefined, requiredRole: RequiredRole) {
  const currentRole = (role ?? "USER") as RequiredRole;
  return (roleHierarchy[currentRole] ?? 0) >= roleHierarchy[requiredRole];
}

export function assertRole(user: ContextUser, requiredRole: RequiredRole) {
  if (!hasRequiredRole(user.role, requiredRole)) {
    throw new ORPCError("FORBIDDEN", {
      message: "Insufficient permissions.",
    });
  }

  return user;
}