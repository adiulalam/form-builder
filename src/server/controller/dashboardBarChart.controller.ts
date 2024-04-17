import { TRPCError } from "@trpc/server";
import { Prisma } from "@prisma/client";
import type { MakeOptional } from "@mui/x-charts/models/helpers";
import type { AxisConfig, BarSeriesType } from "@mui/x-charts";

type BarChartType = {
  series: MakeOptional<BarSeriesType, "type">[];
  xAxis?: MakeOptional<AxisConfig, "id">[] | undefined;
};

type BarChartReturnType = {
  status: string;
  data: {
    result: BarChartType;
  };
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
      xAxis: [{ data: ["Q1", "Q2", "Q3", "Q4"], scaleType: "band" }],
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
