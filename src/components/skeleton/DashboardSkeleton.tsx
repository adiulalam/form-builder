import {
  CircularProgress,
  IconButton,
  Paper,
  Skeleton,
  Tooltip,
} from "@mui/material";
import { Refresh as RefreshIcon } from "@mui/icons-material";
import type {
  QueryObserverResult,
  RefetchOptions,
  RefetchQueryFilters,
} from "@tanstack/react-query";

type DashboardSkeletonProps = {
  isLoading: boolean;
  isError: boolean;
  isRefetching?: boolean;
  refetch?: <TPageData>(
    options?: RefetchOptions & RefetchQueryFilters<TPageData>
  ) => Promise<QueryObserverResult<unknown, unknown>>;
  className?: React.HTMLAttributes<HTMLDivElement>["className"];
};

export const DashboardSkeleton = ({
  isLoading,
  isError,
  isRefetching,
  refetch,
  className = "",
}: DashboardSkeletonProps) => {
  const onClickHandler = () => {
    refetch && void refetch();
  };

  return (
    <Paper
      className={`flex items-center justify-center ${className}`}
      elevation={isLoading ? 0 : 6}
    >
      {isLoading && (
        <Skeleton
          variant="rectangular"
          animation="wave"
          height="100%"
          width="100%"
        />
      )}

      {isError && (
        <Tooltip
          title={isRefetching ? "Refetching.." : "Retry"}
          placement="top"
        >
          <span>
            <IconButton onClick={onClickHandler} disabled={isRefetching}>
              {isRefetching ? (
                <CircularProgress />
              ) : (
                <RefreshIcon fontSize="large" />
              )}
            </IconButton>
          </span>
        </Tooltip>
      )}
    </Paper>
  );
};
