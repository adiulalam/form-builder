import { Fragment } from "react";
import { TextField, Autocomplete, CircularProgress } from "@mui/material";
import { debounce } from "lodash";
import type { SearchType } from "@/types/Search.types";

export const Search = ({
  setInput,
  options,
  loading,
  getOptionLabel,
  isOptionEqualToValue,
  renderOption,
}: SearchType) => {
  const functionDebounce = debounce((value: string) => setInput(value), 300);

  const handleOnChange = (value: string) => void functionDebounce(value);
  return (
    <Autocomplete
      fullWidth
      disableClearable
      isOptionEqualToValue={isOptionEqualToValue}
      getOptionLabel={getOptionLabel}
      options={options}
      loading={loading}
      onInputChange={(_, value) => void handleOnChange(value)}
      sx={{
        "& .MuiFormLabel-root": {
          color: "primary.main",
        },
        "& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
          border: "1px solid",
          borderColor: "primary.main",
          boxShadow: 5,
        },
        "& .MuiButtonBase-root": {
          color: "primary.main",
        },
      }}
      renderOption={renderOption}
      renderInput={(params) => (
        <TextField
          {...params}
          label="Search"
          InputProps={{
            ...params.InputProps,
            endAdornment: (
              <Fragment>
                {loading && <CircularProgress size={20} />}
                {params.InputProps.endAdornment}
              </Fragment>
            ),
          }}
        />
      )}
    />
  );
};
