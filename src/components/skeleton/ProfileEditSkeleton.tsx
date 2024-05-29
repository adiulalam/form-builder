import { Box, Card, Skeleton } from "@mui/material";
import clsx from "clsx";

export const ProfileEditSkeleton = () => {
  return (
    <Card
      variant="outlined"
      className={clsx(
        "md:col-span-2 col-span-3",
        "flex flex-col items-center justify-center shadow-md w-full h-fit p-5 gap-8"
      )}
    >
      <Skeleton
        variant="rectangular"
        animation="wave"
        width="8rem"
        height="2rem"
      />
      <Box className="w-full flex flex-col gap-5">
        <Skeleton
          variant="rectangular"
          animation="wave"
          width="full"
          height="4rem"
        />

        <Skeleton
          variant="rectangular"
          animation="wave"
          width="full"
          height="4rem"
        />

        <Skeleton
          variant="rectangular"
          animation="wave"
          width="full"
          height="4rem"
        />
        <Skeleton
          variant="rectangular"
          animation="wave"
          width="full"
          height="4rem"
        />

        <Skeleton
          variant="rectangular"
          animation="wave"
          width="full"
          height="4rem"
        />

        <Skeleton
          variant="rectangular"
          animation="wave"
          width="full"
          height="6rem"
        />
      </Box>
    </Card>
  );
};
