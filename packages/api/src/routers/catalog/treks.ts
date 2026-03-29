import { z } from "zod";

import {
  getAvailableStates,
  getTrekBySlug,
  listTreks,
} from "../../queries/catalog";
import { publicProcedure } from "../../index";
import { listTreksQuerySchema, slugInputSchema } from "../../schemas/catalog";

export const treksRouter = {
  list: publicProcedure
    .input(listTreksQuerySchema.optional())
    .handler(async ({ input }) => {
      return listTreks(input ?? listTreksQuerySchema.parse({}));
    }),
  bySlug: publicProcedure.input(slugInputSchema).handler(async ({ input }) => {
    return getTrekBySlug(input.slug);
  }),
  availableStates: publicProcedure.handler(async () => {
    return getAvailableStates();
  }),
};
