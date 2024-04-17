import { TRPCError } from "@trpc/server";
import { Prisma } from "@prisma/client";
import type { MakeOptional } from "@mui/x-charts/models/helpers";
import type { AxisConfig, ScatterSeriesType } from "@mui/x-charts";

type ScatterChartType = {
  series: MakeOptional<ScatterSeriesType, "type">[];
  xAxis?: MakeOptional<AxisConfig, "id">[] | undefined;
};

type ScatterChartReturnType = {
  status: string;
  data: {
    result: ScatterChartType;
  };
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
