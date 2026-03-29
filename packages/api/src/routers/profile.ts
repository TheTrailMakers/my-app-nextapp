import { protectedProcedure } from "../index";
import { getProfileForUser, updateProfileForUser } from "../queries/profile";
import { updateProfileInputSchema } from "../schemas/profile";

export const profileRouter = {
  me: protectedProcedure.handler(async ({ context }) => {
    return getProfileForUser(context.user.id);
  }),
  update: protectedProcedure
    .input(updateProfileInputSchema)
    .handler(async ({ context, input }) => {
      return updateProfileForUser(context.user.id, input);
    }),
};
