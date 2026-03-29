import { ORPCError, os } from "@orpc/server";

import type { Context } from "./context";
import { assertActiveUser, assertRole, requireContextUser, type RequiredRole } from "./roles";

export const o = os.$context<Context>();

export const publicProcedure = o;

const requireAuth = o.middleware(async ({ context, next }) => {
	const user = assertActiveUser(requireContextUser(context.session));

	return next({
		context: {
			...context,
			session: context.session,
			user,
		},
	});
});

export const protectedProcedure = publicProcedure.use(requireAuth);

const requireRole = (requiredRole: RequiredRole) =>
	o.middleware(async ({ context, next }) => {
		const user = assertRole(
			assertActiveUser(requireContextUser(context.session)),
			requiredRole,
		);

		return next({
			context: {
				...context,
				session: context.session,
				user,
			},
		});
	});

export const moderatorProcedure = protectedProcedure.use(requireRole("MODERATOR"));
export const adminProcedure = protectedProcedure.use(requireRole("ADMIN"));
export const superAdminProcedure = protectedProcedure.use(requireRole("SUPER_ADMIN"));
