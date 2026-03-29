import { listFaqs } from "../../queries/catalog";
import { publicProcedure } from "../../index";

export const faqsRouter = {
  list: publicProcedure.handler(async () => {
    return listFaqs();
  }),
};
