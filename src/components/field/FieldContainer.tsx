import { Box } from "@mui/material";
import { CheckboxField, DropdownField, RadioField, TextInput } from ".";
import { useContext, useState } from "react";
import { QuestionContext } from "@/store";

export const FieldContainer = () => {
  const { id: questionId, type, options } = useContext(QuestionContext);
  const [showOtherField, setShowOtherField] = useState<boolean>(false);

  const addOptions = options?.map((option) => ({ ...option, type }));

  const isOtherField = addOptions?.find(
    (option) => type !== "INPUT" && option.showInput,
  );

  return (
    <Box className="flex flex-col gap-4">
      {type === "INPUT" ? (
        <TextInput
          name={questionId}
          label={"Input"}
          rows={2}
          multiline
          option={addOptions?.find((option) => option.showInput) ?? null}
        />
      ) : type === "CHECKBOX" ? (
        <CheckboxField
          name={questionId}
          options={addOptions ?? []}
          setShowOtherField={setShowOtherField}
        />
      ) : type === "DROPDOWN" ? (
        <DropdownField
          name={questionId}
          options={addOptions ?? []}
          setShowOtherField={setShowOtherField}
        />
      ) : type === "RADIO" ? (
        <RadioField
          name={questionId}
          options={addOptions ?? []}
          setShowOtherField={setShowOtherField}
        />
      ) : null}
      {isOtherField && showOtherField && (
        <TextInput
          name={isOtherField.id}
          label={"Other:"}
          option={isOtherField}
        />
      )}
    </Box>
  );
};
