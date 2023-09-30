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
  const onChangeHandler = (id: string) => {
    const isOtherField = options.find((option) => option.id === id);

    setShowOtherField(!!isOtherField?.showInput);
  };

  return (
    <RadioButtonGroup
      name={name}
      options={options}
      labelKey="value"
      required
      row={true}
      onChange={onChangeHandler}
    />
  );
};
