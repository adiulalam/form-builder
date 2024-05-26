import { Avatar, Box, Card, Typography } from "@mui/material";
import clsx from "clsx";
import { useProfileInfo } from "@/store/ProfileProvider";

export const ProfileInfo = () => {
  const { name, email, phone, image } = useProfileInfo();

  return (
    <Card
      variant="outlined"
      className={clsx(
        "md:col-span-1 col-span-3 -order-1 md:order-1",
        "flex flex-col items-center justify-center lg:flex-row lg:gap-10 shadow-md w-full h-fit p-5 gap-5"
      )}
    >
      <Avatar
        className="w-32 h-32 object-cover rounded-full lg:w-40 lg:h-40 lg:pb-0"
        alt={name ?? ""}
        src={image ?? ""}
      />

      <Box className="text-center text-md lg:text-left">
        <Typography component="h2" className="text-2xl font-bold text-primary">
          {name}
        </Typography>
        <Typography component="span" className="text-gray-500">
          {email}
        </Typography>
        {phone && (
          <Typography component="span" className="text-gray-500">
            {phone}
          </Typography>
        )}
      </Box>
    </Card>
  );
};
