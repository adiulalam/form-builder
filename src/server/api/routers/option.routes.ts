import { createTRPCRouter, protectedProcedure } from "@/server/api/trpc";
import {
  createOptionHandler,
  deleteOptionHandler,
} from "@/server/controller/option.controller";
import { createOptionSchema, params } from "@/server/schema/option.schema";

export const optionRouter = createTRPCRouter({
  createOption: protectedProcedure
    .input(createOptionSchema)
    .mutation(({ input, ctx: { session } }) =>
      createOptionHandler({ session, input }),
    ),
  deleteOption: protectedProcedure
    .input(params)
    .mutation(({ input, ctx: { session } }) =>
      deleteOptionHandler({ session, input }),
    ),
});
