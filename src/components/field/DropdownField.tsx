import type { Option } from "@prisma/client";
import { useEffect, type Dispatch, type SetStateAction } from "react";
import { Controller, useWatch } from "react-hook-form";
import {
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";
import { useReactForm } from "@/store";

export const DropdownField = ({
  name,
  options,
  setShowOtherField,
}: {
  name: string;
  options: Option[];
  setShowOtherField: Dispatch<SetStateAction<boolean>>;
}) => {
  const control = useReactForm((state) => state.control);

  const label = "Select";

  const watch = useWatch({ control, name });

  useEffect(() => {
    if (!watch) {
      setShowOtherField(false);
    }
  }, [watch, setShowOtherField]);

  return (
    <Controller
      name={name}
      control={control}
      rules={{
        required: { value: true, message: "Required Field" },
      }}
      render={({ field: { onChange, value }, fieldState: { error } }) => (
        <FormControl fullWidth error={!!error}>
          <InputLabel>{label}</InputLabel>
          <Select
            onChange={(e) => {
              const value = e.target.value;

              const isOtherField = options.find(
                (option) => option.id === value,
              );
              setShowOtherField(!!isOtherField?.showInput);

              onChange(isOtherField);
            }}
            label={label}
            defaultValue=""
            value={value?.id ?? value}
          >
            {options.map((option, index) => (
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
