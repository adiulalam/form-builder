import type { Option } from "@prisma/client";
import { CheckboxButtonGroup } from "react-hook-form-mui";
import type { Dispatch, SetStateAction } from "react";

export const CheckboxField = ({
  name,
  options,
  setShowOtherField,
}: {
  name: string;
  setShowOtherField: Dispatch<SetStateAction<boolean>>;
  options: Option[];
}) => {
  return (
    <CheckboxButtonGroup
      name={name}
      options={options}
      labelKey="value"
      row={true}
      required
      onChange={({ showInput }: { showInput: boolean }) =>
        setShowOtherField(showInput)
      }
    />
  );
};
