import { createTRPCRouter, protectedProcedure } from "@/server/api/trpc";
import { createQuestionHandler } from "@/server/controller/question.controller";
import { createQuestionSchema } from "@/server/schema/question.schema";

export const questionRouter = createTRPCRouter({
  createQuestion: protectedProcedure
    .input(createQuestionSchema)
    .mutation(({ input, ctx: { session } }) =>
      createQuestionHandler({ session, input }),
    ),
});
