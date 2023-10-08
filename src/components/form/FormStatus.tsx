import { ListItemIcon, ListItemText, MenuItem } from "@mui/material";
import {
  EditNote as EditNoteIcon,
  CheckCircle as CheckCircleIcon,
} from "@mui/icons-material";
import { api } from "@/utils/api";
import { useContext } from "react";
import { FormContext } from "@/store";

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

  return (
    <MenuItem onClick={onClickHandler}>
      <ListItemIcon>
        {status === "DRAFT" ? <CheckCircleIcon /> : <EditNoteIcon />}
      </ListItemIcon>
      <ListItemText>
        {status === "DRAFT" ? "Mark as Completed" : "Mark as Draft"}
      </ListItemText>
    </MenuItem>
  );
};
