import { type NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { prisma } from "@/lib/prisma";
import { trackFailedLogin, logAudit } from "@/lib/roleUtils";
import bcrypt from "bcryptjs";
import type { JWT } from "next-auth/jwt";
import type { Session } from "next-auth";

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        // Validate input
        if (!credentials?.email || !credentials?.password) {
          return null;
        }

        // Resolve IP address from headers
        const forwarded = req?.headers?.get?.('x-forwarded-for');
        const ipAddress = forwarded ? forwarded.split(',')[0].trim() : 'unknown';
        const userAgent = req?.headers?.get?.('user-agent') || 'unknown';

        // Find user by email
        const user = await (prisma as any).user.findUnique({
          where: { email: credentials.email },
          select: {
            id: true,
            email: true,
            username: true,
            password: true,
            isActive: true,
            isLocked: true,
            isDenied: true,
            accountLockedUntil: true
          }
        });

        // If no user, track failed attempt and return null
        if (!user) {
          await trackFailedLogin(credentials.email, ipAddress, userAgent);
          return null;
        }

        // If access denied, return null
        if (user.isDenied) {
          return null;
        }

        // If account locked and lock period still active, return null
        if (user.isLocked) {
          if (user.accountLockedUntil && new Date(user.accountLockedUntil) > new Date()) {
            return null;
          }

          // Otherwise, clear stale lock
          await (prisma as any).user.update({
            where: { id: user.id },
            data: { isLocked: false, accountLockedUntil: null }
          });
        }

        if (!user.isActive) {
          return null;
        }

        // Verify password
        const isPasswordValid = await bcrypt.compare(credentials.password, user.password);
        if (!isPasswordValid) {
          await trackFailedLogin(credentials.email, ipAddress, userAgent);
          return null;
        }

        // Update last login and log audit
        await (prisma as any).user.update({ where: { id: user.id }, data: { lastLoginAt: new Date() } });
        await logAudit('USER_LOGIN', 'USER', user.id, user.id, {}, { ipAddress, userAgent });

        return { id: user.id, email: user.email, username: user.username, role: '', isActive: true, isLocked: false };
      },
    }),
  ],
  pages: {
    signIn: "/login",
  },
  callbacks: {
    async jwt({ token, user }: { token: JWT; user?: any }) {
      if (user) {
        token.id = user.id;
        token.username = user.username;
      }

      if (token.id) {
        const dbUser = await (prisma as any).user.findUnique({
          where: { id: token.id as string },
          select: { role: true, isActive: true, isLocked: true }
        });
        if (dbUser) {
          (token as any).role = dbUser.role;
          (token as any).isActive = dbUser.isActive;
          (token as any).isLocked = dbUser.isLocked;
        }
      }

      return token;
    },
    async session({ session, token }: { session: Session; token: JWT }) {
      if (session.user) {
        (session.user as any).id = token.id as string;
        (session.user as any).username = (token as any).username as string;
        (session.user as any).role = (token as any).role as string;
        (session.user as any).isActive = (token as any).isActive as boolean;
        (session.user as any).isLocked = (token as any).isLocked as boolean;
      }
      return session;
    },
  },
  session: {
    strategy: "jwt" as const,
  },
  secret: process.env.NEXTAUTH_SECRET,
};
