import type { RouterClient } from "@orpc/server";

import {
  adminProcedure,
  moderatorProcedure,
  protectedProcedure,
  publicProcedure,
} from "../index";
import { bookingsRouter } from "./bookings";
import { catalogRouter } from "./catalog";
import { departuresRouter } from "./departures";
import { profileRouter } from "./profile";

function serializeUser(
  user:
    | {
        id: string;
        email?: string | null;
        name?: string | null;
        role?: string | null;
        username?: string | null;
      }
    | null
    | undefined,
) {
  if (!user) {
    return null;
  }

  return {
    id: user.id,
    email: user.email ?? null,
    name: user.name ?? null,
    role: user.role ?? "USER",
    username: user.username ?? null,
  };
}

export const appRouter = {
  healthCheck: publicProcedure.handler(() => {
    return "OK";
  }),
  privateData: protectedProcedure.handler(({ context }) => {
    return {
      message: "This is private",
      user: serializeUser(context.user),
    };
  }),
  currentUser: protectedProcedure.handler(({ context }) => {
    return {
      user: serializeUser(context.user),
    };
  }),
  moderatorStatus: moderatorProcedure.handler(({ context }) => {
    return {
      authorized: true,
      user: serializeUser(context.user),
    };
  }),
  adminStatus: adminProcedure.handler(({ context }) => {
    return {
      authorized: true,
      user: serializeUser(context.user),
    };
  }),
  bookings: bookingsRouter,
  catalog: catalogRouter,
  departures: departuresRouter,
  profile: profileRouter,
};
export type AppRouter = typeof appRouter;
export type AppRouterClient = RouterClient<typeof appRouter>;
