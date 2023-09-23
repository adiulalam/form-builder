import { FormContext } from "@/store";
import { api } from "@/utils/api";
import { Chip, type AutocompleteRenderGetTagProps } from "@mui/material";
import type { Option } from "@prisma/client";
import { useContext } from "react";

type OptionValueType = {
  getTagProps: AutocompleteRenderGetTagProps;
  option: Option;
  index: number;
};

export const OptionValue = ({
  getTagProps,
  option,
  index,
}: OptionValueType) => {
  const { id: formId } = useContext(FormContext);
  const { form } = api.useContext();

  const { mutate } = api.option.deleteOption.useMutation({
    onSuccess: () => form.getPrivateForm.invalidate({ id: formId }),
  });

  const onClickHandler = () => {
    mutate({ id: option.id });
  };

  return (
    <Chip
      {...getTagProps({ index })}
      label={option.value}
      onDelete={onClickHandler}
      sx={{ width: { xs: "100%", sm: "auto" } }}
    />
  );
};
