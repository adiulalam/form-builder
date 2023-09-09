import { createTRPCRouter, protectedProcedure } from "@/server/api/trpc";
import { getPostsHandler } from "@/server/controller/form.controller";
import { sortByParams } from "@/server/schema/form.schema";

export const formRouter = createTRPCRouter({
  getPosts: protectedProcedure
    .input(sortByParams)
    .query(({ input }) => getPostsHandler({ sortByInput: input })),
});
