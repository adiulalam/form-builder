import { BarChart, LineChart, PieChart, ScatterChart } from "@mui/x-charts";
import type {
  BarChartProps,
  LineChartProps,
  PieChartProps,
  ScatterChartProps,
} from "@mui/x-charts";
import { Paper, Typography } from "@mui/material";
import { DashboardSkeleton } from "../skeleton";
import { chartLegendStyle } from "@/utils/themeColors";
import type { DashboardChartHookType } from "@/types/Dashboard.types";
import { useDashboardChart } from "@/hooks";
import type { Theme } from "@mui/material";
import type { SystemStyleObject } from "@mui/system";

type DashboardChartType = {
  sx?: SystemStyleObject<Theme>;
  title?: string;
} & DashboardChartHookType;

type ParamsType =
  | BarChartProps
  | PieChartProps
  | LineChartProps
  | ScatterChartProps;

export const DashboardChart = ({
  sx = {},
  title,
  ...props
}: DashboardChartType) => {
  const { data, isError, isLoading, refetch, isRefetching } = useDashboardChart(
    props as DashboardChartHookType
  );

  const params = {
    series: data?.data.result.series,
    xAxis: data?.data.result.xAxis,
    yAxis: data?.data.result.yAxis,
    sx: [chartLegendStyle, sx],
  } as ParamsType;

  if (isLoading || isError) {
    return (
      <DashboardSkeleton
        className="h-[20rem]"
        isLoading={isLoading}
        isError={isError}
        refetch={refetch}
        isRefetching={isRefetching}
      />
    );
  }

  return (
    <Paper
      variant="outlined"
      className="flex flex-col text-center overflow-hidden p-2 gap-2"
    >
      {title && <Typography variant="h5">{title}</Typography>}

      {props.type === "dashboardBarChart" && (
        <BarChart {...(params as BarChartProps)} />
      )}
      {props.type === "dashboardPieChart" && (
        <PieChart {...(params as PieChartProps)} />
      )}
      {props.type === "dashboardLineChart" && (
        <LineChart {...(params as LineChartProps)} />
      )}
      {props.type === "dashboardScatterChart" && (
        <ScatterChart {...(params as ScatterChartProps)} />
      )}
    </Paper>
  );
};
