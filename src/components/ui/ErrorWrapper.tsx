import { Typography, Box, Button } from "@mui/material";
import Image from "next/image";
import ImageScarecrow from "public/scarecrow.png";
import { useRouter } from "next/router";

const Title = () => (
  <Typography className="font-mono text-2xl font-bold uppercase">
    404 Not Found
  </Typography>
);

export const ErrorWrapper = ({ message }: { message?: string }) => {
  const router = useRouter();

  return (
    <Box className="grid min-h-screen content-between justify-center p-4">
      <Title />
      <Box className="grid auto-cols-auto grid-flow-row gap-10 lg:grid-flow-col">
        <Image
          src={ImageScarecrow}
          width={895}
          className="block h-auto w-full max-w-lg"
          alt="Scarecrow"
        />
        <Box className="flex flex-col gap-6">
          <Typography className="font-mono font-bold uppercase" variant="h3">
            Error - Something went wrong
          </Typography>
          <Typography className="font-mono uppercase" variant="subtitle1">
            {message ??
              "The page you are looking for might be removed or is temporarily unavailable"}
          </Typography>

          <Button
            variant="outlined"
            size="large"
            className="w-fit font-mono text-2xl font-bold uppercase"
            onClick={() => void router.push("/")}
            role="RedirectButton"
          >
            BACK TO HOMEPAGE
          </Button>
        </Box>
      </Box>
      <Title />
    </Box>
  );
};
