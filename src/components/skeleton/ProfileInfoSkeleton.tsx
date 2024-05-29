import { Box, Card, Skeleton } from "@mui/material";
import clsx from "clsx";

export const ProfileInfoSkeleton = () => {
  return (
    <Card
      variant="outlined"
      className={clsx(
        "md:col-span-1 col-span-3 -order-1 md:order-1",
        "flex flex-col items-center justify-center lg:flex-row lg:gap-10 shadow-md w-full h-fit p-5 gap-5"
      )}
    >
      <Skeleton
        className="w-32 h-32 object-cover rounded-full lg:w-40 lg:h-40 lg:pb-0"
        variant="circular"
        animation="wave"
      />

      <Box className="flex flex-col gap-1 items-center text-center text-md lg:text-left">
        <Skeleton
          variant="rectangular"
          animation="wave"
          width="8rem"
          height="2rem"
        />
        <Skeleton
          variant="rectangular"
          animation="wave"
          width="10rem"
          height="1rem"
        />
      </Box>
    </Card>
  );
};
