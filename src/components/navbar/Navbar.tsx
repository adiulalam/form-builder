import { AppBar, Toolbar, Container, Switch } from "@mui/material";
import { UserProfile, NavbarMobile, NavbarDesktop } from ".";
import type { Dispatch, SetStateAction } from "react";

type NavBarType = {
  setMode: Dispatch<SetStateAction<"light" | "dark">>;
  mode: "light" | "dark";
};

export const Navbar = ({ setMode, mode }: NavBarType) => {
  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <NavbarMobile />

          <NavbarDesktop />

          <UserProfile />

          {process.env.NODE_ENV === "development" && (
            <Switch
              checked={mode === "dark"}
              onChange={() => setMode(mode === "light" ? "dark" : "light")}
            />
          )}
        </Toolbar>
      </Container>
    </AppBar>
  );
};
