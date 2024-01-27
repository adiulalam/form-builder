import type { Dispatch, SetStateAction } from "react";
import { useEffect, useContext } from "react";
import { Controller, useWatch } from "react-hook-form";
import {
  FormControl,
  FormControlLabel,
  FormHelperText,
  Radio,
  RadioGroup,
} from "@mui/material";
import { QuestionContext, useReactForm } from "@/store";

export const RadioField = ({
  name,
  setShowOtherField,
}: {
  name: string;
  setShowOtherField: Dispatch<SetStateAction<boolean>>;
}) => {
  const { options, submissionOptions } = useContext(QuestionContext);
  const control = useReactForm((state) => state.control);

  const watch = useWatch({ control, name });

  const defaultValue = options?.find(
    (option) => option.id === submissionOptions?.[0]?.optionId,
  );

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
      defaultValue={defaultValue}
      render={({ field: { onChange, value }, fieldState: { error } }) => (
        <FormControl fullWidth error={!!error}>
          <RadioGroup
            onChange={(e) => {
              const id = e.target.value;
              const value = options?.find((option) => option.id === id);

              const isOtherField = options?.find(
                (option) => option.id === value?.id,
              );
              setShowOtherField(!!isOtherField?.showInput);

              onChange(value);
            }}
            defaultValue=""
            row={true}
          >
            {options?.map((option, index) => (
              <FormControlLabel
                key={index}
                value={option.id}
                control={<Radio checked={option.id === value?.id} />}
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
