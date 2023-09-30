import { Controller } from "react-hook-form";
import { TextField } from "@mui/material";
import type { Option } from "@prisma/client";
import { useReactForm } from "@/store";

export const TextInput = ({
  name,
  label,
  multiline = false,
  rows = 1,
  option,
}: {
  name: string;
  label: string;
  option: Option | null;
  rows?: number;
  multiline?: boolean;
}) => {
  const control = useReactForm((state) => state.control);

  return (
    <Controller
      name={name}
      control={control}
      rules={{
        required: { value: true, message: "Required Field" },
      }}
      render={({ field: { onChange }, fieldState: { error } }) => (
        <TextField
          helperText={error ? error.message : null}
          error={!!error}
          onChange={(e) => {
            const value = e.target.value;

            onChange({ ...option, value });
          }}
          label={label}
          multiline={multiline}
          rows={rows}
          fullWidth
        />
      )}
    />
  );
};
