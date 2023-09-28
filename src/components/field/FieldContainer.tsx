import { FormContainer } from "react-hook-form-mui";
import { Box } from "@mui/material";
import {
  TextField,
  CheckboxField,
  DropdownField,
  RadioField,
  TextArea,
} from ".";
import { useContext, useState } from "react";
import { QuestionContext } from "@/store";

export const FieldContainer = () => {
  const { type, options } = useContext(QuestionContext);
  const [showOtherField, setShowOtherField] = useState<boolean>(false);

  const isOtherField =
    options?.find((option) => type !== "INPUT" && option.showInput) ?? "";

  return (
    <FormContainer
      defaultValues={{
        questionId: "",
        isOtherField: "",
      }}
      onSuccess={(data) => console.log(data)}
    >
      <Box className="flex flex-col gap-4">
        {type === "INPUT" ? (
          <TextArea name={"questionId"} label={"Input"} rows={2} />
        ) : type === "CHECKBOX" ? (
          <CheckboxField
            name={"questionId"}
            options={options ?? []}
            setShowOtherField={setShowOtherField}
          />
        ) : type === "DROPDOWN" ? (
          <DropdownField
            name={"questionId"}
            options={options ?? []}
            setShowOtherField={setShowOtherField}
          />
        ) : type === "RADIO" ? (
          <RadioField
            name={"questionId"}
            options={options ?? []}
            setShowOtherField={setShowOtherField}
          />
        ) : null}
        {isOtherField && showOtherField && (
          <TextField name={"isOtherField"} label={"Other:"} />
        )}
      </Box>
    </FormContainer>
  );
};
