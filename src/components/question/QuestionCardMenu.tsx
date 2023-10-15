import { useState } from "react";
import { MoreVert as MoreVertIcon } from "@mui/icons-material";
import {
  Box,
  IconButton,
  CardActions,
  Menu,
  Tooltip,
  Divider,
} from "@mui/material";
import { QuestionOrder, QuestionDelete, QuestionType } from ".";

export const QuestionCardMenu = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => setAnchorEl(null);

  return (
    <Box>
      <CardActions disableSpacing className="flex flex-row justify-end">
        <Box className="flex flex-col sm:flex-row">
          <QuestionOrder isUp={true} />
          <QuestionOrder isUp={false} />
        </Box>

        <Tooltip title="Open menu">
          <IconButton onClick={handleClick}>
            <MoreVertIcon />
          </IconButton>
        </Tooltip>
      </CardActions>

      <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleClose}>
        <QuestionType handleClose={handleClose} />
        <Divider />
        <QuestionDelete handleClose={handleClose} />
      </Menu>
    </Box>
  );
};
