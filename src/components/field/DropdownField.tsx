import type { Dispatch, SetStateAction } from "react";
import { useEffect, useContext } from "react";
import { Controller, useWatch } from "react-hook-form";
import {
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";
import { QuestionContext, SubmissionContext, useReactForm } from "@/store";

export const DropdownField = ({
  name,
  setShowOtherField,
}: {
  name: string;
  setShowOtherField: Dispatch<SetStateAction<boolean>>;
}) => {
  const { status } = useContext(SubmissionContext);
  const { options, submissionOptions } = useContext(QuestionContext);
  const control = useReactForm((state) => state.control);

  const label = "Select";

  const watch = useWatch({ control, name });

  useEffect(() => {
    if (!watch) {
      setShowOtherField(false);
    }
  }, [watch, setShowOtherField]);

  const defaultValue = options?.find(
    (option) => option.id === submissionOptions?.[0]?.optionId
  );
  const disabled = status === "COMPLETED";

  return (
    <Controller
      name={name}
      control={control}
      rules={{
        required: { value: true, message: "Required Field" },
      }}
      defaultValue={defaultValue}
      render={({ field: { onChange, value }, fieldState: { error } }) => (
        <FormControl error={!!error} disabled={disabled} fullWidth>
          <InputLabel>{label}</InputLabel>
          <Select
            onChange={(e) => {
              const value = e.target.value;

              const isOtherField = options?.find(
                (option) => option.id === value
              );
              setShowOtherField(!!isOtherField?.showInput);

              onChange(isOtherField);
            }}
            label={label}
            value={value?.id ?? ""}
          >
            {options?.map((option, index) => (
              <MenuItem key={index} value={option.id}>
                {option.value}
              </MenuItem>
            ))}
          </Select>
          <FormHelperText>{error ? error.message : null}</FormHelperText>
        </FormControl>
      )}
    />
  );
};
