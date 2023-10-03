import { Add as AddIcon } from "@mui/icons-material";
import { Fab, Tooltip, Backdrop, CircularProgress } from "@mui/material";
import { api } from "@/utils/api";
import { useContext } from "react";
import { FormContext } from "@/store";

export const QuestionAdd = () => {
  const { id: formId, status, questions } = useContext(FormContext);
  const { form } = api.useContext();

  const { mutate, isLoading } = api.question.createQuestion.useMutation({
    onSuccess: () => form.getPrivateForm.invalidate({ id: formId }),
  });

  const onClickHandler = () => {
    mutate({
      question: `Untitled Question ${
        questions?.length ? questions.length + 1 : 1
      }`,
      formId,
      order: questions ? questions.length + 1 : 1,
    });
  };

  const props = {
    className: "fixed bottom-8 right-8 bg-sdark",
    onClick: onClickHandler,
    disabled: status === "COMPLETED",
  };

  return (
    <>
      <Tooltip title="Add Question">
        {status === "COMPLETED" ? (
          <span>
            <Fab {...props} size={"large"}>
              <AddIcon />
            </Fab>
          </span>
        ) : (
          <Fab {...props} size={"large"}>
            <AddIcon />
          </Fab>
        )}
      </Tooltip>
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={isLoading}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    </>
  );
};
