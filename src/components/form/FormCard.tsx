import { useContext, useState } from "react";
import { FormContext } from "@/store/FormProvider";
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
import { FormFavourite, FormDelete, FormStatus, FormTitle, FormShare } from ".";
import dayjs from "dayjs";
import localizedFormat from "dayjs/plugin/localizedFormat";
import Link from "next/link";
dayjs.extend(localizedFormat);

export const FormCard = () => {
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
    <Card className="flex w-full flex-col sm:max-w-sm">
      <CardHeader
        action={
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
              {status === "DRAFT" && (
                <MenuItem onClick={handleEditTitle}>Edit Name</MenuItem>
              )}

              <FormDelete handleClose={() => handleClose()} />

              <FormStatus handleClose={() => handleClose()} />
            </Menu>
          </Box>
        }
        title={
          <FormTitle isReadOnly={isReadOnly} setIsReadOnly={setIsReadOnly} />
        }
        subheader={
          <Link
            className="flex flex-row flex-wrap items-center gap-2"
            href={`/form/${id}`}
          >
            <Typography variant="subtitle1">
              {dayjs(updatedAt).format("LL")}
            </Typography>

            <Divider orientation="vertical" variant="middle" flexItem />

            <Typography variant="subtitle2">{status}</Typography>
          </Link>
        }
      />

      <Link className="w-1/1 flex self-center" href={`/form/${id}`}>
        {status === "DRAFT" ? (
          <EditNoteIcon className="text-[12rem]" />
        ) : (
          <FormatAlignJustifyIcon className="text-[12rem]" />
        )}
      </Link>

      <CardActions disableSpacing className="flex flex-row justify-end">
        <FormFavourite />

        <FormShare />
      </CardActions>
    </Card>
  );
};
