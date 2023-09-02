import { Box, Button } from "@mui/material";
import { NavbarLogo } from ".";

const pages = ["Products", "Pricing", "Blog"];

export const NavbarDesktop = () => {
  return (
    <>
      <NavbarLogo isMobile={false} />

      <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
        {pages.map((page) => (
          <Button
            key={page}
            onClick={() => null}
            sx={{ my: 2, color: "white", display: "block" }}
          >
            {page}
          </Button>
        ))}
      </Box>
    </>
  );
};
