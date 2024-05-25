import { Avatar, Box, Card, Typography } from "@mui/material";
import { useSession } from "next-auth/react";
import clsx from "clsx";

export const ProfileEdit = () => {
  const { data } = useSession();

  return (
    <Card
      variant="outlined"
      className={clsx(
        "md:col-span-2 col-span-3",
        "flex flex-col items-center justify-center lg:flex-row lg:gap-10 shadow-md w-full h-fit p-5 gap-5"
      )}
    >
      <Avatar
        className="w-32 h-32 object-cover rounded-full lg:w-40 lg:h-40 lg:pb-0"
        alt={data?.user.name ?? ""}
        src={data?.user.image ?? ""}
      />

      <Box className="text-center text-md lg:text-left">
        <Typography
          component="h2"
          className="text-2xl font-bold text-purple-600"
        >
          QuackStack EDIT
        </Typography>
        <Typography component="span" className="text-gray-500">
          Software Developer
        </Typography>
        <Typography component="p" className="text-gray-400 my-3">
          Meet QuackStack, the coding duck—making web magic from frontend to
          backend with a touch of feathered flair! 🦆💻✨
        </Typography>
      </Box>
    </Card>
  );
};
