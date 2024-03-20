import { exampleRouter } from "@/server/api/routers/example";
import { createTRPCRouter } from "@/server/api/trpc";
import { formRouter } from "@/server/api/routers/form.routes";
import { questionRouter } from "./routers/question.routes";
import { optionRouter } from "./routers/option.routes";
import { logsRouter } from "./routers/logs.routes";
import { dashboardRouter } from "./routers/dashboard.routes";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  example: exampleRouter,
  form: formRouter,
  question: questionRouter,
  option: optionRouter,
  log: logsRouter,
  dashboard: dashboardRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
