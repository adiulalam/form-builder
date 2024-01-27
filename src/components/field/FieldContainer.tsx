import { Box } from "@mui/material";
import { CheckboxField, DropdownField, RadioField, TextInput } from ".";
import { useContext, useState } from "react";
import { QuestionContext } from "@/store";

export const FieldContainer = () => {
  const { id: questionId, type, options } = useContext(QuestionContext);
  const [showOtherField, setShowOtherField] = useState<boolean>(false);

  const textOption =
    options?.find((option) => option.showInput || option.isOtherOption) ?? null;

  return (
    <Box className="flex flex-col gap-4">
      {type === "INPUT" ? (
        <TextInput name={questionId} rows={2} multiline option={textOption} />
      ) : type === "CHECKBOX" ? (
        <CheckboxField
          name={questionId}
          options={options ?? []}
          setShowOtherField={setShowOtherField}
        />
      ) : type === "DROPDOWN" ? (
        <DropdownField
          name={questionId}
          options={options ?? []}
          setShowOtherField={setShowOtherField}
        />
      ) : type === "RADIO" ? (
        <RadioField
          name={questionId}
          options={options ?? []}
          setShowOtherField={setShowOtherField}
        />
      ) : null}
      {textOption && showOtherField && (
        <TextInput name={textOption.id} option={textOption} />
      )}
    </Box>
  );
};
