import { createTRPCRouter, protectedProcedure } from "@/server/api/trpc";
import {
  getLogsHandler,
  getSearchLogsHandler,
} from "@/server/controller/log.controller";
import { readAllSchema, searchAllSchema } from "@/server/schema/form.schema";

export const logsRouter = createTRPCRouter({
  getLogs: protectedProcedure
    .input(readAllSchema)
    .query(({ input, ctx: { session } }) => getLogsHandler({ session, input })),
  getSearchLogs: protectedProcedure
    .input(searchAllSchema)
    .query(({ input, ctx: { session } }) =>
      getSearchLogsHandler({ session, input })
    ),
});
