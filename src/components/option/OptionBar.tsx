import { Box, Paper, Tooltip, IconButton, Menu } from "@mui/material";
import { MoreVert as MoreVertIcon } from "@mui/icons-material";
import { useContext, useState } from "react";
import {
  OptionAutocomplete,
  OptionDelete,
  OptionOtherInput,
  OptionAddInput,
  OptionInput,
} from ".";
import { QuestionContext } from "@/store";

export const OptionBar = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const { type, options } = useContext(QuestionContext);
  const isOtherOption = options?.find(
    (option) => type !== "INPUT" && option.showInput,
  );

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => setAnchorEl(null);

  return (
    <Box className="flex w-full flex-col items-center gap-4" maxWidth={"xl"}>
      <Box className="flex w-full flex-row items-center gap-2">
        <Paper className="w-full">
          {type !== "INPUT" ? <OptionAutocomplete /> : <OptionInput />}
        </Paper>

        {type !== "INPUT" && (
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
              <OptionDelete handleClose={handleClose} />
              <OptionAddInput handleClose={handleClose} />
            </Menu>
          </Box>
        )}
      </Box>
      {isOtherOption && <OptionOtherInput label={isOtherOption.value} />}
    </Box>
  );
};
