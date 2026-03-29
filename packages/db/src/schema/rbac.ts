import { relations } from "drizzle-orm";
import {
  index,
  integer,
  sqliteTable,
  text,
  uniqueIndex,
} from "drizzle-orm/sqlite-core";

import { user } from "./auth";
import { timestampCols, timestampMs } from "./common";

export const adminPermission = sqliteTable(
  "admin_permission",
  {
    id: text().primaryKey(),
    permission: text().notNull(),
    category: text().notNull(),
    description: text(),
    ...timestampCols,
  },
  (table) => [
    index("adminPermission_category_idx").on(table.category),
    uniqueIndex("adminPermission_permission_key").on(table.permission),
  ],
);

export const rolePermission = sqliteTable(
  "role_permission",
  {
    id: text().primaryKey(),
    permissionId: text()
      .notNull()
      .references(() => adminPermission.id, { onDelete: "cascade" }),
    role: text().notNull(),
    isEnabled: integer({ mode: "boolean" }).default(true).notNull(),
    ...timestampCols,
  },
  (table) => [
    uniqueIndex("rolePermission_permissionId_role_key").on(
      table.permissionId,
      table.role,
    ),
  ],
);

export const auditLog = sqliteTable(
  "audit_log",
  {
    id: text().primaryKey(),
    action: text().notNull(),
    entityType: text().notNull(),
    entityId: text().notNull(),
    userId: text().references(() => user.id, { onDelete: "set null" }),
    changes: text(),
    metadata: text(),
    description: text(),
    createdAt: timestampMs(),
  },
  (table) => [
    index("auditLog_action_idx").on(table.action),
    index("auditLog_createdAt_idx").on(table.createdAt),
    index("auditLog_entityId_idx").on(table.entityId),
    index("auditLog_entityType_idx").on(table.entityType),
    index("auditLog_userId_idx").on(table.userId),
  ],
);

export const adminPermissionRelations = relations(
  adminPermission,
  ({ many }) => ({
    rolePermissions: many(rolePermission),
  }),
);

export const rolePermissionRelations = relations(rolePermission, ({ one }) => ({
  permission: one(adminPermission, {
    fields: [rolePermission.permissionId],
    references: [adminPermission.id],
  }),
}));

export const auditLogRelations = relations(auditLog, ({ one }) => ({
  user: one(user, {
    fields: [auditLog.userId],
    references: [user.id],
  }),
}));
