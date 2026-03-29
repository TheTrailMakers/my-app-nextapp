import { and, db, eq, gte, sql } from "@the-trail-makers/db";
import {
  account,
  session,
  user,
  userRoleValues,
  verification,
} from "@the-trail-makers/db/schema/auth";
import { failedLoginAttempt } from "@the-trail-makers/db/schema/operational";
import { auditLog } from "@the-trail-makers/db/schema/rbac";
import { env } from "@the-trail-makers/env/server";
import { APIError, createAuthMiddleware } from "better-auth/api";
import { betterAuth, type BetterAuthPlugin } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";

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

async function generateUniqueUsername(profile: {
  email?: string | null;
  name?: string | null;
}) {
  const emailLocalPart = profile.email?.split("@")[0] ?? "";
  const baseUsername = sanitizeGeneratedUsername(
    emailLocalPart || profile.name || "user",
  );
  const suffix = crypto.randomUUID().replace(/-/g, "").slice(0, 6);
  const trimmedBase = baseUsername
    .slice(0, GENERATED_USERNAME_MAX_LENGTH - (suffix.length + 1))
    .replace(/_+$/g, "");

  return `${trimmedBase || "user"}_${suffix}`;
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

async function logAudit(
  action: string,
  entityType: string,
  entityId: string,
  userId?: string | null,
  changes?: Record<string, unknown>,
  metadata?: Record<string, unknown>,
) {
  try {
    await db.insert(auditLog).values({
      id: crypto.randomUUID(),
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

async function sendPasswordResetEmail({
  email,
  name,
  url,
}: {
  email: string;
  name?: string | null;
  url: string;
}) {
  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${env.RESEND_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: env.EMAIL_FROM,
      to: [email],
      subject: "Reset your Trail Makers password",
      html: `
        <div style="font-family:Arial,sans-serif;max-width:560px;margin:0 auto;padding:24px;color:#111827;line-height:1.6;">
          <p style="margin:0 0 16px;">Hi ${name?.trim() || "there"},</p>
          <p style="margin:0 0 16px;">We received a request to reset your Trail Makers password.</p>
          <p style="margin:24px 0;">
            <a href="${url}" style="display:inline-block;background:#111827;color:#ffffff;padding:12px 20px;border-radius:9999px;text-decoration:none;font-weight:600;">Reset password</a>
          </p>
          <p style="margin:0 0 16px;">This link expires in one hour. If you did not request a reset, you can ignore this email.</p>
          <p style="margin:0;color:#6b7280;font-size:14px;word-break:break-all;">${url}</p>
        </div>
      `,
      text: `Hi ${name?.trim() || "there"},\n\nWe received a request to reset your Trail Makers password.\n\nReset your password: ${url}\n\nThis link expires in one hour. If you did not request a reset, you can ignore this email.`,
    }),
  });

  if (response.ok) {
    return;
  }

  const details = await response.text();
  throw new Error(`Failed to send password reset email: ${details}`);
}

async function trackFailedLogin(
  email: string,
  ipAddress?: string,
  userAgent?: string,
) {
  try {
    const users = await db
      .select({ id: user.id })
      .from(user)
      .where(eq(user.email, email))
      .limit(1);
    const currentUser = users[0];

    if (!currentUser) {
      return;
    }

    await db.insert(failedLoginAttempt).values({
      id: crypto.randomUUID(),
      userId: currentUser.id,
      email,
      ipAddress,
      userAgent,
    });

    const oneHourAgo = new Date(Date.now() - 60 * 60 * 1000);
    const recentFailureCounts = await db
      .select({ count: sql<number>`cast(count(*) as integer)` })
      .from(failedLoginAttempt)
      .where(
        and(
          eq(failedLoginAttempt.userId, currentUser.id),
          gte(failedLoginAttempt.createdAt, oneHourAgo),
        ),
      );
    const recentFailures = recentFailureCounts[0]?.count ?? 0;

    if (recentFailures < 5) {
      return;
    }

    const lockUntil = new Date(Date.now() + 30 * 60 * 1000);
    await db
      .update(user)
      .set({
        isLocked: true,
        accountLockedUntil: lockUntil,
        updatedAt: new Date(),
      })
      .where(eq(user.id, currentUser.id));

    await logAudit(
      "ACCOUNT_LOCKED",
      "USER",
      currentUser.id,
      null,
      { reason: "Too many failed login attempts" },
      { ipAddress, userAgent },
    );
  } catch (error) {
    console.error("Failed to track login attempt:", error);
  }
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
                id: user.id,
                password: user.password,
                isActive: user.isActive,
                isLocked: user.isLocked,
                isDenied: user.isDenied,
                accountLockedUntil: user.accountLockedUntil,
              },
            })
            .from(user)
            .where(eq(user.email, email))
            .limit(1);

          if (!users.length) {
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

          const currentUser = users[0]?.user;
          if (!currentUser) {
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

          if (currentUser.isDenied) {
            throw new APIError("FORBIDDEN", {
              message: "Your account does not have access.",
            });
          }

          if (!currentUser.isActive) {
            throw new APIError("FORBIDDEN", {
              message: "Your account is deactivated.",
            });
          }

          if (currentUser.isLocked) {
            if (
              currentUser.accountLockedUntil &&
              currentUser.accountLockedUntil > new Date()
            ) {
              throw new APIError("FORBIDDEN", {
                message: "Your account is locked.",
              });
            }

            await db
              .update(user)
              .set({
                isLocked: false,
                accountLockedUntil: null,
                updatedAt: new Date(),
              })
              .where(eq(user.id, currentUser.id));
          }

          const credentialAccounts = await db
            .select({
              id: account.id,
              password: account.password,
            })
            .from(account)
            .where(
              and(
                eq(account.userId, currentUser.id),
                eq(account.providerId, "credential"),
              ),
            )
            .limit(1);
          const credentialAccount = credentialAccounts[0];

          if (
            currentUser.password &&
            credentialAccount?.password !== currentUser.password
          ) {
            if (credentialAccount) {
              await db
                .update(account)
                .set({
                  password: currentUser.password,
                  updatedAt: new Date(),
                })
                .where(eq(account.id, credentialAccount.id));
            } else {
              await db.insert(account).values({
                id: crypto.randomUUID(),
                accountId: currentUser.id,
                providerId: "credential",
                userId: currentUser.id,
                password: currentUser.password,
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
              .update(user)
              .set({
                lastLoginAt: new Date(),
                updatedAt: new Date(),
              })
              .where(eq(user.id, userId));

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
  baseURL: env.BETTER_AUTH_URL,
  secret: env.BETTER_AUTH_SECRET,
  database: drizzleAdapter(db, {
    provider: "sqlite",
    schema: {
      user,
      account,
      session,
      verification,
    },
  }),
  advanced: {
    database: {
      generateId: false,
    },
    defaultCookieAttributes: {
      sameSite: "lax",
      secure: true,
      httpOnly: true,
    },
    // uncomment crossSubDomainCookies setting when ready to deploy and replace <your-workers-subdomain> with your actual workers subdomain
    // https://developers.cloudflare.com/workers/wrangler/configuration/#workersdev
    crossSubDomainCookies: {
      enabled: true,
      domain: "<your-workers-subdomain>",
    },
  },
  trustedOrigins: [env.CORS_ORIGIN],
  databaseHooks: {
    user: {
      create: {
        before: async (data) => {
          const normalizedEmail = normalizeEmail(data.email);
          const incomingUsername =
            typeof data.username === "string"
              ? normalizeUsername(data.username)
              : "";
          const username =
            incomingUsername.length > 0
              ? incomingUsername
              : await generateUniqueUsername({
                  email: normalizedEmail,
                  name: data.name,
                });

          return {
            data: {
              ...data,
              email: normalizedEmail,
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
    sendResetPassword: async ({ user, url }) => {
      await sendPasswordResetEmail({
        email: user.email,
        name: user.name,
        url,
      });
    },
  },
  // uncomment cookieCache setting when ready to deploy to Cloudflare using *.workers.dev domains
  session: {
    cookieCache: {
      enabled: true,
      maxAge: 60,
    },
  },
  plugins: [authLifecyclePlugin],
});

export type AuthSession = typeof auth.$Infer.Session;

export async function getSession(
  headers: HeadersInit,
): Promise<AuthSession | null> {
  return (await auth.api.getSession({ headers })) as AuthSession | null;
}
