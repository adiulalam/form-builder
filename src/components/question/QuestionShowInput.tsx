import { ListItemIcon, ListItemText, MenuItem } from "@mui/material";
import { Keyboard as KeyboardIcon } from "@mui/icons-material";
import { api } from "@/utils/api";
import { useContext } from "react";
import { FormContext, QuestionContext } from "@/store";

export const QuestionShowInput = ({
  handleClose,
}: {
  handleClose: () => void;
}) => {
  const { id: formId } = useContext(FormContext);
  const { id: questionId, showInput } = useContext(QuestionContext);
  const { form } = api.useContext();

  const { mutate } = api.question.updateQuestionShowInput.useMutation({
    onSuccess: () => form.getPrivateForm.invalidate({ id: formId }),
  });

  const onClickHandler = () => {
    mutate({ params: { id: questionId }, body: { showInput: !showInput } });
    handleClose();
  };

  return (
    <MenuItem onClick={onClickHandler}>
      <ListItemIcon>
        <KeyboardIcon />
      </ListItemIcon>
      <ListItemText>
        {showInput ? "Remove" : "Add"} &apos;Other&apos; input field
      </ListItemText>
    </MenuItem>
  );
};
