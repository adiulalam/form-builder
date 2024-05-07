import { TRPCError } from "@trpc/server";
import { Prisma } from "@prisma/client";
import type { MakeOptional } from "@mui/x-charts/models/helpers";
import type { AxisConfig, ScatterSeriesType } from "@mui/x-charts";
import { type Session } from "next-auth";
import { prisma } from "../db";
import {
  currentMonthName,
  generateDaysDetailsForCurrentMonth,
} from "@/utils/helperFunctions";

type ScatterChartType = {
  series: MakeOptional<ScatterSeriesType, "type">[];
  xAxis?: MakeOptional<AxisConfig, "id">[];
  yAxis?: MakeOptional<AxisConfig, "id">[];
};

type ScatterChartReturnType = {
  status: string;
  data: {
    result: ScatterChartType;
  };
};

export const getDashboardMonthlyInteractionFormsHandler = async ({
  session,
}: {
  session: Session;
}): Promise<ScatterChartReturnType> => {
  try {
    const userId = session.user.id;
    const daysArray = generateDaysDetailsForCurrentMonth();

    const queries = daysArray.map((days) =>
      prisma.submission.count({
        where: {
          createdAt: {
            gte: new Date(days.start_time),
            lte: new Date(days.end_time),
          },
          form: {
            userId,
            status: "COMPLETED",
          },
        },
      })
    );
    const result = await prisma.$transaction(queries);

    const seriesData = daysArray.map(({ date, iso_date, index }) => ({
      x: date,
      y: result[index]!,
      id: iso_date,
    }));

    const data: ScatterChartType = {
      series: [
        {
          data: seriesData,
        },
      ],
      xAxis: [
        {
          data: seriesData.map((d) => d.x),
          label: currentMonthName,
          scaleType: "band",
        },
      ],
      yAxis: [{ label: "User Interacted Forms" }],
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

export const getDashboardScatterChartHandler = (): ScatterChartReturnType => {
  try {
    const getRandomNumber = () => Math.random() * 400 + 1;

    const lineChartData = [...Array(20).keys()].map((item) => ({
      id: item,
      x1: getRandomNumber(),
      x2: getRandomNumber(),
      y1: getRandomNumber(),
      y2: getRandomNumber(),
    }));

    const data: ScatterChartType = {
      series: [
        {
          label: "Series A",
          data: lineChartData.map((v) => ({ x: v.x1, y: v.y1, id: v.id })),
        },
        {
          label: "Series B",
          data: lineChartData.map((v) => ({ x: v.x1, y: v.y2, id: v.id })),
        },
      ],
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
