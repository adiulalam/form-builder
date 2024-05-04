import { TRPCError } from "@trpc/server";
import type { MakeOptional } from "@mui/x-charts/models/helpers";
import type { AxisConfig, BarSeriesType } from "@mui/x-charts";
import { generateMonthDetailsArray } from "@/utils/helperFunctions";
import { prisma } from "../db";
import { Prisma } from "@prisma/client";
import { type Session } from "next-auth";

type BarChartType = {
  series: MakeOptional<BarSeriesType, "type">[];
  xAxis?: MakeOptional<AxisConfig, "id">[];
  yAxis?: MakeOptional<AxisConfig, "id">[];
};

type BarChartReturnType = {
  status: string;
  data: {
    result: BarChartType;
  };
};

export const getDashboardMonthlyFormsHandler = async ({
  session,
}: {
  session: Session;
}): Promise<BarChartReturnType> => {
  try {
    const userId = session.user.id;
    const monthsArray = generateMonthDetailsArray();

    const queries = monthsArray.map((month) =>
      prisma.form.count({
        where: {
          userId,
          createdAt: {
            gte: new Date(month.iso_start_date),
            lte: new Date(month.iso_end_date),
          },
        },
      })
    );

    const result = await prisma.$transaction(queries);
    const months = monthsArray.map(({ short_month }) => short_month);

    const data: BarChartType = {
      series: [{ data: result }],
      xAxis: [
        {
          data: months,
          label: "Month",
          scaleType: "band",
        },
      ],
      yAxis: [{ label: "Number of forms" }],
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

export const getDashboardBarChartHandler = (): BarChartReturnType => {
  try {
    const data: BarChartType = {
      series: [
        { data: [35, 44, 24, 34] },
        { data: [51, 6, 49, 30] },
        { data: [15, 25, 30, 50] },
        { data: [60, 50, 15, 25] },
      ],
      xAxis: [
        {
          data: ["Q1", "Q2", "Q3", "Q4"],
          label: "Yearly Quaters",
          scaleType: "band",
        },
      ],
      yAxis: [{ label: "Yearly Revenue" }],
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
