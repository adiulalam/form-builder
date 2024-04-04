import {
  Divider,
  Box,
  CardActions,
  CardHeader,
  Card,
  Skeleton,
} from "@mui/material";

export const FormCardSkeleton = () => {
  return (
    <Card className="flex w-full flex-col sm:max-w-sm" variant="outlined">
      <CardHeader
        title={<Skeleton variant="text" animation="wave" />}
        subheader={
          <Box className="flex flex-row flex-wrap items-center gap-2">
            <Skeleton variant="text" animation="wave" width="20%" />

            <Divider orientation="vertical" variant="middle" flexItem />

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
      <CardActions disableSpacing className="flex flex-row justify-end gap-3">
        <Skeleton
          variant="rounded"
          animation="wave"
          width="2rem"
          height="2rem"
        />
        <Skeleton
          variant="rounded"
          animation="wave"
          width="2rem"
          height="2rem"
        />
      </CardActions>
    </Card>
  );
};
