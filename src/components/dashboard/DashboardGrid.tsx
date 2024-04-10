import { Box } from "@mui/material";
import clsx from "clsx";
import type { ReactNode } from "react";

type DashboardGridProps = {
  children: ReactNode;
  maxCols: number;
  className?: React.HTMLAttributes<HTMLDivElement>["className"];
};

export const DashboardGrid = ({
  children,
  maxCols,
  className,
}: DashboardGridProps) => {
  const colsMap = {
    1: "grid-cols-1",
    2: "grid-cols-2 md:grid-cols-1",
    3: "md:grid-cols-3 sm:grid-cols-2 grid-cols-1",
  } as Record<number, string>;

  return (
    <Box
      className={clsx(
        "grid gap-2 w-full h-[44rem] sm:h-[40rem] md:h-[24rem]",
        colsMap[maxCols],
        className
      )}
      maxWidth="xl"
    >
      {children}
    </Box>
  );
};
