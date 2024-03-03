import type { FocusEvent } from "react";
import type { Dispatch, SetStateAction } from "react";
import { Input, Box } from "@mui/material";
import { api } from "@/utils/api";
import { useContext, useRef, useState, useEffect } from "react";
import { FormContext } from "@/store";

type FormTitleType = {
  isReadOnly?: boolean;
  setIsReadOnly?: Dispatch<SetStateAction<boolean>> | null;
};

export const FormTitle = ({
  isReadOnly = true,
  setIsReadOnly = null,
}: FormTitleType) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const { id, title, status, questions } = useContext(FormContext);
  const isCompleted = status === "COMPLETED";
  const [input, setInput] = useState<string>(title);

  const { form } = api.useContext();
  const { mutate } = api.form.updateFormTitle.useMutation({
    onSuccess: () =>
      questions
        ? form.getPrivateForm.invalidate({ id })
        : form.getForms.invalidate(),
  });

  const onSubmitHandler = (
    e: FocusEvent<HTMLTextAreaElement | HTMLInputElement, Element>
  ) => {
    e.preventDefault();

    mutate({
      body: { title: input },
      params: { id },
    });
    setIsReadOnly && setIsReadOnly(true);
  };

  useEffect(() => {
    if (!isReadOnly) inputRef.current?.focus();
  }, [isReadOnly]);

  return (
    <Box className="w-auto">
      <Input
        fullWidth
        readOnly={isReadOnly || isCompleted}
        value={input}
        onChange={(e) => setInput(e.target.value)}
        inputRef={inputRef}
        onBlur={(e) => !isReadOnly && onSubmitHandler(e)}
        onClick={() => !isCompleted && setIsReadOnly && setIsReadOnly(false)}
        className="text-2xl"
        multiline
      />
    </Box>
  );
};
