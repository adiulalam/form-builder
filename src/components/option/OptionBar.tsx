import { Box, Paper } from "@mui/material";
import { useContext } from "react";
import {
  OptionAutocomplete,
  OptionOtherInput,
  OptionInput,
  OptionBarMenu,
} from ".";
import { QuestionContext } from "@/store";

export const OptionBar = () => {
  const { type, options } = useContext(QuestionContext);
  const isOtherOption = options?.find((option) => option.isOtherOption);

  return (
    <Box className="flex w-full flex-col items-center gap-4" maxWidth={"xl"}>
      <Box className="flex w-full flex-row items-center gap-2">
        <Paper className="w-full">
          {type !== "INPUT" ? <OptionAutocomplete /> : <OptionInput />}
        </Paper>

        {type !== "INPUT" && <OptionBarMenu />}
      </Box>
      {isOtherOption && <OptionOtherInput label={isOtherOption.value} />}
    </Box>
  );
};
