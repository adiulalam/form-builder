import { FormProvider, useReactHookForm } from "@/store";
import { QuestionCards } from "../question";
import { PlaygroundProvider } from "@/store/PlaygroundProvider";
import { usePlaygroundReducer } from "@/hooks";
import { LandingAddQuestions, LandingChangeStatus } from ".";
import { Box } from "@mui/material";

export const LandingPlayground = () => {
  const [state, dispatch] = usePlaygroundReducer();
  useReactHookForm();

  if (!state.isPlayground) return null;

  return (
    <Box className="flex w-full flex-wrap items-center justify-center gap-4 p-2">
      <LandingChangeStatus state={state} dispatch={dispatch} />
      <LandingAddQuestions dispatch={dispatch} state={state} />
      <PlaygroundProvider store={{ ...state, dispatch }}>
        <FormProvider store={state.form}>
          <QuestionCards />
        </FormProvider>
      </PlaygroundProvider>
    </Box>
  );
};
