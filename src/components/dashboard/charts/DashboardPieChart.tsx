import type { RouterOutputs } from "@/utils/api";
import type { SxProps, Theme } from "@mui/material";
import { PieChart } from "@mui/x-charts";
import { Paper } from "@mui/material";
import { api } from "@/utils/api";
import { DashboardSkeleton } from "../../skeleton";
import { chartLegendStyle } from "@/utils/themeColors";

type PieChartType = {
  route: keyof RouterOutputs["dashboardPieChart"];
  sx?: SxProps<Theme>;
};

export const DashboardPieChart = ({ route, sx }: PieChartType) => {
  route = route as "getDashboardPieChart";
  const { data, isError, isLoading, refetch, isRefetching } =
    api.dashboardPieChart[route].useQuery();

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
        sx={{ ...(theme) => chartLegendStyle(theme), ...sx }}
      />
    </Paper>
  );
};
