import { createTRPCRouter, protectedProcedure } from "@/server/api/trpc";
import {
  createFormHandler,
  getFormsHandler,
} from "@/server/controller/form.controller";
import { createFormSchema, sortByParams } from "@/server/schema/form.schema";

export const formRouter = createTRPCRouter({
  createForm: protectedProcedure
    .input(createFormSchema)
    .mutation(({ input }) => createFormHandler({ input })),
  getForms: protectedProcedure
    .input(sortByParams)
    .query(({ input }) => getFormsHandler({ input })),
});
