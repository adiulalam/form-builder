import type { Option } from "@prisma/client";
import type { Dispatch, SetStateAction } from "react";
import { Controller } from "react-hook-form";
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
  return (
    <Controller
      name={name}
      control={control}
      rules={{
        required: { value: true, message: "Required Field" },
      }}
      render={({ field: { onChange }, fieldState: { error } }) => (
        <FormControl fullWidth error={!!error}>
          <InputLabel>{label}</InputLabel>
          <Select
            onChange={(e) => {
              const value = e.target.value as unknown as Option;
              console.log("🚀 ~ file: DropdownField.tsx:38 ~ value:", value);

              const isOtherField = options.find(
                (option) => option.id === value.id,
              );
              setShowOtherField(!!isOtherField?.showInput);

              onChange(value);
            }}
            label={label}
            defaultValue=""
          >
            {options.map((option, index) => (
              <MenuItem key={index} value={option as never}>
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
