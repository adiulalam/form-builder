import { TextField } from "@mui/material";

export const OptionOtherInput = ({ label }: { label: string }) => {
  return (
    <TextField
      fullWidth
      multiline
      label={label}
      InputProps={{ readOnly: true }}
    />
  );
};
