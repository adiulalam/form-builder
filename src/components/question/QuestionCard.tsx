import { useContext, useState } from "react";
import { FormContext, QuestionContext } from "@/store";
import { MoreVert as MoreVertIcon } from "@mui/icons-material";
import {
  Box,
  Typography,
  IconButton,
  CardActions,
  CardHeader,
  Card,
  Menu,
  Tooltip,
  Divider,
  CardContent,
} from "@mui/material";
import localizedFormat from "dayjs/plugin/localizedFormat";
import { QuestionOrder, QuestionTitle, QuestionDelete, QuestionType } from ".";
import dayjs from "dayjs";
import { OptionBar } from "../option";
import { FieldContainer } from "../field";
import { useRouter } from "next/router";
dayjs.extend(localizedFormat);

export const QuestionCard = () => {
  const router = useRouter();
  const isEditor = router.pathname === "/form/[id]";

  const { status } = useContext(FormContext);
  const { type } = useContext(QuestionContext);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => setAnchorEl(null);

  return (
    <Card className="flex w-full flex-col">
      <CardHeader
        action={
          status === "DRAFT" &&
          isEditor && (
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
                <QuestionType handleClose={handleClose} />
                <Divider />
                <QuestionDelete handleClose={handleClose} />
              </Menu>
            </Box>
          )
        }
        title={<QuestionTitle />}
        subheader={
          <Box className="mt-4 flex flex-col flex-wrap gap-2">
            <Typography
              variant="subtitle2"
              color={type ? "inherit" : "lightsalmon"}
            >
              {type ?? "NO TYPE PROVIDED"}
            </Typography>
          </Box>
        }
      />
      {type && (
        <CardContent>
          {status === "DRAFT" && isEditor ? <OptionBar /> : <FieldContainer />}
        </CardContent>
      )}
    </Card>
  );
};
