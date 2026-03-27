import { userRole } from "@/drizzle/schema";

export type UserRole = (typeof userRole.enumValues)[number];

export const userRoleValues = userRole.enumValues;
