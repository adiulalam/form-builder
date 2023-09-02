import { userPages } from "@/utils/Navbar.config";
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
} from "@mui/material";
import { type MouseEvent, useState } from "react";
import { useRouter } from "next/router";
import { signIn, signOut, useSession } from "next-auth/react";

export const UserProfile = () => {
  const { data: sessionData, status } = useSession();
  const router = useRouter();
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
            alt={sessionData.user.name ?? ""}
            src={sessionData.user.image ?? ""}
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
          <MenuItem
            onClick={() => {
              handleCloseUserMenu();
              void signOut();
            }}
          >
            <Typography>Sign Out</Typography>
          </MenuItem>
        </Box>
      </Menu>
    </Box>
  ) : (
    <Button
      className="text-white hover:text-slight grow-0"
      variant="contained"
      color="primary"
      size="large"
      onClick={() => void signIn("auth0")}
    >
      Sign In
    </Button>
  );
};
