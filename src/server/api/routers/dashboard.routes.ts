import { createTRPCRouter, protectedProcedure } from "@/server/api/trpc";
import {
  getDashboardAnswerCardHandler,
  getDashboardFormCardHandler,
  getDashboardQuestionCardHandler,
} from "@/server/controller/dashboardCard.controller";
import {
  getDashboardAnswersTypesHandler,
  getDashboardBarChartHandler,
  getDashboardMonthlyFormsHandler,
  getDashboardTypesInteractionQuestionsHandler,
} from "@/server/controller/dashboardBarChart.controller";
import {
  getDashboardLineChartHandler,
  getDashboardMonthlySubmittedFormsHandler,
} from "@/server/controller/dashboardLineChart.controller";
import {
  getDashboarFormsTypeHandler,
  getDashboardQuestionsTypeHandler,
  getDashboardPieChartHandler,
} from "@/server/controller/dashboardPieChart.controller";
import {
  getDashboardMonthlyInteractionFormsHandler,
  getDashboardScatterChartHandler,
} from "@/server/controller/dashboardScatterChart.controller";

export const dashboardCardRouter = createTRPCRouter({
  getDashboardFormCard: protectedProcedure.query(({ ctx: { session } }) =>
    getDashboardFormCardHandler({ session })
  ),
  getDashboardQuestionCard: protectedProcedure.query(({ ctx: { session } }) =>
    getDashboardQuestionCardHandler({ session })
  ),
  getDashboardAnswerCard: protectedProcedure.query(({ ctx: { session } }) =>
    getDashboardAnswerCardHandler({ session })
  ),
});

export const dashboardBarChartRouter = createTRPCRouter({
  getDashboardBarChart: protectedProcedure.query(() =>
    getDashboardBarChartHandler()
  ),
  getDashboardMonthlyForms: protectedProcedure.query(({ ctx: { session } }) =>
    getDashboardMonthlyFormsHandler({ session })
  ),
  getDashboardTypesInteractionQuestions: protectedProcedure.query(
    ({ ctx: { session } }) =>
      getDashboardTypesInteractionQuestionsHandler({ session })
  ),
  getDashboardAnswersTypes: protectedProcedure.query(({ ctx: { session } }) =>
    getDashboardAnswersTypesHandler({ session })
  ),
});

export const dashboardPieChartRouter = createTRPCRouter({
  getDashboardPieChart: protectedProcedure.query(() =>
    getDashboardPieChartHandler()
  ),
  getDashboardFormsType: protectedProcedure.query(({ ctx: { session } }) =>
    getDashboarFormsTypeHandler({ session })
  ),
  getDashboardQuestionsType: protectedProcedure.query(({ ctx: { session } }) =>
    getDashboardQuestionsTypeHandler({ session })
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
  getDashboardMonthlyInteractionForms: protectedProcedure.query(
    ({ ctx: { session } }) =>
      getDashboardMonthlyInteractionFormsHandler({ session })
  ),
  getDashboardTypesInteractionQuestions: protectedProcedure.query(
    ({ ctx: { session } }) =>
      getDashboardTypesInteractionQuestionsHandler({ session })
  ),
});
