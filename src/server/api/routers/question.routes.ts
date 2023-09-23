import { createTRPCRouter, protectedProcedure } from "@/server/api/trpc";
import {
  createQuestionHandler,
  deleteQuestionHandler,
  updateQuestionOrderHandler,
  updateQuestionShowInputHandler,
  updateQuestionTitleHandler,
  updateQuestionTypeHandler,
} from "@/server/controller/question.controller";
import {
  createQuestionSchema,
  params,
  updateQuestionOrderSchema,
  updateQuestionShowInputSchema,
  updateQuestionTitleSchema,
  updateQuestionTypeSchema,
} from "@/server/schema/question.schema";

export const questionRouter = createTRPCRouter({
  createQuestion: protectedProcedure
    .input(createQuestionSchema)
    .mutation(({ input, ctx: { session } }) =>
      createQuestionHandler({ session, input }),
    ),
  updateQuestionTitle: protectedProcedure
    .input(updateQuestionTitleSchema)
    .mutation(({ input, ctx: { session } }) =>
      updateQuestionTitleHandler({
        session,
        paramsInput: input.params,
        input: input.body,
      }),
    ),
  updateQuestionOrder: protectedProcedure
    .input(updateQuestionOrderSchema)
    .mutation(({ input, ctx: { session } }) =>
      updateQuestionOrderHandler({
        session,
        input,
      }),
    ),
  updateQuestionType: protectedProcedure
    .input(updateQuestionTypeSchema)
    .mutation(({ input, ctx: { session } }) =>
      updateQuestionTypeHandler({
        session,
        paramsInput: input.params,
        input: input.body,
      }),
    ),
  updateQuestionShowInput: protectedProcedure
    .input(updateQuestionShowInputSchema)
    .mutation(({ input, ctx: { session } }) =>
      updateQuestionShowInputHandler({
        session,
        paramsInput: input.params,
        input: input.body,
      }),
    ),
  deleteQuestion: protectedProcedure
    .input(params)
    .mutation(({ input, ctx: { session } }) =>
      deleteQuestionHandler({ session, input }),
    ),
});
