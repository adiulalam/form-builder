import type { Dispatch, FocusEvent, FormEvent, SetStateAction } from "react";
import { Input } from "@mui/material";
import { api } from "@/utils/api";
import { useContext, useEffect, useRef, useState } from "react";
import { FormContext } from "@/store/FormProvider";

export const FormTitle = ({
  isReadOnly,
  setIsReadOnly,
}: {
  isReadOnly: boolean;
  setIsReadOnly: Dispatch<SetStateAction<boolean>>;
}) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const { id, title } = useContext(FormContext);
  const [input, setInput] = useState<string>(title);

  const { form } = api.useContext();
  const { mutate } = api.form.updateFormTitle.useMutation({
    onSuccess: () => form.getForms.invalidate(),
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
    <form onSubmit={onSubmitHandler}>
      <Input
        fullWidth
        readOnly={isReadOnly}
        value={input}
        onChange={(e) => setInput(e.target.value)}
        disableUnderline={isReadOnly}
        inputRef={inputRef}
        onBlur={onSubmitHandler}
        className="text-2xl"
      />
    </form>
  );
};
