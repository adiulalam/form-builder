import { BarChart } from "@mui/x-charts";
import { Paper } from "@mui/material";
import { api } from "@/utils/api";
import type { RouterOutputs } from "@/utils/api";
import { DashboardSkeleton } from "../../skeleton";

type BarChartType = {
  route: keyof RouterOutputs["dashboardBarChart"];
};

type BarChartDataType =
  typeof api.dashboardBarChart.getDashboardBarChart.useQuery;

export const DashboardBarChart = ({ route }: BarChartType) => {
  const { data, isError, isLoading, refetch, isRefetching } = (
    api.dashboardBarChart[route].useQuery as BarChartDataType
  )();

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
      <BarChart
        series={data?.data.result.series}
        xAxis={data?.data.result.xAxis}
      />
    </Paper>
  );
};
