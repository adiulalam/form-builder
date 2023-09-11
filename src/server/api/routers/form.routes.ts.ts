import { createTRPCRouter, protectedProcedure } from "@/server/api/trpc";
import {
  createFormHandler,
  getFormsHandler,
  updateFormFavouriteHandler,
} from "@/server/controller/form.controller";
import {
  createFormSchema,
  readAllSchema,
  updateFormFavouriteSchema,
} from "@/server/schema/form.schema";

export const formRouter = createTRPCRouter({
  createForm: protectedProcedure
    .input(createFormSchema)
    .mutation(({ input, ctx: { session } }) =>
      createFormHandler({ session, input }),
    ),
  updateFormFavourite: protectedProcedure
    .input(updateFormFavouriteSchema)
    .mutation(({ input, ctx: { session } }) =>
      updateFormFavouriteHandler({
        session,
        paramsInput: input.params,
        input: input.body,
      }),
    ),
  getForms: protectedProcedure
    .input(readAllSchema)
    .query(({ input, ctx: { session } }) =>
      getFormsHandler({ session, input }),
    ),
});
