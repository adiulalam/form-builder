import { useContext, useState } from "react";
import type { Dispatch, SetStateAction } from "react";
import { FormContext } from "@/store";
import {
  MoreVert as MoreVertIcon,
  Edit as EditIcon,
} from "@mui/icons-material";
import {
  Box,
  IconButton,
  Menu,
  MenuItem,
  Tooltip,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import { FormDelete, FormStatus } from ".";

type FormCardMenuType = {
  isReadOnly: boolean;
  setIsReadOnly: Dispatch<SetStateAction<boolean>>;
};

export const FormCardMenu = ({
  isReadOnly,
  setIsReadOnly,
}: FormCardMenuType) => {
  const { status } = useContext(FormContext);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => setAnchorEl(null);

  const handleEditTitle = () => {
    setIsReadOnly(!isReadOnly);
    handleClose();
  };

  return (
    <Box>
      <Tooltip title="Open menu">
        <IconButton onClick={handleClick}>
          <MoreVertIcon />
        </IconButton>
      </Tooltip>

      <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleClose}>
        {status === "DRAFT" && (
          <MenuItem onClick={handleEditTitle}>
            <ListItemIcon>
              <EditIcon />
            </ListItemIcon>
            <ListItemText>{isReadOnly ? "Edit Name" : "Done"}</ListItemText>
          </MenuItem>
        )}

        <FormDelete handleClose={handleClose} />

        <FormStatus handleClose={handleClose} />
      </Menu>
    </Box>
  );
};
