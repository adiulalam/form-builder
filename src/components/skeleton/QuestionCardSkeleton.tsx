import { Box, CardHeader, Card, Skeleton } from "@mui/material";

export const QuestionCardSkeleton = () => {
  return (
    <Card className="flex w-full flex-col">
      <CardHeader
        title={<Skeleton variant="text" animation="wave" />}
        subheader={
          <Box className="flex flex-row flex-wrap items-center gap-2">
            <Skeleton variant="text" animation="wave" width="20%" />
          </Box>
        }
      />

      <Skeleton
        variant="rectangular"
        animation="wave"
        width="full"
        height="12rem"
      />
    </Card>
  );
};
