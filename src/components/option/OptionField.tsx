import { TextField } from "@mui/material";

type OptionField = { label: string; rows?: number };

export const OptionField = ({ label, rows = 1 }: OptionField) => {
  return (
    <TextField
      fullWidth
      multiline
      rows={rows}
      label={label}
      InputProps={{ readOnly: true }}
    />
  );
};
