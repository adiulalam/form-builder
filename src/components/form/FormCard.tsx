import type { Form } from "@prisma/client";
import { useState } from "react";
import {
  FormatAlignCenter as FormatAlignCenterIcon,
  MoreVert as MoreVertIcon,
  Share as ShareIcon,
  FavoriteBorder as FavoriteBorderIcon,
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
import dayjs from "dayjs";
import localizedFormat from "dayjs/plugin/localizedFormat";
dayjs.extend(localizedFormat);

export const FormCard = (formData: Form) => {
  console.log("🚀 ~ file: card.tsx:26 ~ FormCard ~ status:", formData);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
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
              {formData.status === "DRAFT" && (
                <MenuItem onClick={handleClose}>Edit</MenuItem>
              )}
              <MenuItem onClick={handleClose}>Delete</MenuItem>

              {formData.status === "DRAFT" ? (
                <MenuItem onClick={handleClose}>Mark as Draft</MenuItem>
              ) : (
                <MenuItem onClick={handleClose}>Mark as Completed</MenuItem>
              )}
            </Menu>
          </Box>
        }
        title={<Typography variant="h5">{formData.title}</Typography>}
        subheader={
          <Box className="flex flex-row flex-wrap items-center gap-2">
            <Typography variant="subtitle1">
              {dayjs(formData.updatedAt).format("LL")}
            </Typography>

            <Divider orientation="vertical" variant="middle" flexItem />

            <Typography variant="subtitle2">{formData.status}</Typography>
          </Box>
        }
      />
      <FormatAlignCenterIcon
        sx={{
          fontSize: 200,
          display: "flex",
          width: "100%",
          alignSelf: "center",
          justifySelf: "center",
          textAlign: "center",
        }}
      />

      <CardActions disableSpacing className="flex flex-row justify-end">
        <Tooltip title="Mark as favourite">
          <IconButton>
            <FavoriteBorderIcon />
          </IconButton>
        </Tooltip>
        <Tooltip title="Share link">
          <IconButton>
            <ShareIcon />
          </IconButton>
        </Tooltip>
      </CardActions>
    </Card>
  );
};
