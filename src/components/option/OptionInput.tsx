import { QuestionContext } from "@/store";
import { TextField } from "@mui/material";
import { useContext } from "react";

export const OptionInput = () => {
  const { options } = useContext(QuestionContext);
  const { value } = options?.find((option) => option.showInput) ?? {};

  return (
    <TextField
      fullWidth
      multiline
      rows={2}
      label={value?.toUpperCase() ?? ""}
      InputProps={{ readOnly: true, placeholder: "Type here" }}
    />
  );
};
