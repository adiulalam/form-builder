import { createTRPCRouter, protectedProcedure } from "@/server/api/trpc";
import {
  createQuestionHandler,
  updateQuestionOrderHandler,
  updateQuestionTitleHandler,
} from "@/server/controller/question.controller";
import {
  createQuestionSchema,
  updateQuestionOrderSchema,
  updateQuestionTitleSchema,
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
});
