import alchemy from "alchemy";
import { D1Database, TanStackStart, Worker } from "alchemy/cloudflare";
import { config } from "dotenv";

const isDevMode = process.argv.includes("--dev");
const serverEnvPath = isDevMode
  ? "../../apps/server/.env"
  : "../../apps/server/.env.prod";

config({ path: "./.env" });
config({ path: "../../apps/web/.env" });
config({ path: serverEnvPath, override: true });

const app = await alchemy("the-trail-makers", {
  password: process.env.ALCHEMY_PASSWORD!,
});

const db = await D1Database("database", {
  migrationsDir: "../../packages/db/src/migrations",
  migrationsTable: "drizzle_migrations",
});

export const web = await TanStackStart("web", {
  cwd: "../../apps/web",
  bindings: {
    VITE_RAZORPAY_KEY_ID: alchemy.secret.env.RAZORPAY_KEY_ID!,
    VITE_SERVER_URL: alchemy.env.VITE_SERVER_URL!,
    DB: db,
    CORS_ORIGIN: alchemy.env.CORS_ORIGIN!,
    BETTER_AUTH_SECRET: alchemy.secret.env.BETTER_AUTH_SECRET!,
    BETTER_AUTH_URL: alchemy.env.BETTER_AUTH_URL!,
  },
});

export const server = await Worker("server", {
  cwd: "../../apps/server",
  entrypoint: "src/index.ts",
  compatibility: "node",
  bindings: {
    DB: db,
    CORS_ORIGIN: alchemy.env.CORS_ORIGIN!,
    BETTER_AUTH_SECRET: alchemy.secret.env.BETTER_AUTH_SECRET!,
    BETTER_AUTH_URL: alchemy.env.BETTER_AUTH_URL!,
    GOOGLE_CLIENT_ID: alchemy.secret.env.GOOGLE_CLIENT_ID!,
    GOOGLE_CLIENT_SECRET: alchemy.secret.env.GOOGLE_CLIENT_SECRET!,
    RESEND_API_KEY: alchemy.secret.env.RESEND_API_KEY!,
    EMAIL_FROM: alchemy.env.EMAIL_FROM!,
    RAZORPAY_KEY_ID: alchemy.secret.env.RAZORPAY_KEY_ID!,
    RAZORPAY_KEY_SECRET: alchemy.secret.env.RAZORPAY_KEY_SECRET!,
  },
  dev: {
    port: 3000,
  },
});

console.log(`Web    -> ${web.url}`);
console.log(`Server -> ${server.url}`);

await app.finalize();
