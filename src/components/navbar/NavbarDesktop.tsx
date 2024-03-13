import { Box, Button } from "@mui/material";
import { NavbarLogo } from ".";
import { navbarPages } from "@/utils/navbar.config";
import { useRouter } from "next/router";

export const NavbarDesktop = () => {
  const router = useRouter();

  return (
    <>
      <NavbarLogo isMobile={false} />

      <Box className="hidden grow md:flex gap-2">
        {navbarPages.map((page, index) => (
          <Button
            key={index}
            onClick={() => void router.push(page.route)}
            color="inherit"
            variant={router.pathname === page.route ? "contained" : "text"}
          >
            {page.name}
          </Button>
        ))}
      </Box>
    </>
  );
};
