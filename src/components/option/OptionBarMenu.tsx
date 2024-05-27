import { Box, Tooltip, IconButton, Menu } from "@mui/material";
import { MoreVert as MoreVertIcon } from "@mui/icons-material";
import { useState } from "react";
import { OptionDelete, OptionAddInput } from ".";
import { usePlaygroundContext } from "@/store/PlaygroundProvider";

export const OptionBarMenu = () => {
  const { isPlayground } = usePlaygroundContext();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => setAnchorEl(null);

  return (
    <Box>
      <Tooltip title="Open menu">
        <IconButton onClick={handleClick}>
          <MoreVertIcon />
        </IconButton>
      </Tooltip>

      <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleClose}>
        <OptionDelete handleClose={handleClose} />
        {!isPlayground && <OptionAddInput handleClose={handleClose} />}
      </Menu>
    </Box>
  );
};
