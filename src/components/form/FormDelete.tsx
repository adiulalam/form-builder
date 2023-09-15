import { MenuItem } from "@mui/material";
import { api } from "@/utils/api";
import { useContext } from "react";
import { FormContext } from "@/store/FormProvider";

export const FormDelete = ({ handleClose }: { handleClose: () => void }) => {
  const { id } = useContext(FormContext);
  const { form } = api.useContext();

  const { mutate } = api.form.deleteForm.useMutation({
    onSuccess: () => form.getForms.invalidate(),
  });

  const onClickHandler = () => {
    mutate({ id });
    handleClose();
  };

  return <MenuItem onClick={onClickHandler}>Delete</MenuItem>;
};
