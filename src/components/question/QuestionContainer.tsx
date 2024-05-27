import { useRouter } from "next/router";
import {
  FormContext,
  SubmissionContext,
  useReactHookForm,
  useSnackbarToast,
} from "@/store";
import { FormNavbar, FormSubmit } from "@/components/form";
import { Box, Paper, Backdrop, CircularProgress } from "@mui/material";
import { QuestionAdd, QuestionCards } from "@/components/question";
import type { SubmitHandler } from "react-hook-form";
import { useContext } from "react";
import type { Option } from "@prisma/client";
import { api } from "@/utils/api";

export const QuestionContainer = ({ isFetching }: { isFetching: boolean }) => {
  const router = useRouter();
  const isEditor = router.pathname === "/form/[id]";
  const formData = useContext(FormContext);
  const { form } = api.useContext();
  const { id: submissionId } = useContext(SubmissionContext);
  const setSnackConfig = useSnackbarToast((state) => state.setSnackConfig);
  const { handleSubmit } = useReactHookForm();

  const { mutate, isLoading } = api.form.submitForm.useMutation({
    onSuccess: () => {
      setSnackConfig({
        isOpen: true,
        severity: "success",
        message: "Form has been submitted",
      });
      void form.getPublicForm.invalidate({ id: formData.id });
    },
    onError: (error) =>
      setSnackConfig({
        isOpen: true,
        severity: "error",
        message: error.message,
      }),
  });

  const onSubmit: SubmitHandler<Record<string, Option>> = (data) => {
    if (isEditor) return;

    const filteredKeys = Object.keys(data).filter(
      (id) => Array.isArray(data[id]) || id !== data[id]?.id
    );

    const filtertedData = filteredKeys.map((id) => data[id]).flat() as Option[];

    const submissionOptions = filtertedData.map((option) => ({
      optionId: option.id,
      questionId: option.questionId,
      inputText: option.isOtherOption
        ? data[option.id]?.value ?? ""
        : option.showInput
        ? option.value
        : "",
    }));

    const submitData = {
      formId: formData.id,
      submissionId,
      submissionOptions,
    };

    mutate(submitData);
  };

  return (
    <Box className="flex min-h-screen w-full flex-col items-center justify-center gap-6">
      <Paper
        className="w-full max-w-screen-xl p-2"
        elevation={0}
        variant="outlined"
      >
        <FormNavbar isFetching={isFetching} />
      </Paper>

      <form
        onSubmit={handleSubmit(onSubmit) as () => void}
        className="m-auto flex h-full w-full flex-col flex-wrap items-center justify-evenly gap-4"
      >
        <QuestionCards />
        {isEditor ? <QuestionAdd /> : <FormSubmit />}
      </form>

      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={isLoading}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    </Box>
  );
};
