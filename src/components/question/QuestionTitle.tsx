import type { FocusEvent, FormEvent } from "react";
import { Input, Box } from "@mui/material";
import { api } from "@/utils/api";
import { useContext, useState } from "react";
import { FormContext, QuestionContext } from "@/store";
import { usePlaygroundContext } from "@/store/PlaygroundProvider";

export const QuestionTitle = () => {
  const playground = usePlaygroundContext();
  const { id, question, formId } = useContext(QuestionContext);
  const { status } = useContext(FormContext);
  const [input, setInput] = useState<string>(question);

  const { form } = api.useContext();
  const { mutate } = api.question.updateQuestionTitle.useMutation({
    onSuccess: () => form.getPrivateForm.invalidate({ id: formId }),
  });

  const onSubmitHandler = (
    e:
      | FormEvent<HTMLFormElement>
      | FocusEvent<HTMLTextAreaElement | HTMLInputElement, Element>
  ) => {
    e.preventDefault();

    if (playground.isPlayground) {
      const payload = { title: input, id };
      playground.dispatch({ type: "changeQuestionName", payload });
    } else {
      mutate({
        body: { question: input },
        params: { id },
      });
    }
  };

  return (
    <Box className="w-auto">
      <Input
        fullWidth
        readOnly={status === "COMPLETED"}
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onBlur={(e) => status === "DRAFT" && onSubmitHandler(e)}
        className="text-2xl"
        multiline
      />
    </Box>
  );
};
