import { TRPCError } from "@trpc/server";
import { Prisma } from "@prisma/client";
import type { MakeOptional } from "@mui/x-charts/models/helpers";
import type { AxisConfig, LineSeriesType } from "@mui/x-charts";

type LineChartType = {
  series: MakeOptional<LineSeriesType, "type">[];
  xAxis?: MakeOptional<AxisConfig, "id">[] | undefined;
};

type LineChartReturnType = {
  status: string;
  data: {
    result: LineChartType;
  };
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
