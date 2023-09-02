import { AppBar, Toolbar, Container } from "@mui/material";
import { UserProfile, NavbarMobile, NavbarDesktop } from ".";

const pages = ["Products", "Pricing", "Blog"];

export const Navbar = () => {
  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <NavbarMobile />

          <NavbarDesktop />

          <UserProfile />
        </Toolbar>
      </Container>
    </AppBar>
  );
};
