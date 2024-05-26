import { Controller } from "react-hook-form";
import type { UseControllerProps } from "react-hook-form";
import {
  FormControl,
  FormHelperText,
  TextField as MuiTextField,
} from "@mui/material";
import type { TextFieldProps } from "@mui/material";
import type { UpdateProfileSchema } from "@/server/schema/profile.schema";

type ProfileEditTextFieldType = {
  controllerProps: UseControllerProps<UpdateProfileSchema>;
  fieldProps: TextFieldProps;
};

export const ProfileEditTextField = ({
  controllerProps,
  fieldProps,
}: ProfileEditTextFieldType) => {
  return (
    <Controller
      {...controllerProps}
      render={({ field: { onChange, value }, fieldState: { error } }) => (
        <FormControl error={!!error} fullWidth>
          <MuiTextField
            {...fieldProps}
            error={!!error}
            onChange={onChange}
            value={value ?? undefined}
          />
          <FormHelperText>{error ? error.message : null}</FormHelperText>
        </FormControl>
      )}
    />
  );
};
