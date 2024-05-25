import { Box } from "@mui/material";
import { CheckboxField, DropdownField, RadioField, TextField } from ".";
import { useContext, useEffect, useState } from "react";
import { QuestionContext } from "@/store";
import { useIsInputType } from "@/hooks";

export const FieldContainer = () => {
  const {
    id: questionId,
    type,
    options,
    submissionOptions,
  } = useContext(QuestionContext);
  const isInputType = useIsInputType();
  const [showOtherField, setShowOtherField] = useState<boolean>(false);

  const textOption = options?.find(
    (option) => option.showInput || option.isOtherOption
  );
  const textOptionValue = submissionOptions?.find(
    (submissionOption) => submissionOption.optionId === textOption?.id
  );

  useEffect(() => {
    if (!isInputType && textOptionValue) {
      setShowOtherField(true);
    }
  }, [textOptionValue, isInputType]);

  return (
    <Box className="flex flex-col gap-4">
      {type === "INPUT" ? (
        <TextField
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
        <TextField
          name={textOption.id}
          option={textOption}
          textOptionValue={textOptionValue}
        />
      )}
    </Box>
  );
};
