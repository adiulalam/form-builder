import { Box, Paper } from "@mui/material";
import { useContext } from "react";
import {
  OptionAutocomplete,
  OptionOtherInput,
  OptionInput,
  OptionBarMenu,
} from ".";
import { QuestionContext } from "@/store";
import { useIsInputType } from "@/hooks";

export const OptionBar = () => {
  const { options } = useContext(QuestionContext);
  const isOtherOption = options?.find((option) => option.isOtherOption);

  const isInputType = useIsInputType();

  return (
    <Box className="flex w-full flex-col items-center gap-4" maxWidth={"xl"}>
      <Box className="flex w-full flex-row items-center gap-2">
        <Paper className="w-full">
          {isInputType ? <OptionInput /> : <OptionAutocomplete />}
        </Paper>

        {isInputType && <OptionBarMenu />}
      </Box>
      {isOtherOption && <OptionOtherInput label={isOtherOption.value} />}
    </Box>
  );
};
