import { useRouter } from "next/router";
import { FormContext, QuestionProvider, useReactHookForm } from "@/store";
import { FormNavbar, FormSubmit } from "@/components/form";
import { Box, Paper, Grow } from "@mui/material";
import { QuestionAdd, QuestionCard } from "@/components/question";
import { TransitionGroup } from "react-transition-group";
import type { SubmitHandler } from "react-hook-form";
import { useContext } from "react";
import type { Option } from "@prisma/client";
import { api } from "@/utils/api";

export const QuestionContainer = ({ isFetching }: { isFetching: boolean }) => {
  const router = useRouter();
  const isEditor = router.pathname === "/form/[id]";
  const formData = useContext(FormContext);
  const { handleSubmit, reset, defaultValues } = useReactHookForm();

  const { mutate, isLoading } = api.form.submitForm.useMutation({
    onSuccess: (data) => {
      reset();
      console.log(
        "🚀 ~ file: QuestionContainer.tsx:20 ~ QuestionContainer ~ data:",
        data,
      );
    },
  });

  const onSubmit: SubmitHandler<Record<string, Option>> = (data) => {
    if (isEditor) return;
    console.log(data);

    const filteredKeys = Object.keys(data).filter(
      (id) => Array.isArray(data[id]) || id !== data[id]?.id,
    );

    const filtertedData = filteredKeys.reduce((acc, id) => {
      if (Array.isArray(data[id])) {
        const arr = data[id] as unknown as Option[];
        acc.push(...arr);
      } else {
        const obj = data[id] as unknown as Option;
        acc.push(obj);
      }
      return acc;
    }, [] as Option[]);

    console.log(
      "🚀 ~ file: QuestionContainer.tsx:37 ~ filtertedData ~ filtertedData:",
      filtertedData,
    );

    const submissionOptions = filtertedData.map((option) => ({
      optionId: option.id,
      inputText: option.isOtherOption ? data[option.id]?.value ?? "" : "",
    }));

    const submitData = {
      formId: formData.id,
      submissionOptions,
    };

    console.log(
      "🚀 ~ file: QuestionContainer.tsx:47 ~ QuestionContainer ~ submissionOptions:",
      submissionOptions,
    );

    // mutate(submitData);
    reset();
  };

  return (
    <Box className="flex min-h-screen w-full flex-col items-center justify-center gap-6">
      <Paper className="w-full max-w-screen-xl p-2">
        <FormNavbar isFetching={isFetching} />
      </Paper>

      <form
        onSubmit={handleSubmit(onSubmit) as () => void}
        className="m-auto flex h-full w-full flex-col flex-wrap items-center justify-evenly gap-4"
      >
        <TransitionGroup className="flex h-full w-full flex-col flex-wrap items-center justify-evenly gap-4">
          {formData.questions?.map((question, index) => (
            <Grow key={question.id}>
              <Box maxWidth={"xl"} className="flex w-full">
                <QuestionProvider store={{ ...question, index }}>
                  <QuestionCard />
                </QuestionProvider>
              </Box>
            </Grow>
          ))}
        </TransitionGroup>
        {isEditor ? <QuestionAdd /> : <FormSubmit />}
      </form>
    </Box>
  );
};
