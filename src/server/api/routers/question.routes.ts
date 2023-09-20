import { createTRPCRouter, protectedProcedure } from "@/server/api/trpc";
import {
  createQuestionHandler,
  updateQuestionTitleHandler,
} from "@/server/controller/question.controller";
import {
  createQuestionSchema,
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
});
