import { Typography, Box } from "@mui/material";
import { DynamicForm as DynamicFormIcon } from "@mui/icons-material";
import Link from "next/link";

export const NavbarLogo = ({ isMobile }: { isMobile: boolean }) => {
  const display = isMobile ? "flex md:hidden grow" : "hidden md:flex grow-0";

  return (
    <Box className={`${display} items-center justify-center`}>
      <Link
        href="/"
        className="flex grow flex-row items-center justify-center gap-3"
      >
        <DynamicFormIcon />
        <Typography
          variant={isMobile ? "h5" : "h6"}
          className={`${display} mr-4 whitespace-nowrap font-mono font-bold tracking-[.3rem]`}
        >
          FILDER
        </Typography>
      </Link>
    </Box>
  );
};
