import { userPages } from "@/utils/navbar.config";
import {
  Box,
  IconButton,
  Typography,
  Menu,
  Avatar,
  Tooltip,
  MenuItem,
  Button,
  Skeleton,
  Divider,
} from "@mui/material";
import { type MouseEvent, useState } from "react";
import { useRouter } from "next/router";
import { signIn, signOut, useSession } from "next-auth/react";
import { useThemeMode } from "@/hooks/useThemeMode";
import { ThemeSwitcher } from ".";

export const UserProfile = () => {
  const { mode, setMode } = useThemeMode();
  const router = useRouter();
  const { data: sessionData, status } = useSession();

  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);

  const handleOpenUserMenu = (event: MouseEvent<HTMLElement>) =>
    setAnchorElUser(event.currentTarget);

  const handleCloseUserMenu = () => setAnchorElUser(null);

  return status === "loading" ? (
    <Skeleton animation="wave" variant="rounded" width={40} height={40} />
  ) : status === "authenticated" ? (
    <Box className="grow-0">
      <Tooltip title="Open settings">
        <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
          <Avatar
            alt={sessionData.user?.name ?? ""}
            src={sessionData.user?.image ?? ""}
          />
        </IconButton>
      </Tooltip>
      <Menu
        className="mt-2"
        anchorEl={anchorElUser}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        keepMounted
        transformOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
        open={Boolean(anchorElUser)}
        onClose={handleCloseUserMenu}
      >
        <Box>
          {userPages.map((page, index) => (
            <MenuItem
              key={index}
              onClick={() => {
                handleCloseUserMenu();
                void router.push(page.route);
              }}
              selected={router.pathname === page.route}
            >
              <Typography>{page.name}</Typography>
            </MenuItem>
          ))}
          <Divider />
          <MenuItem
            onClick={() => {
              handleCloseUserMenu();
              void signOut();
            }}
          >
            <Typography>Sign Out</Typography>
          </MenuItem>
          {process.env.NODE_ENV === "development" && (
            <MenuItem className="flex items-center justify-center p-0">
              <ThemeSwitcher checked={mode === "dark"} onChange={setMode} />
            </MenuItem>
          )}
        </Box>
      </Menu>
    </Box>
  ) : (
    <Box>
      <Button
        className="grow-0 bg-pdark text-white hover:text-slight dark:bg-primary"
        variant="contained"
        size="large"
        onClick={() => void signIn("auth0")}
      >
        Sign In
      </Button>
      {process.env.NODE_ENV === "development" && (
        <ThemeSwitcher checked={mode === "dark"} onChange={setMode} />
      )}
    </Box>
  );
};
