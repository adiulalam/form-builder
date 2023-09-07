import type { NavbarDarkType } from "@/types/navbar.types";
import { AppBar, Toolbar, Container } from "@mui/material";
import { UserProfile, NavbarMobile, NavbarDesktop } from ".";
import { useEffect } from "react";

export const Navbar = ({ setMode, mode }: NavbarDarkType) => {
  useEffect(() => {
    if (mode === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [mode]);
  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <NavbarMobile />

          <NavbarDesktop />

          <UserProfile mode={mode} setMode={setMode} />
        </Toolbar>
      </Container>
    </AppBar>
  );
};
