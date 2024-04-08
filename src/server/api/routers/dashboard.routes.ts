import { createTRPCRouter, protectedProcedure } from "@/server/api/trpc";
import {
  getDashboardFormCardHandler,
  getDashboardQuestionCardHandler,
} from "@/server/controller/dashboard.controller";

export const dashboardRouter = createTRPCRouter({
  getDashboardFormCard: protectedProcedure.query(({ ctx: { session } }) =>
    getDashboardFormCardHandler({ session })
  ),
  getDashboardQuestionCard: protectedProcedure.query(({ ctx: { session } }) =>
    getDashboardQuestionCardHandler({ session })
  ),
});
