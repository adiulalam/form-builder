import type { RouterOutputs } from "@/utils/api";
import type {
  QueryObserverResult,
  RefetchOptions,
  RefetchQueryFilters,
} from "@tanstack/react-query";

type ChartTypeToRouterType = {
  barchart: {
    type: "dashboardBarChart";
    route: keyof RouterOutputs["dashboardBarChart"];
  };
  piechart: {
    type: "dashboardPieChart";
    route: keyof RouterOutputs["dashboardPieChart"];
  };
  linechart: {
    type: "dashboardLineChart";
    route: keyof RouterOutputs["dashboardLineChart"];
  };
  scatterchart: {
    type: "dashboardScatterChart";
    route: keyof RouterOutputs["dashboardScatterChart"];
  };
};

type RouteType<T extends keyof ChartTypeToRouterType> = {
  type: ChartTypeToRouterType[T]["type"];
  route: ChartTypeToRouterType[T]["route"];
};

export type DashboardChartHookType =
  | RouteType<"barchart">
  | RouteType<"piechart">
  | RouteType<"linechart">
  | RouteType<"scatterchart">;

export type DashboardSkeletonProps = {
  isLoading: boolean;
  isError: boolean;
  isRefetching?: boolean;
  refetch?: <TPageData>(
    options?: RefetchOptions & RefetchQueryFilters<TPageData>
  ) => Promise<QueryObserverResult<unknown, unknown>>;
  className?: React.HTMLAttributes<HTMLDivElement>["className"];
};

export type DashboardCardRoute = keyof RouterOutputs["dashboardCard"];
