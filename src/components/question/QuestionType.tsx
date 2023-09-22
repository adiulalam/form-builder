import type { SvgIconComponent } from "@mui/icons-material";
import type { Type } from "@prisma/client";
import { ListItemIcon, ListItemText, MenuItem } from "@mui/material";
import {
  ArrowDropDownCircle as ArrowDropDownCircleIcon,
  CheckBox as CheckBoxIcon,
  RadioButtonChecked as RadioButtonCheckedIcon,
  Keyboard as KeyboardIcon,
} from "@mui/icons-material";
import { api } from "@/utils/api";
import { useContext } from "react";
import { FormContext, QuestionContext } from "@/store";

type TypeMap = {
  type: Type;
  Icon: SvgIconComponent;
}[];

export const QuestionType = ({ handleClose }: { handleClose: () => void }) => {
  const { id: formId } = useContext(FormContext);
  const { id: questionId, type: currentType } = useContext(QuestionContext);

  const { form } = api.useContext();

  const { mutate } = api.question.updateQuestionType.useMutation({
    onSuccess: () => form.getPrivateForm.invalidate({ id: formId }),
  });

  const onClickHandler = ({ type }: { type: Type }) => {
    mutate({
      body: { type },
      params: { id: questionId },
    });
    handleClose();
  };

  const typeMap: TypeMap = [
    {
      type: "DROPDOWN",
      Icon: ArrowDropDownCircleIcon,
    },
    {
      type: "CHECKBOX",
      Icon: CheckBoxIcon,
    },
    {
      type: "RADIO",
      Icon: RadioButtonCheckedIcon,
    },
    {
      type: "INPUT",
      Icon: KeyboardIcon,
    },
  ];

  return typeMap.map(({ type, Icon }, index) => (
    <MenuItem
      onClick={() => onClickHandler({ type })}
      key={index}
      disabled={type === currentType}
    >
      <ListItemIcon>
        <Icon />
      </ListItemIcon>
      <ListItemText>
        {currentType ? `Change to ${type}` : `Add ${type}`}
      </ListItemText>
    </MenuItem>
  ));
};
