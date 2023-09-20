import { useContext, useState } from "react";
import { FormContext } from "@/store";
import {
  EditNote as EditNoteIcon,
  MoreVert as MoreVertIcon,
  FormatAlignJustify as FormatAlignJustifyIcon,
} from "@mui/icons-material";
import {
  Divider,
  Box,
  Typography,
  IconButton,
  CardActions,
  CardHeader,
  Card,
  Menu,
  MenuItem,
  Tooltip,
} from "@mui/material";
import {
  FormFavourite,
  FormDelete,
  FormStatus,
  FormTitle,
  FormShare,
} from "../form";
import dayjs from "dayjs";
import localizedFormat from "dayjs/plugin/localizedFormat";
import Link from "next/link";
import { QuestionOrder } from "./FormFavourite";
dayjs.extend(localizedFormat);

export const QuestionCard = () => {
  const { id, status, updatedAt } = useContext(FormContext);
  const [isReadOnly, setIsReadOnly] = useState<boolean>(true);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => setAnchorEl(null);

  const handleEditTitle = () => {
    setIsReadOnly(false);
    handleClose();
  };

  return (
    <Card className="flex w-full flex-col">
      <CardHeader
        action={
          status === "DRAFT" && (
            <Box>
              <CardActions disableSpacing className="flex flex-row justify-end">
                <QuestionOrder isUp={true} />
                <QuestionOrder isUp={false} />

                <Tooltip title="Open menu">
                  <IconButton onClick={handleClick}>
                    <MoreVertIcon />
                  </IconButton>
                </Tooltip>
              </CardActions>

              <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleClose}
              >
                <MenuItem onClick={handleEditTitle}>Edit Name</MenuItem>
              </Menu>
            </Box>
          )
        }
        title={
          <FormTitle isReadOnly={isReadOnly} setIsReadOnly={setIsReadOnly} />
        }
        subheader={
          <Box className="flex flex-row flex-wrap items-center gap-2">
            {true && <Typography variant="subtitle2">TYPE HERE</Typography>}
          </Box>
        }
      />

      <Box className="w-1/1 flex self-center">
        {status === "DRAFT" ? (
          <EditNoteIcon className="text-[12rem]" />
        ) : (
          <FormatAlignJustifyIcon className="text-[12rem]" />
        )}
      </Box>
    </Card>
  );
};
