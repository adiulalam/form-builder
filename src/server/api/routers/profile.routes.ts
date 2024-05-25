import { createTRPCRouter, protectedProcedure } from "@/server/api/trpc";
import {
  getProfileHandler,
  updateProfileHandler,
} from "@/server/controller/profile.controller";
import { updateProfileSchema } from "@/server/schema/profile.schema";

export const profileRouter = createTRPCRouter({
  getProfile: protectedProcedure.query(({ ctx: { session } }) =>
    getProfileHandler({ session })
  ),
  updateProfile: protectedProcedure
    .input(updateProfileSchema)
    .query(({ input, ctx: { session } }) =>
      updateProfileHandler({ session, input })
    ),
});
