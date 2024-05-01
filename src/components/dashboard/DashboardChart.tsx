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

export const DashboardChart = ({
  route,
  type,
  sx = {},
}: DashboardChartType) => {
  const { data, isError, isLoading, refetch, isRefetching } = useDashboardChart(
    {
      route,
      type,
    } as DashboardChartHookType
  );

  const props = {
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
      {type === "dashboardBarChart" && (
        <BarChart {...(props as BarChartProps)} />
      )}
      {type === "dashboardPieChart" && (
        <PieChart {...(props as PieChartProps)} />
      )}
      {type === "dashboardLineChart" && (
        <LineChart {...(props as LineChartProps)} />
      )}
      {type === "dashboardScatterChart" && (
        <ScatterChart {...(props as ScatterChartProps)} />
      )}
    </Paper>
  );
};
