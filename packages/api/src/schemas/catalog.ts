import { z } from "zod";

export const trekListSortBySchema = z.enum([
  "popular",
  "name",
  "difficulty",
  "duration",
  "state",
  "distance",
  "earliest",
]);

export const trekListSortOrderSchema = z.enum(["asc", "desc"]);

export const listTreksQuerySchema = z.object({
  state: z.string().optional(),
  difficulty: z
    .enum(["EASY", "EASY_MODERATE", "MODERATE", "HARD", "VERY_HARD"])
    .optional(),
  sortBy: trekListSortBySchema.optional(),
  sortOrder: trekListSortOrderSchema.optional(),
  minPrice: z.number().int().optional(),
  maxPrice: z.number().int().optional(),
  page: z.number().int().positive().default(1),
  limit: z.number().int().positive().max(100).default(10),
});

export const slugInputSchema = z.object({
  slug: z.string().min(1),
});

export type ListTreksQuery = z.infer<typeof listTreksQuerySchema>;
