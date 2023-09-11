import { useContext, useState } from "react";
import { FormContext } from "@/store/FormProvider";
import {
  FormatAlignCenter as FormatAlignCenterIcon,
  MoreVert as MoreVertIcon,
  Share as ShareIcon,
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
import { FormFavourite, FormDelete } from ".";
import dayjs from "dayjs";
import localizedFormat from "dayjs/plugin/localizedFormat";
dayjs.extend(localizedFormat);

export const FormCard = () => {
  const { title, status, updatedAt } = useContext(FormContext);

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => setAnchorEl(null);

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
                <MenuItem onClick={handleClose}>Edit</MenuItem>
              )}
              <FormDelete handleClose={() => handleClose()} />

              {status === "DRAFT" ? (
                <MenuItem onClick={handleClose}>Mark as Completed</MenuItem>
              ) : (
                <MenuItem onClick={handleClose}>Mark as Draft</MenuItem>
              )}
            </Menu>
          </Box>
        }
        title={<Typography variant="h5">{title}</Typography>}
        subheader={
          <Box className="flex flex-row flex-wrap items-center gap-2">
            <Typography variant="subtitle1">
              {dayjs(updatedAt).format("LL")}
            </Typography>

            <Divider orientation="vertical" variant="middle" flexItem />

            <Typography variant="subtitle2">{status}</Typography>
          </Box>
        }
      />

      {status === "DRAFT" ? (
        <FormatAlignCenterIcon className="w-1/1 flex self-center text-[12rem]" />
      ) : (
        <FormatAlignJustifyIcon className="w-1/1 flex self-center text-[12rem]" />
      )}

      <CardActions disableSpacing className="flex flex-row justify-end">
        <FormFavourite />
        <Tooltip title="Share link">
          <IconButton>
            <ShareIcon />
          </IconButton>
        </Tooltip>
      </CardActions>
    </Card>
  );
};
