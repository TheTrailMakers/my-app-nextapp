import { sql } from "drizzle-orm";
import { integer } from "drizzle-orm/sqlite-core";

export const timestampMs = () =>
  integer({ mode: "timestamp_ms" })
    .default(sql`(unixepoch() * 1000)`)
    .notNull();

export const timestampCols = {
  createdAt: timestampMs(),
  updatedAt: timestampMs().$onUpdate(() => /* @__PURE__ */ new Date()),
};
