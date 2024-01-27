import { Controller } from "react-hook-form";
import { FormControl, FormHelperText, TextField } from "@mui/material";
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
        validate: {
          required: ({ value }) => (value ? true : "Required Field"),
        },
      }}
      render={({
        field: {
          onChange,
          value: { value },
        },
        fieldState: { error },
      }) => (
        <FormControl error={!!error} fullWidth>
          <TextField
            error={!!error}
            onChange={(e) => {
              onChange({ ...option, value: e.target.value });
            }}
            label={option?.value ?? "Unknown"}
            multiline={multiline}
            rows={rows}
            value={value}
          />
          <FormHelperText>{error ? error.message : null}</FormHelperText>
        </FormControl>
      )}
    />
  );
};
