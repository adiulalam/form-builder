import { TRPCError } from "@trpc/server";
import { prisma } from "../db";
import { Prisma } from "@prisma/client";
import { type Session } from "next-auth";
import type { MakeOptional } from "@mui/x-charts/models/helpers";
import type { AxisConfig, PieSeriesType, PieValueType } from "@mui/x-charts";
import { Status } from "@prisma/client";

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

export const getDashboarFormsTypeHandler = async ({
  session,
}: {
  session: Session;
}): Promise<PieChartReturnType> => {
  try {
    const userId = session.user.id;
    const statuses = [Status.COMPLETED, Status.DRAFT];

    const queries = statuses.map((status) =>
      prisma.form.count({
        where: {
          userId,
          status,
        },
      })
    );

    const result = await prisma.$transaction(queries);

    const seriesData = result.map((value, index) => ({
      value,
      id: index,
      label: statuses[index],
    }));

    const data: PieChartType = {
      series: [
        {
          data: seriesData,
          highlightScope: { faded: "global", highlighted: "item" },
          faded: { innerRadius: 30, additionalRadius: -30, color: "gray" },
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
