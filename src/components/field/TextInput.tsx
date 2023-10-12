import { Controller } from "react-hook-form";
import { TextField } from "@mui/material";
import type { Option } from "@prisma/client";
import { useReactForm } from "@/store";

export const TextInput = ({
  name,
  multiline = false,
  rows = 1,
  option,
}: {
  name: string;
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
      render={({ field: { onChange, value }, fieldState: { error } }) => (
        <TextField
          helperText={error ? error.message : null}
          error={!!error}
          onChange={(e) => {
            onChange({ ...option, value: e.target.value });
          }}
          label={option?.value ?? "Unknown"}
          multiline={multiline}
          rows={rows}
          value={value?.value ?? ""}
          fullWidth
        />
      )}
    />
  );
};
