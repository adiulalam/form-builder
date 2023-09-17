import { Box } from "@mui/material";
import { FormCardSkeleton } from "./FormCardSkeleton";

export const FormsCardsSkeletons = ({
  number,
  additionalClass = "",
}: {
  number: number;
  additionalClass?: React.HTMLAttributes<HTMLDivElement>["className"];
}) => {
  return (
    <Box
      className={`flex h-full w-full flex-row flex-wrap items-center justify-evenly gap-4 overflow-hidden ${additionalClass}`}
    >
      {[...Array(number).keys()].map((_, cardIndex) => (
        <FormCardSkeleton key={cardIndex} />
      ))}
    </Box>
  );
};
