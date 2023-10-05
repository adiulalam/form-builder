import { useRouter } from "next/router";
import { FormContext, QuestionProvider, useReactHookForm } from "@/store";
import { FormNavbar, FormSubmit } from "@/components/form";
import { Box, Paper, Grow } from "@mui/material";
import { QuestionAdd, QuestionCard } from "@/components/question";
import { TransitionGroup } from "react-transition-group";
import type { SubmitHandler } from "react-hook-form";
import { useContext } from "react";

export const QuestionContainer = ({ isFetching }: { isFetching: boolean }) => {
  const router = useRouter();
  const isEditor = router.pathname === "/form/[id]";
  const formData = useContext(FormContext);

  const { handleSubmit } = useReactHookForm();

  const onSubmit: SubmitHandler<Record<string, string>> = (data) => {
    if (isEditor) return;
    console.log(data);
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
