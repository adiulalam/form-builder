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
        <BarChart
          series={data?.data.result.series as BarChartProps["series"]}
          {...props}
        />
      )}
      {type === "dashboardPieChart" && (
        <PieChart
          series={data?.data.result.series as PieChartProps["series"]}
          {...props}
        />
      )}
      {type === "dashboardLineChart" && (
        <LineChart
          series={data?.data.result.series as LineChartProps["series"]}
          {...props}
        />
      )}
      {type === "dashboardScatterChart" && (
        <ScatterChart
          series={data?.data.result.series as ScatterChartProps["series"]}
          {...props}
        />
      )}
    </Paper>
  );
};
