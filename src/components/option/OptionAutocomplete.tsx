import { Autocomplete, TextField } from "@mui/material";
import { OptionAdd } from "./OptionAdd";
import { useContext, useRef, useState } from "react";
import { QuestionContext } from "@/store";
import { OptionValue } from "./OptionValue";

export const OptionAutocomplete = () => {
  const autocompleteRef = useRef(null);
  const [value, setValue] = useState<string>("");
  const { options } = useContext(QuestionContext);

  return (
    <Autocomplete
      open={false}
      multiple
      autoHighlight
      options={options ?? []}
      getOptionLabel={(option) => option.value}
      onInputChange={(_, inputValue) => setValue(inputValue)}
      inputValue={value}
      value={options}
      forcePopupIcon={false}
      renderTags={(tagValue, getTagProps) =>
        tagValue
          .filter((option) => !option.showInput)
          .map((option, index) => (
            <OptionValue
              key={index}
              getTagProps={getTagProps}
              option={option}
              index={index}
            />
          ))
      }
      renderInput={(params) => (
        <TextField
          {...params}
          variant="standard"
          label="Add values"
          placeholder="Type here"
          ref={autocompleteRef}
          InputProps={{
            ...params.InputProps,
            endAdornment: value && (
              <OptionAdd value={value} autocompleteRef={autocompleteRef} />
            ),
          }}
        />
      )}
    />
  );
};
