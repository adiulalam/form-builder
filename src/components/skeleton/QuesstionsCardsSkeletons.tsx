import { Box, Skeleton, Card, CardHeader } from "@mui/material";
import { QuestionCardSkeleton } from ".";

export const QuestionsCardsSkeletons = ({
  number,
  additionalClass = "",
}: {
  number: number;
  additionalClass?: React.HTMLAttributes<HTMLDivElement>["className"];
}) => {
  return (
    <Box
      className={`flex min-h-screen flex-col items-center justify-center overflow-hidden ${additionalClass}`}
    >
      <Card className="flex w-full max-w-screen-xl flex-col">
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
