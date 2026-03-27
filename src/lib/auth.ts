import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { APIError, createAuthMiddleware } from "better-auth/api";
import { betterAuth, type BetterAuthPlugin } from "better-auth";
import { nextCookies } from "better-auth/next-js";
import { and, eq } from "drizzle-orm";
import { randomUUID } from "node:crypto";
import { trackFailedLogin, logAudit } from "@/lib/roleUtils";
import { sendEmail } from "@/lib/email";
import { hashAuthPassword, verifyAuthPassword } from "@/lib/auth-password";
import db from "@/drizzle/db";
import {
  accountTable,
  sessionTable,
  userTable,
  verificationTable,
} from "@/drizzle/schema";
import { userRoleValues } from "@/lib/user-role";

function normalizeEmail(email: string) {
  return email.trim().toLowerCase();
}

function normalizeUsername(username: string) {
  return username.trim();
}

const GENERATED_USERNAME_MAX_LENGTH = 20;

function sanitizeGeneratedUsername(value: string) {
  const asciiValue = value.normalize("NFKD").replace(/[\u0300-\u036f]/g, "");
  const sanitized = asciiValue
    .replace(/[^A-Za-z0-9_]+/g, "_")
    .replace(/_+/g, "_")
    .replace(/^_+|_+$/g, "")
    .toLowerCase();

  if (sanitized.length >= 2) {
    return sanitized.slice(0, GENERATED_USERNAME_MAX_LENGTH);
  }

  return "user";
}

async function generateUniqueUsername(user: {
  email?: string | null;
  name?: string | null;
}) {
  const emailLocalPart = user.email?.split("@")[0] ?? "";
  const baseUsername = sanitizeGeneratedUsername(
    emailLocalPart || user.name || "user",
  );

  for (let attempt = 0; attempt < 100; attempt += 1) {
    const suffix = attempt === 0 ? "" : `_${attempt + 1}`;
    const trimmedBase = baseUsername
      .slice(0, GENERATED_USERNAME_MAX_LENGTH - suffix.length)
      .replace(/_+$/g, "");
    const candidate = `${trimmedBase || "user"}${suffix}`;
    const existingUsers = await db
      .select({ id: userTable.id })
      .from(userTable)
      .where(eq(userTable.username, candidate))
      .limit(1);

    if (existingUsers.length === 0) {
      return candidate;
    }
  }

  return `user_${randomUUID().replace(/-/g, "").slice(0, 15)}`;
}

function getHeaderValue(
  ctx: {
    headers?: Headers;
    request?: Request;
  },
  name: string,
) {
  return ctx.headers?.get(name) ?? ctx.request?.headers.get(name) ?? null;
}

function getIpAddress(ctx: { headers?: Headers; request?: Request }) {
  const forwarded =
    getHeaderValue(ctx, "x-forwarded-for") ?? getHeaderValue(ctx, "x-real-ip");

  return forwarded ? forwarded.split(",")[0]?.trim() || "unknown" : "unknown";
}

function getUserAgent(ctx: { headers?: Headers; request?: Request }) {
  return getHeaderValue(ctx, "user-agent") ?? "unknown";
}

const authLifecyclePlugin = {
  id: "trail-makers-auth-lifecycle",
  hooks: {
    before: [
      {
        matcher: (ctx) => ctx.path === "/sign-up/email",
        handler: createAuthMiddleware(async (ctx) => {
          const email =
            typeof ctx.body?.email === "string"
              ? normalizeEmail(ctx.body.email)
              : undefined;
          const username =
            typeof ctx.body?.username === "string"
              ? normalizeUsername(ctx.body.username)
              : undefined;
          const name =
            typeof ctx.body?.name === "string" &&
            ctx.body.name.trim().length > 0
              ? ctx.body.name.trim()
              : username;

          return {
            context: {
              ...ctx,
              body: {
                ...ctx.body,
                ...(email ? { email } : {}),
                ...(username ? { username } : {}),
                ...(name ? { name } : {}),
              },
            },
          };
        }),
      },
      {
        matcher: (ctx) => ctx.path === "/sign-in/email",
        handler: createAuthMiddleware(async (ctx) => {
          if (typeof ctx.body?.email !== "string") {
            return;
          }

          const email = normalizeEmail(ctx.body.email);
          const users = await db
            .select({
              user: {
                id: userTable.id,
                password: userTable.password,
                isActive: userTable.isActive,
                isLocked: userTable.isLocked,
                isDenied: userTable.isDenied,
                accountLockedUntil: userTable.accountLockedUntil,
              },
            })
            .from(userTable)
            .where(eq(userTable.email, email))
            .limit(1);

          if (!users || users.length === 0) {
            return {
              context: {
                ...ctx,
                body: {
                  ...ctx.body,
                  email,
                },
              },
            };
          }
          const user = users[0].user;

          if (user.isDenied) {
            throw new APIError("FORBIDDEN", {
              message: "Your account does not have access.",
            });
          }

          if (!user.isActive) {
            throw new APIError("FORBIDDEN", {
              message: "Your account is deactivated.",
            });
          }

          if (user.isLocked) {
            if (
              user.accountLockedUntil &&
              user.accountLockedUntil > new Date()
            ) {
              throw new APIError("FORBIDDEN", {
                message: "Your account is locked.",
              });
            }

            await db
              .update(userTable)
              .set({
                isLocked: false,
                accountLockedUntil: null,
                updatedAt: new Date(),
              })
              .where(eq(userTable.id, user.id));
          }

          const credentialAccounts = await db
            .select({
              id: accountTable.id,
              password: accountTable.password,
            })
            .from(accountTable)
            .where(
              and(
                eq(accountTable.userId, user.id),
                eq(accountTable.providerId, "credential"),
              ),
            )
            .limit(1);
          const credentialAccount = credentialAccounts[0];

          if (user.password && credentialAccount?.password !== user.password) {
            if (credentialAccount) {
              await db
                .update(accountTable)
                .set({
                  password: user.password,
                  updatedAt: new Date(),
                })
                .where(eq(accountTable.id, credentialAccount.id));
            } else {
              await db.insert(accountTable).values({
                id: randomUUID(),
                accountId: user.id,
                providerId: "credential",
                userId: user.id,
                password: user.password,
                updatedAt: new Date(),
              });
            }
          }

          return {
            context: {
              ...ctx,
              body: {
                ...ctx.body,
                email,
              },
            },
          };
        }),
      },
    ],
    after: [
      {
        matcher: (ctx) => ctx.path === "/sign-in/email",
        handler: createAuthMiddleware(async (ctx) => {
          const authContext = ctx.context as {
            newSession?: {
              user?: {
                id?: string;
              };
            };
          };

          const userId = authContext.newSession?.user?.id;
          if (userId) {
            await db
              .update(userTable)
              .set({
                lastLoginAt: new Date(),
                updatedAt: new Date(),
              })
              .where(eq(userTable.id, userId));

            await logAudit(
              "USER_LOGIN",
              "USER",
              userId,
              userId,
              {},
              {
                ipAddress: getIpAddress(ctx),
                userAgent: getUserAgent(ctx),
              },
            );
            return;
          }

          if (typeof ctx.body?.email === "string") {
            await trackFailedLogin(
              normalizeEmail(ctx.body.email),
              getIpAddress(ctx),
              getUserAgent(ctx),
            );
          }
        }),
      },
    ],
  },
} satisfies BetterAuthPlugin;

export const auth = betterAuth({
  appName: "Trail Makers",
  baseURL: process.env.BETTER_AUTH_URL,
  secret: process.env.BETTER_AUTH_SECRET,
  database: drizzleAdapter(db, {
    provider: "pg",
    schema: {
      user: userTable,
      account: accountTable,
      session: sessionTable,
      verification: verificationTable,
    },
  }),
  advanced: {
    database: {
      generateId: "uuid",
    },
  },
  databaseHooks: {
    user: {
      create: {
        before: async (user) => {
          if (
            typeof user.username === "string" &&
            normalizeUsername(user.username).length > 0
          ) {
            return { data: user };
          }

          const username = await generateUniqueUsername({
            email: user.email,
            name: user.name,
          });

          return {
            data: {
              ...user,
              username,
            },
          };
        },
      },
    },
  },
  user: {
    additionalFields: {
      username: {
        type: "string",
        required: true,
      },
      role: {
        type: [...userRoleValues],
        required: false,
        defaultValue: "USER",
        input: false,
      },
      isActive: {
        type: "boolean",
        required: false,
        defaultValue: true,
        input: false,
      },
      isLocked: {
        type: "boolean",
        required: false,
        defaultValue: false,
        input: false,
      },
      isDenied: {
        type: "boolean",
        required: false,
        defaultValue: false,
        input: false,
      },
      accountLockedUntil: {
        type: "date",
        required: false,
        input: false,
      },
      lastLoginAt: {
        type: "date",
        required: false,
        input: false,
      },
      passwordChangedAt: {
        type: "date",
        required: false,
        input: false,
      },
    },
  },
  emailAndPassword: {
    enabled: true,
    autoSignIn: false,
    minPasswordLength: 12,
    password: {
      hash: hashAuthPassword,
      verify: verifyAuthPassword,
    },
    sendResetPassword: async ({ user, url }) => {
      void sendEmail({
        to: user.email,
        subject: "Reset Your Trail Makers Password",
        html: `
          <div style="font-family: Poppins, Arial, sans-serif; background: #000; color: #fff; padding: 24px;">
            <div style="max-width: 600px; margin: 0 auto; background: #111; border-radius: 12px; padding: 32px;">
              <h1 style="margin: 0 0 16px;">Trail Makers</h1>
              <p style="color: #cbd5e1; line-height: 1.6;">We received a request to reset your password.</p>
              <p style="margin: 24px 0;">
                <a href="${url}" style="display: inline-block; background: #2563eb; color: #fff; padding: 12px 20px; border-radius: 8px; text-decoration: none; font-weight: 600;">Reset Password</a>
              </p>
              <p style="color: #94a3b8; line-height: 1.6;">If you did not request this, you can ignore this email.</p>
            </div>
          </div>
        `.trim(),
      });
    },
  },
  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    },
  },
  plugins: [nextCookies(), authLifecyclePlugin],
});

export type AuthSession = typeof auth.$Infer.Session;
