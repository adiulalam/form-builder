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
  const onChangeHandler = (options: Option[]) => {
    const isOtherField = options.find((option) => option.showInput);

    setShowOtherField(!!isOtherField?.showInput);
  };

  return (
    <CheckboxButtonGroup
      name={name}
      options={options}
      labelKey="value"
      row={true}
      required
      onChange={onChangeHandler}
      returnObject={true}
    />
  );
};
