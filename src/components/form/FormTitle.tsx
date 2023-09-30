import type { Dispatch, FocusEvent, FormEvent, SetStateAction } from "react";
import { Input, Box } from "@mui/material";
import { api } from "@/utils/api";
import { useContext, useEffect, useRef, useState } from "react";
import { FormContext } from "@/store";

export const FormTitle = ({
  isReadOnly,
  setIsReadOnly,
  isClickEdit = false,
}: {
  isClickEdit?: boolean;
  isReadOnly: boolean;
  setIsReadOnly: Dispatch<SetStateAction<boolean>>;
}) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const { id, title, questions } = useContext(FormContext);
  const [input, setInput] = useState<string>(title);

  const { form } = api.useContext();
  const { mutate } = api.form.updateFormTitle.useMutation({
    onSuccess: () =>
      questions
        ? form.getPrivateForm.invalidate({ id })
        : form.getForms.invalidate(),
  });

  const onSubmitHandler = (
    e:
      | FormEvent<HTMLFormElement>
      | FocusEvent<HTMLTextAreaElement | HTMLInputElement, Element>,
  ) => {
    e.preventDefault();

    mutate({
      body: { title: input },
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
        readOnly={isReadOnly}
        value={input}
        onChange={(e) => setInput(e.target.value)}
        disableUnderline={isReadOnly && !isClickEdit}
        inputRef={inputRef}
        onBlur={(e) => !isReadOnly && isClickEdit && onSubmitHandler(e)}
        className="text-2xl"
        onClick={() => isClickEdit && setIsReadOnly(false)}
        multiline
      />
    </Box>
  );
};
