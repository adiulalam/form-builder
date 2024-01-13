import type { Dispatch, SetStateAction } from "react";
import type { AutocompleteProps, UseAutocompleteProps } from "@mui/material";

export type SearchType = {
  options: UseAutocompleteProps<unknown, false, true, false>["options"];
  getOptionLabel: UseAutocompleteProps<
    unknown,
    false,
    true,
    false
  >["getOptionLabel"];
  isOptionEqualToValue: UseAutocompleteProps<
    unknown,
    false,
    true,
    false
  >["isOptionEqualToValue"];
  setInput: Dispatch<SetStateAction<string>>;
  renderOption: AutocompleteProps<
    unknown,
    false,
    true,
    false,
    "div"
  >["renderOption"];
  loading: boolean;
};
