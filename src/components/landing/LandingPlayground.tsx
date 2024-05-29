import { FormProvider } from "@/store";
import { QuestionCards } from "../question";
import { PlaygroundProvider } from "@/store/PlaygroundProvider";
import { usePlaygroundReducer } from "@/hooks";
import { Status } from "@prisma/client";
import { Button } from "@mui/material";
import { LadingAddQuestions } from ".";

const oppositeStatus = {
  [Status.COMPLETED]: Status.DRAFT,
  [Status.DRAFT]: Status.COMPLETED,
};

export const LandingPlayground = () => {
  const [state, dispatch] = usePlaygroundReducer();
  if (!state.isPlayground) return null;
  console.log("🚀 ~ LandingPlayground ~ state:", state);

  return (
    <div className="m-auto flex h-full w-full flex-wrap items-center justify-evenly gap-4 p-2">
      <Button
        variant="outlined"
        color={state.form.status === "DRAFT" ? "error" : "primary"}
        onClick={() =>
          dispatch({
            type: "changeFormStatus",
            payload: { status: oppositeStatus[state.form.status] },
          })
        }
      >
        Change status to {oppositeStatus[state.form.status]}
      </Button>
      <LadingAddQuestions dispatch={dispatch} />
      <PlaygroundProvider store={{ ...state, dispatch }}>
        <FormProvider store={state.form}>
          <QuestionCards />
        </FormProvider>
      </PlaygroundProvider>
    </div>
  );
};
