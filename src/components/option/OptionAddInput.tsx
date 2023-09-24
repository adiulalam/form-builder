import { ListItemIcon, ListItemText, MenuItem } from "@mui/material";
import { Keyboard as KeyboardIcon } from "@mui/icons-material";
import { api } from "@/utils/api";
import { useContext } from "react";
import { FormContext, QuestionContext } from "@/store";

export const OptionAddInput = ({
  handleClose,
}: {
  handleClose: () => void;
}) => {
  const { form } = api.useContext();
  const { id: formId } = useContext(FormContext);
  const { id: questionId, options } = useContext(QuestionContext);

  const { mutate } = api.option.createOrDeleteOption.useMutation({
    onSuccess: () => form.getPrivateForm.invalidate({ id: formId }),
  });

  const isOtherOption = !!options?.find((option) => option.showInput);

  const onClickHandler = () => {
    mutate({ questionId, isOtherOption });
    handleClose();
  };

  return (
    <MenuItem onClick={onClickHandler}>
      <ListItemIcon>
        <KeyboardIcon />
      </ListItemIcon>
      <ListItemText>
        {isOtherOption ? "Remove" : "Add"} &apos;Other&apos; input field
      </ListItemText>
    </MenuItem>
  );
};
