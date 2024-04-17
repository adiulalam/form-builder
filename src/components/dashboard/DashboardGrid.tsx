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
    1: "grid-cols-1 h-[20rem]",
    2: "grid-cols-1 md:grid-cols-2 h-[40rem] md:h-[20rem]",
    3: "grid-cols-1 md:grid-cols-3 h-[60rem] md:h-[20rem]",
  } as Record<number, string>;

  return (
    <Box
      className={clsx("grid gap-2 w-full", colsMap[maxCols], className)}
      maxWidth="xl"
    >
      {children}
    </Box>
  );
};
