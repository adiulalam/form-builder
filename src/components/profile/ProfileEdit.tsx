import type { UpdateProfileSchema } from "@/server/schema/profile.schema";
import { useProfileInfo } from "@/store/ProfileProvider";
import { Card, Typography } from "@mui/material";
import clsx from "clsx";
import { type SubmitHandler, useForm } from "react-hook-form";
import { ProfileEditDate, ProfileEditRadio, ProfileEditTextField } from ".";
import { Save as SaveIcon } from "@mui/icons-material";
import { Gender } from "@prisma/client";
import { api } from "@/utils/api";
import { LoadingButton } from "@mui/lab";
import { useSnackbarToast } from "@/store";

export const ProfileEdit = () => {
  const setSnackConfig = useSnackbarToast((state) => state.setSnackConfig);
  const { name, phone, image, dateOfBirth, gender } = useProfileInfo();
  const { profile } = api.useContext();

  const { mutate, isLoading } = api.profile.updateProfile.useMutation({
    onSuccess: () => {
      setSnackConfig({
        isOpen: true,
        severity: "success",
        message: "Profile has been updated",
      });
      void profile.getProfile.invalidate();
    },
    onError: (error) => {
      setSnackConfig({
        isOpen: true,
        severity: "error",
        message: error.message,
      });
    },
  });

  const {
    handleSubmit,
    control,
    formState: { isDirty },
  } = useForm<UpdateProfileSchema>({
    defaultValues: {
      name,
      phone,
      image,
      dateOfBirth,
      gender,
    },
  });

  const onSubmit: SubmitHandler<UpdateProfileSchema> = (data) => {
    mutate(data);
  };

  return (
    <Card
      variant="outlined"
      className={clsx(
        "md:col-span-2 col-span-3",
        "flex flex-col items-center justify-center shadow-md w-full h-fit p-5 gap-8"
      )}
    >
      <Typography component="h1" className="text-2xl font-bold">
        Edit Profile
      </Typography>
      <form
        onSubmit={handleSubmit(onSubmit) as () => void}
        className="w-full flex flex-col gap-5"
      >
        <ProfileEditTextField
          controllerProps={{ name: "name", control, rules: { required: true } }}
          fieldProps={{ label: "Name", required: true }}
        />
        <ProfileEditTextField
          controllerProps={{
            name: "image",
            control,
            rules: { required: true },
          }}
          fieldProps={{
            label: "Profile Image",
            disabled: true,
            required: true,
          }}
        />
        <ProfileEditTextField
          controllerProps={{
            name: "phone",
            control,
            rules: { required: false },
          }}
          fieldProps={{ label: "Phone", required: false }}
        />
        <ProfileEditRadio
          controllerProps={{
            name: "gender",
            control,
            rules: { required: true },
          }}
          options={Object.keys(Gender)}
          label="Gender *"
        />
        <ProfileEditDate
          controllerProps={{
            name: "dateOfBirth",
            control,
            rules: { required: true },
          }}
          label="Date of Birth *"
        />

        <LoadingButton
          loading={isLoading}
          loadingPosition="end"
          endIcon={<SaveIcon />}
          variant="contained"
          className="flex self-end w-min"
          type="submit"
          disabled={!isDirty}
        >
          <span>Save</span>
        </LoadingButton>
      </form>
    </Card>
  );
};
