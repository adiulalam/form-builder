import { QuestionContext } from "@/store";
import { TextField } from "@mui/material";
import { useContext } from "react";

export const OptionOtherInput = () => {
  const { options } = useContext(QuestionContext);

  const isOtherOption = options?.find((option) => option.showInput);

  return (
    isOtherOption && (
      <TextField
        fullWidth
        multiline
        label={isOtherOption.value}
        InputProps={{ readOnly: true }}
      />
    )
  );
};
