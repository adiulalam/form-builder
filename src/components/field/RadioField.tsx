import type { Option } from "@prisma/client";
import type { Dispatch, SetStateAction } from "react";
import { Controller } from "react-hook-form";
import {
  FormControl,
  FormControlLabel,
  FormHelperText,
  Radio,
  RadioGroup,
} from "@mui/material";
import { useReactForm } from "@/store";

export const RadioField = ({
  name,
  options,
  setShowOtherField,
}: {
  name: string;
  options: Option[];
  setShowOtherField: Dispatch<SetStateAction<boolean>>;
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
        <FormControl fullWidth error={!!error}>
          <RadioGroup
            onChange={(e) => {
              const id = e.target.value;
              const value = options.find((option) => option.id === id);

              const isOtherField = options.find(
                (option) => option.id === value?.id,
              );
              setShowOtherField(!!isOtherField?.showInput);

              onChange(value);
            }}
            defaultValue=""
            row={true}
          >
            {options.map((option, index) => (
              <FormControlLabel
                key={index}
                value={option.id}
                control={<Radio />}
                label={option.value}
              />
            ))}
          </RadioGroup>
          <FormHelperText>{error ? error.message : null}</FormHelperText>
        </FormControl>
      )}
    />
  );
};
