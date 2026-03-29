import { getSession, type AuthSession } from "@the-trail-makers/auth";
import type { Context as HonoContext } from "hono";

export interface CreateContextOptions {
  context: HonoContext;
}

export async function createContext({ context }: CreateContextOptions) {
  const request = context.req.raw;
  const session = await getSession(request.headers);
  return {
    headers: request.headers,
    request,
    session,
  };
}

export type Context = Awaited<ReturnType<typeof createContext>>;
export type Session = AuthSession;
