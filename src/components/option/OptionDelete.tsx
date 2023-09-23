import { ListItemIcon, ListItemText, MenuItem } from "@mui/material";
import { Delete as DeleteIcon } from "@mui/icons-material";
import { api } from "@/utils/api";
import { useContext } from "react";
import { FormContext, QuestionContext } from "@/store";

export const OptionDelete = ({ handleClose }: { handleClose: () => void }) => {
  const { form } = api.useContext();
  const { id: formId } = useContext(FormContext);
  const { id: questionId, options } = useContext(QuestionContext);

  const { mutate } = api.option.deleteAllOptions.useMutation({
    onSuccess: () => form.getPrivateForm.invalidate({ id: formId }),
  });

  const onClickHandler = () => {
    mutate({ id: questionId });
    handleClose();
  };

  return (
    <MenuItem
      onClick={onClickHandler}
      disabled={options && options?.length <= 0}
    >
      <ListItemIcon>
        <DeleteIcon />
      </ListItemIcon>
      <ListItemText>Delete All Options</ListItemText>
    </MenuItem>
  );
};
