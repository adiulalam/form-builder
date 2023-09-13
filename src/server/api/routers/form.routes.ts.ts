import { createTRPCRouter, protectedProcedure } from "@/server/api/trpc";
import {
  createFormHandler,
  deleteFormHandler,
  getFormsHandler,
  getPrivateFormHandler,
  getPublicFormHandler,
  getSearchFormsHandler,
  updateFormFavouriteHandler,
} from "@/server/controller/form.controller";
import {
  createFormSchema,
  params,
  readAllSchema,
  searchAllSchema,
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
  getPrivateForm: protectedProcedure
    .input(params)
    .query(({ input, ctx: { session } }) =>
      getPrivateFormHandler({ session, input }),
    ),
  getPublicForm: protectedProcedure
    .input(params)
    .query(({ input }) => getPublicFormHandler({ input })),
  getSearchForms: protectedProcedure
    .input(searchAllSchema)
    .query(({ input, ctx: { session } }) =>
      getSearchFormsHandler({ session, input }),
    ),
  deleteForm: protectedProcedure
    .input(params)
    .mutation(({ input, ctx: { session } }) =>
      deleteFormHandler({ session, input }),
    ),
});
