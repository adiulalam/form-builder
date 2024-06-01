import { Box, Paper } from "@mui/material";
import { useContext } from "react";
import { OptionAutocomplete, OptionBarMenu, OptionTextField } from ".";
import { QuestionContext } from "@/store";
import { useIsInputType } from "@/hooks";

export const OptionBar = () => {
  const { options } = useContext(QuestionContext);
  const isOtherOption = options?.find((option) => option.isOtherOption);

  const { value } = options?.find((option) => option.showInput) ?? {};

  const isInputType = useIsInputType();

  return (
    <Box className="flex w-full flex-col items-center gap-4" maxWidth={"xl"}>
      <Box className="flex w-full flex-row items-center gap-2">
        <Paper className="w-full">
          {isInputType ? (
            <OptionTextField rows={2} label={value?.toUpperCase() ?? "INPUT"} />
          ) : (
            <OptionAutocomplete />
          )}
        </Paper>

        {!isInputType && <OptionBarMenu />}
      </Box>
      {isOtherOption && <OptionTextField label={isOtherOption.value} />}
    </Box>
  );
};
