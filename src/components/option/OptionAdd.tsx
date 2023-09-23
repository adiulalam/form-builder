import { Tooltip, Fab, Fade, Backdrop, CircularProgress } from "@mui/material";
import { Add as AddIcon } from "@mui/icons-material";
import {
  type MutableRefObject,
  useContext,
  useEffect,
  useCallback,
} from "react";
import { FormContext, QuestionContext } from "@/store";
import { api } from "@/utils/api";

export const OptionAdd = ({
  value,
  autocompleteRef,
}: {
  value: string;
  autocompleteRef: MutableRefObject<HTMLInputElement | null>;
}) => {
  const { form } = api.useContext();
  const { id } = useContext(FormContext);
  const { id: questionId } = useContext(QuestionContext);

  const { mutate, isLoading } = api.option.createOption.useMutation({
    onSuccess: () => form.getPrivateForm.invalidate({ id }),
  });

  const onSubmitHandler = useCallback(() => {
    mutate({
      value,
      questionId,
    });
  }, [mutate, questionId, value]);

  useEffect(() => {
    const handlekeydownEvent = (e: KeyboardEvent) =>
      e.key === "Enter" && onSubmitHandler();

    const enterKeyPressed = autocompleteRef.current;
    enterKeyPressed?.addEventListener("keydown", handlekeydownEvent);

    return () =>
      enterKeyPressed?.removeEventListener("keydown", handlekeydownEvent);
  }, [autocompleteRef, onSubmitHandler]);

  return (
    <>
      <Tooltip title="Add Value">
        <Fade in={true} timeout={500} className="bg-primary">
          <Fab
            size="small"
            onClick={() => value && onSubmitHandler()}
            style={{ transform: "scale(0.6)" }}
          >
            <AddIcon />
          </Fab>
        </Fade>
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
