import { IconButton, Tooltip, Zoom } from "@mui/material";
import { api } from "@/utils/api";
import { useContext } from "react";
import {
  KeyboardArrowUp as KeyboardArrowUpIcon,
  KeyboardArrowDown as KeyboardArrowDownIcon,
} from "@mui/icons-material";
import { FormContext, QuestionContext } from "@/store";

export const QuestionOrder = ({ isUp }: { isUp: boolean }) => {
  const {
    id: currentQuestionId,
    index: currentQuestionIndex,
    order: currentQuestionOrder,
  } = useContext(QuestionContext);

  const { id: formId, questions } = useContext(FormContext);
  const { form } = api.useContext();

  const { mutate } = api.question.updateQuestionOrder.useMutation({
    onSuccess: () => form.getPrivateForm.invalidate({ id: formId }),
  });

  const onClickHandler = () => {
    if (
      currentQuestionIndex === undefined ||
      !questions ||
      currentQuestionIndex < 0 ||
      currentQuestionIndex >= questions?.length
    )
      return;

    const body: { id: string; order: number }[] = [];

    if (isUp && currentQuestionIndex > 0) {
      const prevQuestion = questions[currentQuestionIndex - 1];
      if (!prevQuestion) return;

      const { id: prevQuestionId, order: prevQuestionOrder } = prevQuestion;

      body.push(
        { id: currentQuestionId, order: prevQuestionOrder },
        { id: prevQuestionId, order: currentQuestionOrder },
      );
    } else if (!isUp && currentQuestionIndex < questions.length - 1) {
      const nextQuestion = questions[currentQuestionIndex + 1];
      if (!nextQuestion) return;

      const { id: nextQuestionId, order: nextQuestionOrder } = nextQuestion;

      body.push(
        { id: currentQuestionId, order: nextQuestionOrder },
        { id: nextQuestionId, order: currentQuestionOrder },
      );
    }

    if (body.length !== 2) return;

    mutate(body);
  };

  return (
    <Tooltip title={isUp ? "Move UP the question" : "Move Down the question"}>
      <span>
        <IconButton
          onClick={onClickHandler}
          disabled={
            (isUp && currentQuestionIndex === 0) ||
            (!isUp &&
              questions &&
              currentQuestionIndex === questions.length - 1)
          }
        >
          {isUp ? (
            <Zoom in={isUp}>
              <KeyboardArrowUpIcon />
            </Zoom>
          ) : (
            <KeyboardArrowDownIcon />
          )}
        </IconButton>
      </span>
    </Tooltip>
  );
};
