import { AppBar, Toolbar, Container } from "@mui/material";
import { UserProfile, NavbarMobile, NavbarDesktop } from ".";

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
