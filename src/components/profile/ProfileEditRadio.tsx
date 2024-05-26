import { Controller } from "react-hook-form";
import type { UseControllerProps } from "react-hook-form";
import {
  FormControl,
  FormControlLabel,
  FormHelperText,
  FormLabel,
  Radio,
  RadioGroup,
} from "@mui/material";
import type { UpdateProfileSchema } from "@/server/schema/profile.schema";

type ProfileEditTextFieldType = {
  controllerProps: UseControllerProps<UpdateProfileSchema>;
  options: string[];
  label: string;
};

export const ProfileEditRadio = ({
  controllerProps,
  options,
  label,
}: ProfileEditTextFieldType) => {
  return (
    <Controller
      {...controllerProps}
      render={({ field: { onChange, value }, fieldState: { error } }) => (
        <FormControl error={!!error} fullWidth>
          <FormLabel>{label}</FormLabel>
          <RadioGroup onChange={onChange} row={true}>
            {options.map((option, index) => (
              <FormControlLabel
                key={index}
                value={option}
                control={<Radio checked={option === value} />}
                label={option}
              />
            ))}
          </RadioGroup>
          <FormHelperText>{error ? error.message : null}</FormHelperText>
        </FormControl>
      )}
    />
  );
};
