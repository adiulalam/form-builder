import { BarChart } from "@mui/x-charts";
import { Paper } from "@mui/material";
import { api } from "@/utils/api";
import type { RouterOutputs } from "@/utils/api";
import type { Theme } from "@mui/material";
import { DashboardSkeleton } from "../../skeleton";
import { chartLegendStyle } from "@/utils/themeColors";
import type { SystemStyleObject } from "@mui/system";

type BarChartType = {
  route: keyof RouterOutputs["dashboardBarChart"];
  sx?: SystemStyleObject<Theme>;
};

export const DashboardBarChart = ({ route, sx = {} }: BarChartType) => {
  route = route as "getDashboardBarChart";
  const { data, isError, isLoading, refetch, isRefetching } =
    api.dashboardBarChart[route].useQuery();

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
        sx={[chartLegendStyle, sx]}
      />
    </Paper>
  );
};
