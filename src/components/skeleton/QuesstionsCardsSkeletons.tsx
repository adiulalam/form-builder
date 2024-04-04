import { Box, Skeleton, Card, CardHeader } from "@mui/material";
import { QuestionCardSkeleton } from ".";
import clsx from "clsx";

export const QuestionsCardsSkeletons = ({
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
        "flex min-h-screen flex-col items-center justify-center overflow-hidden"
      )}
    >
      <Card className="flex w-full max-w-screen-xl flex-col" variant="outlined">
        <CardHeader title={<Skeleton variant="text" animation="wave" />} />
      </Card>

      <Box
        className="m-auto flex h-full w-full flex-col flex-wrap items-center justify-evenly gap-4"
        maxWidth={"xl"}
      >
        {[...Array(number).keys()].map((_, cardIndex) => (
          <QuestionCardSkeleton key={cardIndex} />
        ))}
      </Box>
    </Box>
  );
};
