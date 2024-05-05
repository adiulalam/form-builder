import { TRPCError } from "@trpc/server";
import { Prisma, Status } from "@prisma/client";
import type { MakeOptional } from "@mui/x-charts/models/helpers";
import type { AxisConfig, LineSeriesType } from "@mui/x-charts";
import { generateMonthDetailsArray } from "@/utils/helperFunctions";
import { type Session } from "next-auth";
import { prisma } from "../db";

type LineChartType = {
  series: MakeOptional<LineSeriesType, "type">[];
  xAxis?: MakeOptional<AxisConfig, "id">[];
  yAxis?: MakeOptional<AxisConfig, "id">[];
};

type LineChartReturnType = {
  status: string;
  data: {
    result: LineChartType;
  };
};

export const getDashboardMonthlySubmittedFormsHandler = async ({
  session,
}: {
  session: Session;
}): Promise<LineChartReturnType> => {
  try {
    const userId = session.user.id;
    const monthsArray = generateMonthDetailsArray();

    const completedQueries = monthsArray.map((month) =>
      prisma.submission.count({
        where: {
          userId,
          status: "COMPLETED",
          createdAt: {
            gte: new Date(month.iso_start_date),
            lte: new Date(month.iso_end_date),
          },
        },
      })
    );
    const completedResult = await prisma.$transaction(completedQueries);

    const draftQueries = monthsArray.map((month) =>
      prisma.submission.count({
        where: {
          userId,
          status: "DRAFT",
          createdAt: {
            gte: new Date(month.iso_start_date),
            lte: new Date(month.iso_end_date),
          },
        },
      })
    );
    const draftResult = await prisma.$transaction(draftQueries);

    const months = monthsArray.map(({ short_month }) => short_month);

    const data: LineChartType = {
      series: [
        { data: completedResult, label: Status.COMPLETED },
        { data: draftResult, label: Status.DRAFT },
      ],
      xAxis: [
        {
          data: months,
          label: "Month",
          scaleType: "band",
        },
      ],
      yAxis: [{ label: "Submitted Forms" }],
    };

    return {
      status: "success",
      data: {
        result: data,
      },
    };
  } catch (err) {
    if (err instanceof Prisma.PrismaClientKnownRequestError) {
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: err.message,
      });
    }
    throw err;
  }
};

export const getDashboardLineChartHandler = (): LineChartReturnType => {
  try {
    const data: LineChartType = {
      series: [
        {
          data: [2, 5.5, 2, 8.5, 1.5, 5],
        },
      ],
      xAxis: [{ data: [1, 2, 3, 5, 8, 10] }],
    };

    return {
      status: "success",
      data: {
        result: data,
      },
    };
  } catch (err) {
    if (err instanceof Prisma.PrismaClientKnownRequestError) {
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: err.message,
      });
    }
    throw err;
  }
};
