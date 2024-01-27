import { Controller } from "react-hook-form";
import { TextField } from "@mui/material";
import type { Option, SubmissionOption } from "@prisma/client";
import { useReactForm } from "@/store";

export const TextInput = ({
  name,
  multiline = false,
  rows = 1,
  option,
  textOptionValue,
}: {
  name: string;
  option?: Option;
  textOptionValue?: SubmissionOption;
  rows?: number;
  multiline?: boolean;
}) => {
  const control = useReactForm((state) => state.control);

  const defaultValue = option
    ? { ...option, value: textOptionValue?.inputText ?? "" }
    : undefined;

  return (
    <Controller
      name={name}
      control={control}
      defaultValue={defaultValue}
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
