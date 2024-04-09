import type { RouterOutputs } from "@/utils/api";
import type {
  QueryObserverResult,
  RefetchOptions,
  RefetchQueryFilters,
} from "@tanstack/react-query";

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
