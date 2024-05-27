import { FormProvider } from "@/store";
import { QuestionCards } from "../question";
import { PlaygroundProvider } from "@/store/PlaygroundProvider";
import { usePlaygroundReducer } from "@/hooks";

export const LandingPlayground = () => {
  const [state, dispatch] = usePlaygroundReducer();
  if (!state.isPlayground) return null;
  console.log("🚀 ~ LandingPlayground ~ state:", state);

  return (
    <div className="m-auto flex h-full w-full flex-col flex-wrap items-center justify-evenly gap-4 p-2">
      <div>{state.form.title}</div>
      <PlaygroundProvider store={{ ...state, dispatch }}>
        <FormProvider store={state.form}>
          <QuestionCards />
        </FormProvider>
      </PlaygroundProvider>
      <button onClick={() => dispatch({ type: "name" })}>Change name</button>
    </div>
  );
};
