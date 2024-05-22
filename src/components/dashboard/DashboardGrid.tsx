import { Box } from "@mui/material";
import clsx from "clsx";
import type { ReactNode } from "react";
import { Children } from "react";

type DashboardGridProps = {
  children: ReactNode;
  maxCols: 1 | 2 | 3;
  className?: React.HTMLAttributes<HTMLDivElement>["className"];
};

const colsMap = {
  1: "grid-cols-1 h-[20rem]",
  2: "grid-cols-1 md:grid-cols-2 h-[40rem] md:h-[20rem]",
  3: "grid-cols-1 md:grid-cols-3 h-[60rem] md:h-[20rem]",
} as const;

export const DashboardGrid = ({
  children,
  maxCols,
  className,
}: DashboardGridProps) => {
  const count = Children.count(children);
  if (maxCols !== count) {
    throw new Error("Number of columns doesn't match number of children");
  }

  return (
    <Box
      className={clsx("grid gap-1 w-full", colsMap[maxCols], className)}
      maxWidth="xl"
    >
      {children}
    </Box>
  );
};
