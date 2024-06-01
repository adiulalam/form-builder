import { TextField } from "@mui/material";
import type { TextFieldProps } from "@mui/material";

export const OptionTextField = (props: TextFieldProps) => {
  return (
    <TextField
      {...props}
      data-testid="OptionTextField"
      fullWidth
      multiline
      InputProps={{ readOnly: true, placeholder: "Type here" }}
    />
  );
};
