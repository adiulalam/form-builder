import { Box, Typography } from "@mui/material";

export const LandingInfo = () => {
  return (
    <Box className="flex flex-col gap-2 mt-10 items-center justify-center text-center md:w-2/3 w-1/1">
      <Typography variant="h1">
        Our latest <b>products</b>
      </Typography>

      <Typography variant="body1">
        Explore our cutting-edge dashboard, delivering high-quality solutions
        tailored to your needs. Elevate your experience with top-tier features
        and services
      </Typography>

      <Typography variant="h2" className="mt-5">
        Check out below
      </Typography>
    </Box>
  );
};
