import { ScatterChart } from "@mui/x-charts";
import { Paper } from "@mui/material";
import { api } from "@/utils/api";
import type { RouterOutputs } from "@/utils/api";
import { DashboardSkeleton } from "../../skeleton";
import type { SxProps, Theme } from "@mui/material";
import { chartLegendStyle } from "@/utils/themeColors";

type ScatterChartType = {
  route: keyof RouterOutputs["dashboardScatterChart"];
  sx?: SxProps<Theme>;
};

export const DashboardScatterChart = ({ route, sx }: ScatterChartType) => {
  route = route as "getDashboardScatterChart";
  const { data, isError, isLoading, refetch, isRefetching } =
    api.dashboardScatterChart[route].useQuery();

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
        sx={{ ...(theme) => chartLegendStyle(theme), ...sx }}
      />
    </Paper>
  );
};
