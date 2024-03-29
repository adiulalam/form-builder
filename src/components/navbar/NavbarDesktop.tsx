import { Box, Button } from "@mui/material";
import { NavbarLogo } from ".";
import { navbarPages } from "@/utils/navbar.config";
import { useRouter } from "next/router";
import Link from "next/link";

export const NavbarDesktop = () => {
  const router = useRouter();

  return (
    <>
      <NavbarLogo isMobile={false} />

      <Box className="hidden grow md:flex gap-2">
        {navbarPages.map((page, index) => (
          <Button
            key={index}
            href={page.route}
            color="inherit"
            variant={router.pathname === page.route ? "contained" : "text"}
            component={Link}
          >
            {page.name}
          </Button>
        ))}
      </Box>
    </>
  );
};
