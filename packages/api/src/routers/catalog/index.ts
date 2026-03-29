import { coursesRouter } from "./courses";
import { expeditionsRouter } from "./expeditions";
import { faqsRouter } from "./faqs";
import { treksRouter } from "./treks";

export const catalogRouter = {
  treks: treksRouter,
  expeditions: expeditionsRouter,
  courses: coursesRouter,
  faqs: faqsRouter,
};
