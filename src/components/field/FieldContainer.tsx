import { Box } from "@mui/material";
import { CheckboxField, DropdownField, RadioField, TextInput } from ".";
import { useContext, useEffect, useState } from "react";
import { QuestionContext } from "@/store";

export const FieldContainer = () => {
  const {
    id: questionId,
    type,
    options,
    submissionOptions,
  } = useContext(QuestionContext);
  const [showOtherField, setShowOtherField] = useState<boolean>(false);

  const textOption = options?.find(
    (option) => option.showInput || option.isOtherOption,
  );
  const textOptionValue = submissionOptions?.find(
    (submissionOption) => submissionOption.optionId === textOption?.id,
  );

  useEffect(() => {
    if (type !== "INPUT" && textOptionValue) {
      setShowOtherField(true);
    }
  }, [textOptionValue, type]);

  return (
    <Box className="flex flex-col gap-4">
      {type === "INPUT" ? (
        <TextInput
          name={questionId}
          rows={2}
          multiline
          option={textOption}
          textOptionValue={textOptionValue}
        />
      ) : type === "CHECKBOX" ? (
        <CheckboxField
          name={questionId}
          setShowOtherField={setShowOtherField}
        />
      ) : type === "DROPDOWN" ? (
        <DropdownField
          name={questionId}
          setShowOtherField={setShowOtherField}
        />
      ) : type === "RADIO" ? (
        <RadioField name={questionId} setShowOtherField={setShowOtherField} />
      ) : null}
      {textOption && showOtherField && (
        <TextInput
          name={textOption.id}
          option={textOption}
          textOptionValue={textOptionValue}
        />
      )}
    </Box>
  );
};
