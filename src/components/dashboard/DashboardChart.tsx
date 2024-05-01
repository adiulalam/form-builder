import { BarChart, LineChart, PieChart, ScatterChart } from "@mui/x-charts";
import type {
  BarChartProps,
  LineChartProps,
  PieChartProps,
  ScatterChartProps,
} from "@mui/x-charts";
import { Paper } from "@mui/material";
import { DashboardSkeleton } from "../skeleton";
import { chartLegendStyle } from "@/utils/themeColors";
import type {
  DashboardChartHookType,
  DashboardChartType,
} from "@/types/Dashboard.types";
import { useDashboardChart } from "@/hooks";

export const DashboardChart = ({ sx = {}, ...props }: DashboardChartType) => {
  const { data, isError, isLoading, refetch, isRefetching } = useDashboardChart(
    props as DashboardChartHookType
  );

  const params = {
    series: data?.data.result.series,
    xAxis: data?.data.result.xAxis,
    sx: [chartLegendStyle, sx],
  };

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
    <Paper variant="outlined" className="overflow-hidden">
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
