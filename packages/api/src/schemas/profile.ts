import { z } from "zod";

const nullableTrimmedText = z
	.string()
	.trim()
	.max(200)
	.transform((value) => (value.length > 0 ? value : null))
	.nullable()
	.optional();

export const updateProfileInputSchema = z
	.object({
		firstName: nullableTrimmedText,
		lastName: nullableTrimmedText,
		phoneNumber: nullableTrimmedText,
		address: nullableTrimmedText,
		city: nullableTrimmedText,
		state: nullableTrimmedText,
		pincode: nullableTrimmedText,
	})
	.refine((value) => Object.keys(value).length > 0, {
		message: "At least one profile field must be provided.",
	});

export type UpdateProfileInput = z.infer<typeof updateProfileInputSchema>;