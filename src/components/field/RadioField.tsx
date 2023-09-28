import type { Option } from "@prisma/client";
import { RadioButtonGroup } from "react-hook-form-mui";
import type { Dispatch, SetStateAction } from "react";

export const RadioField = ({
  name,
  options,
  setShowOtherField,
}: {
  name: string;
  setShowOtherField: Dispatch<SetStateAction<boolean>>;
  options: Option[];
}) => {
  return (
    <RadioButtonGroup
      name={name}
      options={options}
      labelKey="value"
      required
      row={true}
      onChange={({ showInput }: { showInput: boolean }) =>
        setShowOtherField(showInput)
      }
      returnObject={true}
    />
  );
};
