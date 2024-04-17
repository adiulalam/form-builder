import { PieChart } from "@mui/x-charts";
import { Paper } from "@mui/material";
import { api } from "@/utils/api";
import type { RouterOutputs } from "@/utils/api";
import { DashboardSkeleton } from "../../skeleton";

type PieChartType = {
  route: keyof RouterOutputs["dashboardPieChart"];
};

type PieChartDataType =
  typeof api.dashboardPieChart.getDashboardPieChart.useQuery;

export const DashboardPieChart = ({ route }: PieChartType) => {
  const { data, isError, isLoading, refetch, isRefetching } = (
    api.dashboardPieChart[route].useQuery as PieChartDataType
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
      <PieChart
        series={data?.data.result.series}
        xAxis={data?.data.result.xAxis}
      />
    </Paper>
  );
};
