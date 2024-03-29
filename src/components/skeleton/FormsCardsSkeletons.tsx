import { Box } from "@mui/material";
import { FormCardSkeleton } from "./FormCardSkeleton";
import clsx from "clsx";

export const FormsCardsSkeletons = ({
  number,
  className = "",
}: {
  number: number;
  className?: React.HTMLAttributes<HTMLDivElement>["className"];
}) => {
  return (
    <Box
      className={clsx(
        className,
        "flex h-full w-full flex-row flex-wrap items-center justify-evenly gap-4 overflow-hidden"
      )}
    >
      {[...Array(number).keys()].map((_, cardIndex) => (
        <FormCardSkeleton key={cardIndex} />
      ))}
    </Box>
  );
};
