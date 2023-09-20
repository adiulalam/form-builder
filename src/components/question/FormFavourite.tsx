import { IconButton, Tooltip, Zoom } from "@mui/material";
import { api } from "@/utils/api";
import { useContext } from "react";
import {
  KeyboardArrowUp as KeyboardArrowUpIcon,
  KeyboardArrowDown as KeyboardArrowDownIcon,
} from "@mui/icons-material";
import { FormContext } from "@/store";

export const QuestionOrder = ({ isUp }: { isUp: boolean }) => {
  // const { isFavourite, id, questions } = useContext(FormContext);
  // const { form } = api.useContext();

  // const { mutate } = api.form.updateFormFavourite.useMutation({
  //   onSuccess: () =>
  //     questions
  //       ? form.getPrivateForm.invalidate({ id })
  //       : form.getForms.invalidate(),
  // });

  // const onClickHandler = () => {
  //   mutate({ body: { isFavourite: !isFavourite }, params: { id } });
  // };

  return (
    <Tooltip title={isUp ? "Move UP the question" : "Move Down the question"}>
      <IconButton
      // onClick={onClickHandler}
      >
        {isUp ? (
          <Zoom in={isUp}>
            <KeyboardArrowUpIcon />
          </Zoom>
        ) : (
          <KeyboardArrowDownIcon />
        )}
      </IconButton>
    </Tooltip>
  );
};
