import type { Option } from "@prisma/client";
import { useEffect, type Dispatch, type SetStateAction } from "react";
import { Controller } from "react-hook-form";
import {
  FormControl,
  FormHelperText,
  FormGroup,
  Checkbox,
  FormControlLabel,
} from "@mui/material";
import { useReactForm } from "@/store";
import { useWatch } from "react-hook-form";

export const CheckboxField = ({
  name,
  options,
  setShowOtherField,
}: {
  name: string;
  options: Option[];
  setShowOtherField: Dispatch<SetStateAction<boolean>>;
}) => {
  const control = useReactForm((state) => state.control);

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
          <FormGroup
            onChange={(e) => {
              const newValue = (value as unknown as Option[]) ?? [];
              const checked = (e.target as HTMLInputElement).checked;
              const id = (e.target as HTMLInputElement).value;
              const selectedValue = options.find((option) => option.id === id);

              let result = [];

              if (checked) {
                result = [...newValue, selectedValue];
                onChange(result);
              } else {
                result = newValue.filter(
                  (value) => value.id !== selectedValue?.id,
                );
                onChange(result);
              }

              const isOtherField = result?.find(
                (option) => option?.isOtherOption,
              );

              setShowOtherField(!!isOtherField?.showInput);
            }}
            defaultValue=""
            row={true}
          >
            {options.map((option, index) => (
              <FormControlLabel
                key={index}
                control={
                  <Checkbox
                    checked={
                      Array.isArray(value) &&
                      value?.some(({ id }) => option.id === id)
                    }
                  />
                }
                label={option.value}
                value={option.id}
              />
            ))}
          </FormGroup>
          <FormHelperText>{error ? error.message : null}</FormHelperText>
        </FormControl>
      )}
    />
  );
};
