import { Box, Paper, Tooltip, IconButton, Menu } from "@mui/material";
import { MoreVert as MoreVertIcon } from "@mui/icons-material";
import { useState } from "react";
import { OptionAutocomplete, OptionDelete } from ".";

export const OptionBar = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => setAnchorEl(null);

  return (
    <Box className="flex w-full flex-row items-center gap-2" maxWidth={"xl"}>
      <Paper className="w-full">
        <OptionAutocomplete />
      </Paper>

      <Box>
        <Tooltip title="Open menu">
          <IconButton onClick={handleClick}>
            <MoreVertIcon />
          </IconButton>
        </Tooltip>

        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleClose}
        >
          {/* 
            // Add other input option
             */}
          {/* <Divider /> */}
          <OptionDelete handleClose={handleClose} />
        </Menu>
      </Box>
    </Box>
  );
};
