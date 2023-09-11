import { MenuItem } from "@mui/material";
import { api } from "@/utils/api";
import { useContext } from "react";
import { FormsContext } from "@/store/FormsProvider";
import { FormContext } from "@/store/FormProvider";

export const FormDelete = ({ handleClose }: { handleClose: () => void }) => {
  const { id } = useContext(FormContext);
  const { refetch } = useContext(FormsContext);

  const { mutate } = api.form.deleteForm.useMutation({
    onSuccess: () => refetch(),
  });

  const onClickHandler = () => {
    mutate({ id });
    handleClose();
  };

  return <MenuItem onClick={onClickHandler}>Delete</MenuItem>;
};
