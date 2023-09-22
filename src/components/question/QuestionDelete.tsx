import { ListItemIcon, ListItemText, MenuItem } from "@mui/material";
import { Delete as DeleteIcon } from "@mui/icons-material";
import { api } from "@/utils/api";
import { useContext } from "react";
import { FormContext, QuestionContext } from "@/store";

export const QuestionDelete = ({
  handleClose,
}: {
  handleClose: () => void;
}) => {
  const { id: formId } = useContext(FormContext);
  const { id: questionId } = useContext(QuestionContext);
  const { form } = api.useContext();

  const { mutate } = api.question.deleteQuestion.useMutation({
    onSuccess: () => form.getPrivateForm.invalidate({ id: formId }),
  });

  const onClickHandler = () => {
    mutate({ id: questionId });
    handleClose();
  };

  return (
    <MenuItem onClick={onClickHandler}>
      <ListItemIcon>
        <DeleteIcon />
      </ListItemIcon>
      <ListItemText>Delete</ListItemText>
    </MenuItem>
  );
};
