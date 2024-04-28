import { LineChart } from "@mui/x-charts";
import { Paper } from "@mui/material";
import { api } from "@/utils/api";
import type { RouterOutputs } from "@/utils/api";
import { DashboardSkeleton } from "../../skeleton";
import type { Theme } from "@mui/material";
import { chartLegendStyle } from "@/utils/themeColors";
import type { SystemStyleObject } from "@mui/system";

type LineChartType = {
  route: keyof RouterOutputs["dashboardLineChart"];
  sx?: SystemStyleObject<Theme>;
};

export const DashboardLineChart = ({ route, sx = {} }: LineChartType) => {
  route = route as "getDashboardLineChart";
  const { data, isError, isLoading, refetch, isRefetching } =
    api.dashboardLineChart[route].useQuery();

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
      <LineChart
        series={data?.data.result.series}
        xAxis={data?.data.result.xAxis}
        sx={[(theme) => chartLegendStyle(theme), sx]}
      />
    </Paper>
  );
};
