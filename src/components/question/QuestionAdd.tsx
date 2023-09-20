import { Add as AddIcon } from "@mui/icons-material";
import { Fab, Tooltip, Backdrop, CircularProgress } from "@mui/material";
import { api } from "@/utils/api";
import { useContext } from "react";
import { FormContext } from "@/store";

export const QuestionAdd = () => {
  const { id: formId } = useContext(FormContext);
  const { form } = api.useContext();

  const { mutate, isLoading } = api.question.createQuestion.useMutation({
    onSuccess: () => form.getPrivateForm.invalidate({ id: formId }),
  });

  const onClickHandler = () => {
    mutate({ question: "Untitled", formId });
  };

  return (
    <>
      <Tooltip title="Add Form">
        <Fab
          className="fixed bottom-8 right-8 bg-primary"
          size="large"
          onClick={onClickHandler}
        >
          <AddIcon />
        </Fab>
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
