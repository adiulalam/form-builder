import { TextFieldElement } from "react-hook-form-mui";
import type { Dispatch, SetStateAction } from "react";

export const TextField = ({
  name,
  label,
  otherValue,
  setOtherValue,
}: {
  name: string;
  label: string;
  otherValue: string;
  setOtherValue: Dispatch<SetStateAction<string>>;
}) => {
  return (
    <TextFieldElement
      name={name}
      label={label}
      onChange={(e) => {
        console.log(e.target.value);
        setOtherValue(e.target.value);
      }}
      required
      fullWidth
      InputProps={{
        value: otherValue,
      }}
    />
  );
};
