import { Box, Button } from "@mui/material";
import { NavbarLogo } from ".";
import { navbarPages } from "@/utils/navbar.config";
import { useRouter } from "next/router";
import { useTheme } from "@mui/material/styles";

export const NavbarDesktop = () => {
  const router = useRouter();

  const {
    palette: { mode },
  } = useTheme();

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
            className={`${
              mode === "dark" ? "bg-inherit" : "bg-pdark"
            } m-2 block text-white hover:text-slight`}
          >
            {page.name}
          </Button>
        ))}
      </Box>
    </>
  );
};
