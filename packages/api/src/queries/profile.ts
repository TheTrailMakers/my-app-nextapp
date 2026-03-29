import { ORPCError } from "@orpc/server";
import { db, eq } from "@the-trail-makers/db";
import { user } from "@the-trail-makers/db/schema/auth";

import type { UpdateProfileInput } from "../schemas/profile";

const profileFields = {
	id: user.id,
	email: user.email,
	username: user.username,
	firstName: user.firstName,
	lastName: user.lastName,
	phoneNumber: user.phoneNumber,
	address: user.address,
	city: user.city,
	state: user.state,
	pincode: user.pincode,
	role: user.role,
	updatedAt: user.updatedAt,
} as const;

function notFound(message: string) {
	return new ORPCError("NOT_FOUND", { message });
}

function serializeProfile(profile: {
	id: string;
	email: string;
	username: string;
	firstName: string | null;
	lastName: string | null;
	phoneNumber: string | null;
	address: string | null;
	city: string | null;
	state: string | null;
	pincode: string | null;
	role: string;
	updatedAt: Date | null;
}) {
	return {
		...profile,
		updatedAt: profile.updatedAt ? profile.updatedAt.toISOString() : null,
	};
}

export async function getProfileForUser(userId: string) {
	const users = await db
		.select(profileFields)
		.from(user)
		.where(eq(user.id, userId))
		.limit(1);

	const profile = users[0];

	if (!profile) {
		throw notFound("User not found.");
	}

	return serializeProfile(profile);
}

export async function updateProfileForUser(
	userId: string,
	input: UpdateProfileInput,
) {
	const users = await db
		.update(user)
		.set({
			...input,
			updatedAt: new Date(),
		})
		.where(eq(user.id, userId))
		.returning(profileFields);

	const profile = users[0];

	if (!profile) {
		throw notFound("User not found.");
	}

	return serializeProfile(profile);
}