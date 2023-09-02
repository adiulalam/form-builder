import { Typography, Box } from "@mui/material";
import { DynamicForm as DynamicFormIcon } from "@mui/icons-material";
import Link from "next/link";

export const NavbarLogo = ({ isMobile }: { isMobile: boolean }) => {
  const display = isMobile
    ? { xs: "flex", md: "none" }
    : { xs: "none", md: "flex" };
  return (
    <Box
      sx={{
        display,
        alignItems: "center",
        justifyContent: "center",
        flexGrow: isMobile ? 1 : 0,
      }}
    >
      <Link href="/" className="flex grow flex-row items-center justify-center">
        <DynamicFormIcon
          sx={{
            display,
            mr: 1,
          }}
        />
        <Typography
          variant={isMobile ? "h5" : "h6"}
          noWrap
          sx={{
            mr: 2,
            fontFamily: "monospace",
            fontWeight: 700,
            letterSpacing: ".3rem",
            color: "inherit",
            textDecoration: "none",
            flexGrow: isMobile ? 1 : 0,
            display,
          }}
        >
          FILDER
        </Typography>
      </Link>
    </Box>
  );
};
