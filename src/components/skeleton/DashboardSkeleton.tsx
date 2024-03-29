import {
  CircularProgress,
  IconButton,
  Paper,
  Skeleton,
  Tooltip,
} from "@mui/material";
import { Refresh as RefreshIcon } from "@mui/icons-material";
import clsx from "clsx";
import type { DashboardSkeletonProps } from "@/types/Dashboard.types";

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
      className={clsx(className, "flex items-center justify-center")}
      elevation={isLoading ? 0 : 6}
    >
      {isLoading && (
        <Skeleton
          variant="rectangular"
          animation="wave"
          height="100%"
          width="100%"
          className={clsx(
            "after:bg-gradient-to-r from-transparent via-neutral-400 to-transparent",
            "dark:after:bg-gradient-to-r dark:from-transparent dark:via-neutral-800 dark:to-transparent"
          )}
        />
      )}

      {isError && !isLoading && (
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
