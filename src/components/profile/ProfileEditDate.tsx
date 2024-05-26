import { Controller } from "react-hook-form";
import type { UseControllerProps } from "react-hook-form";
import type { UpdateProfileSchema } from "@/server/schema/profile.schema";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import "dayjs/locale/en-gb";

type ProfileEditDateType = {
  controllerProps: UseControllerProps<UpdateProfileSchema>;
  label: string;
};

export const ProfileEditDate = ({
  controllerProps,
  label,
}: ProfileEditDateType) => {
  return (
    <Controller
      {...controllerProps}
      render={({ field: { onChange, value } }) => (
        <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="en-gb">
          <DatePicker
            format="DD/MM/YYYY"
            label={label}
            value={value ? dayjs(value) : undefined}
            onChange={onChange}
          />
        </LocalizationProvider>
      )}
    />
  );
};
