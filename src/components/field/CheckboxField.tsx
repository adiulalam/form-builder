import type { Option } from "@prisma/client";
import type { Dispatch, SetStateAction } from "react";
import { useEffect, useContext } from "react";
import { Controller } from "react-hook-form";
import {
  FormControl,
  FormHelperText,
  FormGroup,
  Checkbox,
  FormControlLabel,
} from "@mui/material";
import { QuestionContext, SubmissionContext, useReactForm } from "@/store";
import { useWatch } from "react-hook-form";

export const CheckboxField = ({
  name,
  setShowOtherField,
}: {
  name: string;
  setShowOtherField: Dispatch<SetStateAction<boolean>>;
}) => {
  const { options, submissionOptions } = useContext(QuestionContext);
  const { status } = useContext(SubmissionContext);
  const control = useReactForm((state) => state.control);

  const watch = useWatch({ control, name });

  useEffect(() => {
    if (!watch) {
      setShowOtherField(false);
    }
  }, [watch, setShowOtherField]);

  const defaultValues = options?.filter(
    (option) =>
      submissionOptions?.find(({ optionId }) => option.id === optionId),
  );
  const disabled = status === "COMPLETED";

  return (
    <Controller
      name={name}
      control={control}
      rules={{
        required: { value: true, message: "Required Field" },
      }}
      // Had to use `any` to make eslint shut up.
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-explicit-any
      defaultValue={defaultValues as any}
      render={({ field: { onChange, value }, fieldState: { error } }) => (
        <FormControl disabled={disabled} error={!!error} fullWidth>
          <FormGroup
            onChange={(e) => {
              const newValue = (value as unknown as Option[]) ?? [];
              const checked = (e.target as HTMLInputElement).checked;
              const id = (e.target as HTMLInputElement).value;
              const selectedValue = options?.find((option) => option.id === id);

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
            // defaultValue=""
            row={true}
          >
            {options?.map((option, index) => (
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
