import { Box, Button } from "@mui/material";
import { NavbarLogo } from ".";
import { navbarPages } from "@/utils/Navbar.config";
import { useRouter } from "next/router";

export const NavbarDesktop = () => {
  const router = useRouter();

  return (
    <>
      <NavbarLogo isMobile={false} />

      <Box className="hidden grow md:flex">
        {navbarPages.map((page, index) => (
          <Button
            key={index}
            onClick={() => void router.push(page.route)}
            variant={router.pathname === page.route ? "outlined" : "text"}
            color={router.pathname === page.route ? "secondary" : "primary"}
            className={`text-white hover:text-slight m-2 block`}
          >
            {page.name}
          </Button>
        ))}
      </Box>
    </>
  );
};
