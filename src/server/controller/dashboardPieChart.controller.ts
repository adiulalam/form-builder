import { TRPCError } from "@trpc/server";
import { Prisma } from "@prisma/client";
import type { MakeOptional } from "@mui/x-charts/models/helpers";
import type { AxisConfig, PieSeriesType, PieValueType } from "@mui/x-charts";

type PieChartType = {
  series: MakeOptional<
    PieSeriesType<MakeOptional<PieValueType, "id">>,
    "type"
  >[];
  xAxis?: MakeOptional<AxisConfig, "id">[];
  yAxis?: MakeOptional<AxisConfig, "id">[];
};

type PieChartReturnType = {
  status: string;
  data: {
    result: PieChartType;
  };
};

export const getDashboardPieChartHandler = (): PieChartReturnType => {
  try {
    const data: PieChartType = {
      series: [
        {
          data: [
            { id: 0, value: 10, label: "series A" },
            { id: 1, value: 15, label: "series B" },
            { id: 2, value: 20, label: "series C" },
          ],
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
