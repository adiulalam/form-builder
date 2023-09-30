import type { Option } from "@prisma/client";
import { SelectElement } from "react-hook-form-mui";
import type { Dispatch, SetStateAction } from "react";

export const DropdownField = ({
  name,
  options,
  setShowOtherField,
  setOtherValue,
}: {
  name: string;
  options: Option[];
  setShowOtherField: Dispatch<SetStateAction<boolean>>;
  setOtherValue: Dispatch<SetStateAction<string>>;
}) => {
  const onChangeHandler = (id: string) => {
    console.log("🚀 ~ file: DropdownField.tsx:17 ~ onChangeHandler ~ id:", id);
    const isOtherField = options.find((option) => option.id === id);

    setOtherValue("");
    setShowOtherField(!!isOtherField?.showInput);
  };

  return (
    <SelectElement
      name={name}
      options={options}
      labelKey="value"
      fullWidth
      required
      onChange={onChangeHandler}
    />
  );
};
