import { z } from "zod";

export const departureIdInputSchema = z.object({
	departureId: z.string().min(1),
});