import { createTRPCRouter, protectedProcedure } from "@/server/api/trpc";
import { getDashboardFormCardHandler } from "@/server/controller/dashboard.controller";

export const dashboardRouter = createTRPCRouter({
  getDashboardFormCard: protectedProcedure.query(({ ctx: { session } }) =>
    getDashboardFormCardHandler({ session })
  ),
});
