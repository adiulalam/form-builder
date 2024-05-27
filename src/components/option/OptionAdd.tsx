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
import { usePlaygroundContext } from "@/store/PlaygroundProvider";

export const OptionAdd = ({
  value,
  autocompleteRef,
}: {
  value: string;
  autocompleteRef: MutableRefObject<HTMLInputElement | null>;
}) => {
  const playground = usePlaygroundContext();
  const { form } = api.useContext();
  const { id } = useContext(FormContext);
  const { id: questionId } = useContext(QuestionContext);

  const { mutate, isLoading } = api.option.createOption.useMutation({
    onSuccess: () => form.getPrivateForm.invalidate({ id }),
  });

  const onSubmitHandler = useCallback(() => {
    if (playground.isPlayground) {
      const payload = { id: questionId, value };
      playground.dispatch({ type: "addOption", payload });
    } else {
      mutate({
        value,
        questionId,
      });
    }
  }, [mutate, questionId, value, playground]);

  useEffect(() => {
    const handlekeydownEvent = (e: KeyboardEvent) =>
      e.key === "Enter" && onSubmitHandler();

    const enterKeyPressed = autocompleteRef.current;
    enterKeyPressed?.addEventListener("keydown", handlekeydownEvent);

    return () => {
      enterKeyPressed?.removeEventListener("keydown", handlekeydownEvent);
    };
  }, [autocompleteRef, onSubmitHandler]);

  return (
    <>
      <Tooltip title="Add Value">
        <span>
          <Fade in={true} timeout={500} className="bg-primary">
            <Fab
              size="small"
              onClick={() => value && onSubmitHandler()}
              style={{ transform: "scale(0.6)" }}
              disabled={!value}
            >
              <AddIcon />
            </Fab>
          </Fade>
        </span>
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
