import { createTRPCRouter, protectedProcedure } from "@/server/api/trpc";
import {
  SubmitFormHandler,
  createFormHandler,
  deleteFormHandler,
  getFormsHandler,
  getPrivateFormHandler,
  getPublicFormHandler,
  getSearchFormsHandler,
  updateFormFavouriteHandler,
  updateFormShareHandler,
  updateFormStatusHandler,
  updateFormTitleHandler,
} from "@/server/controller/form.controller";
import {
  createFormSchema,
  params,
  readAllSchema,
  searchAllSchema,
  submitFormSchema,
  updateFormFavouriteSchema,
  updateFormShareSchema,
  updateFormStatusSchema,
  updateFormTitleSchema,
} from "@/server/schema/form.schema";

export const formRouter = createTRPCRouter({
  submitForm: protectedProcedure
    .input(submitFormSchema)
    .mutation(({ input, ctx: { session } }) =>
      SubmitFormHandler({ session, input }),
    ),
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
  updateFormShare: protectedProcedure
    .input(updateFormShareSchema)
    .mutation(({ input, ctx: { session } }) =>
      updateFormShareHandler({
        session,
        paramsInput: input.params,
        input: input.body,
      }),
    ),
  updateFormStatus: protectedProcedure
    .input(updateFormStatusSchema)
    .mutation(({ input, ctx: { session } }) =>
      updateFormStatusHandler({
        session,
        paramsInput: input.params,
        input: input.body,
      }),
    ),
  updateFormTitle: protectedProcedure
    .input(updateFormTitleSchema)
    .mutation(({ input, ctx: { session } }) =>
      updateFormTitleHandler({
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
