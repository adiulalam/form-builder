import { createTRPCRouter, protectedProcedure } from "@/server/api/trpc";
import {
  createOptionHandler,
  createOrDeleteIsOtherOptionHandler,
  deleteAllOptionsHandler,
  deleteOptionHandler,
} from "@/server/controller/option.controller";
import {
  createOptionSchema,
  createOrDeleteSchema,
  params,
} from "@/server/schema/option.schema";

export const optionRouter = createTRPCRouter({
  createOption: protectedProcedure
    .input(createOptionSchema)
    .mutation(({ input, ctx: { session } }) =>
      createOptionHandler({ session, input }),
    ),
  createOrDeleteOption: protectedProcedure
    .input(createOrDeleteSchema)
    .mutation(({ input, ctx: { session } }) =>
      createOrDeleteIsOtherOptionHandler({ session, input }),
    ),
  deleteOption: protectedProcedure
    .input(params)
    .mutation(({ input, ctx: { session } }) =>
      deleteOptionHandler({ session, input }),
    ),
  deleteAllOptions: protectedProcedure
    .input(params)
    .mutation(({ input, ctx: { session } }) =>
      deleteAllOptionsHandler({ session, input }),
    ),
});
