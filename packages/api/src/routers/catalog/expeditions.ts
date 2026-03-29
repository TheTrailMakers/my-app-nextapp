import { getExpeditionBySlug, listExpeditions } from "../../queries/catalog";
import { publicProcedure } from "../../index";
import { slugInputSchema } from "../../schemas/catalog";

export const expeditionsRouter = {
  list: publicProcedure.handler(async () => {
    return listExpeditions();
  }),
  bySlug: publicProcedure.input(slugInputSchema).handler(async ({ input }) => {
    return getExpeditionBySlug(input.slug);
  }),
};
