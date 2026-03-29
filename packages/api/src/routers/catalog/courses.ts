import { getCourseBySlug, listCourses } from "../../queries/catalog";
import { publicProcedure } from "../../index";
import { slugInputSchema } from "../../schemas/catalog";

export const coursesRouter = {
  list: publicProcedure.handler(async () => {
    return listCourses();
  }),
  bySlug: publicProcedure.input(slugInputSchema).handler(async ({ input }) => {
    return getCourseBySlug(input.slug);
  }),
};
