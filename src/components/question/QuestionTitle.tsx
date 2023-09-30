import type { FocusEvent, FormEvent } from "react";
import { Input, Box } from "@mui/material";
import { api } from "@/utils/api";
import { useContext, useEffect, useRef, useState } from "react";
import { FormContext, QuestionContext } from "@/store";

export const QuestionTitle = () => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [isReadOnly, setIsReadOnly] = useState<boolean>(true);
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
      | FocusEvent<HTMLTextAreaElement | HTMLInputElement, Element>,
  ) => {
    e.preventDefault();

    mutate({
      body: { question: input },
      params: { id },
    });
    setIsReadOnly(true);
  };

  useEffect(() => {
    if (!isReadOnly) inputRef.current?.focus();
  }, [isReadOnly]);

  return (
    <Box className="w-auto">
      <Input
        fullWidth
        readOnly={isReadOnly || status === "COMPLETED"}
        value={input}
        onChange={(e) => setInput(e.target.value)}
        disableUnderline={isReadOnly && status === "COMPLETED"}
        inputRef={inputRef}
        onBlur={(e) => !isReadOnly && status === "DRAFT" && onSubmitHandler(e)}
        className="text-2xl"
        onClick={() => setIsReadOnly(false)}
        multiline
      />
    </Box>
  );
};
