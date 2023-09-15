import { MenuItem } from "@mui/material";
import { api } from "@/utils/api";
import { useContext } from "react";
import { FormContext } from "@/store/FormProvider";

export const FormStatus = ({ handleClose }: { handleClose: () => void }) => {
  const { id, status } = useContext(FormContext);
  const { form } = api.useContext();

  const { mutate } = api.form.updateFormStatus.useMutation({
    onSuccess: () => form.getForms.invalidate(),
  });

  const onClickHandler = () => {
    mutate({
      body: { status: status === "DRAFT" ? "COMPLETED" : "DRAFT" },
      params: { id },
    });
    handleClose();
  };

  return status === "DRAFT" ? (
    <MenuItem onClick={onClickHandler}>Mark as Completed</MenuItem>
  ) : (
    <MenuItem onClick={onClickHandler}>Mark as Draft</MenuItem>
  );
};
