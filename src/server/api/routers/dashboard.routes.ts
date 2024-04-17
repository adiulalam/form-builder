import { createTRPCRouter, protectedProcedure } from "@/server/api/trpc";
import {
  getDashboardFormCardHandler,
  getDashboardQuestionCardHandler,
} from "@/server/controller/dashboard.controller";
import { getDashboardBarChartHandler } from "@/server/controller/dashboardBarChart.controller";
import { getDashboardLineChartHandler } from "@/server/controller/dashboardLineChart.controller";
import { getDashboardPieChartHandler } from "@/server/controller/dashboardPieChart.controller";
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
});

export const dashboardPieChartRouter = createTRPCRouter({
  getDashboardPieChart: protectedProcedure.query(() =>
    getDashboardPieChartHandler()
  ),
});

export const dashboardLineChartRouter = createTRPCRouter({
  getDashboardLineChart: protectedProcedure.query(() =>
    getDashboardLineChartHandler()
  ),
});

export const dashboardScatterChartRouter = createTRPCRouter({
  getDashboardScatterChart: protectedProcedure.query(() =>
    getDashboardScatterChartHandler()
  ),
});
