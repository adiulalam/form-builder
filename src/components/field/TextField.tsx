import { Controller } from "react-hook-form";
import {
  FormControl,
  FormHelperText,
  TextField as MuiTextField,
} from "@mui/material";
import type { Option, SubmissionOption } from "@prisma/client";
import { SubmissionContext, useReactForm } from "@/store";
import { useContext } from "react";

export const TextField = ({
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
  const { status } = useContext(SubmissionContext);
  const disabled = status === "COMPLETED";

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
          <MuiTextField
            error={!!error}
            onChange={(e) => {
              onChange({ ...option, value: e.target.value });
            }}
            label={option?.value ?? "Unknown"}
            multiline={multiline}
            rows={rows}
            value={value}
            disabled={disabled}
          />
          <FormHelperText>{error ? error.message : null}</FormHelperText>
        </FormControl>
      )}
    />
  );
};
