import { env } from "@the-trail-makers/env/server";
import { drizzle } from "drizzle-orm/d1";
export { and, asc, desc, eq, gte, inArray, ne, or, sql } from "drizzle-orm";

import * as schema from "./schema";

export const db = drizzle(env.DB, { schema, casing: "snake_case" });
