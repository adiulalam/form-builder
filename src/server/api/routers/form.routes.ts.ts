import { createTRPCRouter, protectedProcedure } from "@/server/api/trpc";
import { getPostsHandler } from "@/server/controller/form.controller";
import { params } from "@/server/schema/form.schema";

export const formRouter = createTRPCRouter({
  getPosts: protectedProcedure
    .input(params)
    .query(({ input }) => getPostsHandler({ paramsInput: input })),
});
