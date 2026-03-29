import dotenv from "dotenv";
import { defineConfig } from "drizzle-kit";

dotenv.config({
  path: "../../apps/server/.env",
});

export default defineConfig({
  schema: "./src/schema",
  out: "./src/migrations",
  // DOCS: https://orm.drizzle.team/docs/guides/d1-http-with-drizzle-kit
  dialect: "sqlite",
  driver: "d1-http",
  casing: "snake_case",
  dbCredentials: {
    accountId: process.env.CF_ACCOUNT_ID!,
    databaseId: process.env.CF_DATABASE_ID!,
    token: process.env.CF_DATABASE_TOKEN!,
  },
});
