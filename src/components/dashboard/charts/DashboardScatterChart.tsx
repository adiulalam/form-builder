import { ScatterChart } from "@mui/x-charts";
import { Paper } from "@mui/material";
import { api } from "@/utils/api";
import type { RouterOutputs } from "@/utils/api";
import { DashboardSkeleton } from "../../skeleton";

type ScatterChartType = {
  route: keyof RouterOutputs["dashboardScatterChart"];
};

type ScatterChartDataType =
  typeof api.dashboardScatterChart.getDashboardScatterChart.useQuery;

export const DashboardScatterChart = ({ route }: ScatterChartType) => {
  const { data, isError, isLoading, refetch, isRefetching } = (
    api.dashboardScatterChart[route].useQuery as ScatterChartDataType
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
      <ScatterChart
        series={data?.data.result.series}
        xAxis={data?.data.result.xAxis}
      />
    </Paper>
  );
};
