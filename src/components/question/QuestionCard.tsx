import { useContext, useState } from "react";
import { FormContext } from "@/store";
import { MoreVert as MoreVertIcon } from "@mui/icons-material";
import {
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
import localizedFormat from "dayjs/plugin/localizedFormat";
import { QuestionOrder } from "./QuestionOrder";
import { QuestionTitle } from "./QuestionTitle";
import dayjs from "dayjs";
dayjs.extend(localizedFormat);

export const QuestionCard = () => {
  const { status } = useContext(FormContext);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => setAnchorEl(null);

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
                <MenuItem onClick={handleClose}>Delete</MenuItem>
              </Menu>
            </Box>
          )
        }
        title={<QuestionTitle />}
        subheader={
          <Box className="flex flex-row flex-wrap items-center gap-2">
            {true && <Typography variant="subtitle2">TYPE HERE</Typography>}
          </Box>
        }
      />
    </Card>
  );
};
