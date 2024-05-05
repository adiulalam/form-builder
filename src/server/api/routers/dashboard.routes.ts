import { createTRPCRouter, protectedProcedure } from "@/server/api/trpc";
import {
  getDashboardFormCardHandler,
  getDashboardQuestionCardHandler,
} from "@/server/controller/dashboard.controller";
import {
  getDashboardBarChartHandler,
  getDashboardMonthlyFormsHandler,
} from "@/server/controller/dashboardBarChart.controller";
import {
  getDashboardLineChartHandler,
  getDashboardMonthlySubmittedFormsHandler,
} from "@/server/controller/dashboardLineChart.controller";
import {
  getDashboarFormsTypeHandler,
  getDashboardPieChartHandler,
} from "@/server/controller/dashboardPieChart.controller";
import { getDashboardScatterChartHandler } from "@/server/controller/dashboardScatterChart.controller";

export const dashboardCardRouter = createTRPCRouter({
  getDashboardFormCard: protectedProcedure.query(({ ctx: { session } }) =>
    getDashboardFormCardHandler({ session })
  ),
  getDashboardQuestionCard: protectedProcedure.query(({ ctx: { session } }) =>
    getDashboardQuestionCardHandler({ session })
  ),
});

export const dashboardBarChartRouter = createTRPCRouter({
  getDashboardBarChart: protectedProcedure.query(() =>
    getDashboardBarChartHandler()
  ),
  getDashboardMonthlyForms: protectedProcedure.query(({ ctx: { session } }) =>
    getDashboardMonthlyFormsHandler({ session })
  ),
});

export const dashboardPieChartRouter = createTRPCRouter({
  getDashboardPieChart: protectedProcedure.query(() =>
    getDashboardPieChartHandler()
  ),
  getDashboardFormsType: protectedProcedure.query(({ ctx: { session } }) =>
    getDashboarFormsTypeHandler({ session })
  ),
});

export const dashboardLineChartRouter = createTRPCRouter({
  getDashboardLineChart: protectedProcedure.query(() =>
    getDashboardLineChartHandler()
  ),
  getDashboardMonthlySubmittedForms: protectedProcedure.query(
    ({ ctx: { session } }) =>
      getDashboardMonthlySubmittedFormsHandler({ session })
  ),
});

export const dashboardScatterChartRouter = createTRPCRouter({
  getDashboardScatterChart: protectedProcedure.query(() =>
    getDashboardScatterChartHandler()
  ),
});
