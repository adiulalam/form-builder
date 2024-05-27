import { FormContext, QuestionProvider, useReactHookForm } from "@/store";
import { Box, Grow } from "@mui/material";
import { QuestionCard } from "@/components/question";
import { TransitionGroup } from "react-transition-group";
import { useContext } from "react";

export const QuestionCards = () => {
  useReactHookForm();
  const { questions } = useContext(FormContext);

  return (
    <TransitionGroup className="flex h-full w-full flex-col flex-wrap items-center justify-evenly gap-4">
      {questions?.map((question, index) => (
        <Grow key={question.id}>
          <Box maxWidth={"xl"} className="flex w-full">
            <QuestionProvider store={{ ...question, index }}>
              <QuestionCard key={question.id} />
            </QuestionProvider>
          </Box>
        </Grow>
      ))}
    </TransitionGroup>
  );
};
