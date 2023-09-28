import type { Option } from "@prisma/client";
import { SelectElement } from "react-hook-form-mui";
import type { Dispatch, SetStateAction } from "react";

export const DropdownField = ({
  name,
  options,
  setShowOtherField,
}: {
  name: string;
  setShowOtherField: Dispatch<SetStateAction<boolean>>;
  options: Option[];
}) => {
  return (
    <SelectElement
      name={name}
      options={options}
      labelKey="value"
      fullWidth
      required
      onChange={({ showInput }: { showInput: boolean }) =>
        setShowOtherField(showInput)
      }
    />
  );
};
