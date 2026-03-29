import { publicProcedure } from "../index";
import { getDepartureAvailability } from "../queries/departures";
import { departureIdInputSchema } from "../schemas/departures";

export const departuresRouter = {
  availability: publicProcedure
    .input(departureIdInputSchema)
    .handler(async ({ input }) => {
      return getDepartureAvailability(input.departureId);
    }),
};
