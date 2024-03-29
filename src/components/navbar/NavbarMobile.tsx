import { type MouseEvent, useState } from "react";
import { Box, IconButton, Typography, Menu, MenuItem } from "@mui/material";
import { Menu as MenuIcon } from "@mui/icons-material";
import { NavbarLogo } from ".";
import { navbarPages } from "@/utils/navbar.config";
import { useRouter } from "next/router";
import Link from "next/link";

export const NavbarMobile = () => {
  const router = useRouter();
  const [anchorElNav, setAnchorElNav] = useState<null | HTMLElement>(null);

  const handleOpenNavMenu = (event: MouseEvent<HTMLElement>) =>
    setAnchorElNav(event.currentTarget);

  const handleCloseNavMenu = () => setAnchorElNav(null);

  return (
    <>
      <Box className="flex grow md:hidden">
        <IconButton size="large" onClick={handleOpenNavMenu} color="inherit">
          <MenuIcon />
        </IconButton>
        <Menu
          className="block md:hidden"
          anchorEl={anchorElNav}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "left",
          }}
          keepMounted
          transformOrigin={{
            vertical: "top",
            horizontal: "left",
          }}
          open={Boolean(anchorElNav)}
          onClose={handleCloseNavMenu}
        >
          {navbarPages.map((page, index) => (
            <MenuItem
              key={index}
              onClick={handleCloseNavMenu}
              href={page.route}
              selected={router.pathname === page.route}
              component={Link}
            >
              <Typography>{page.name}</Typography>
            </MenuItem>
          ))}
        </Menu>
      </Box>

      <NavbarLogo isMobile={true} />
    </>
  );
};
