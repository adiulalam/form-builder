import { useState, Fragment } from "react";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import CircularProgress from "@mui/material/CircularProgress";
import { api } from "@/utils/api";
import { debounce } from "lodash";
import Link from "next/link";

export const FormSearch = () => {
  const [input, setInput] = useState("");

  const { data: options, isFetching } = api.form.getSearchForms.useQuery(
    {
      title: input,
    },
    { enabled: !!input, keepPreviousData: true, staleTime: 1000 },
  );

  const functionDebounce = debounce((value: string) => setInput(value), 300);

  const handleOnChange = (value: string) => void functionDebounce(value);
  return (
    <Autocomplete
      id="asynchronous-demo"
      //   sx={{ minWidth: 300 }}
      fullWidth
      disableClearable
      isOptionEqualToValue={(option, value) => option.title === value.title}
      getOptionLabel={(option) => option.title}
      options={options?.data.forms ?? []}
      loading={isFetching}
      //   inputValue={input}
      onInputChange={(_, value) => void handleOnChange(value)}
      renderOption={(props, option) => (
        <Link href={`/form/${option.id}`} key={option.id}>
          <li {...props}>{option.title}</li>
        </Link>
      )}
      renderInput={(params) => (
        <TextField
          {...params}
          label="Search"
          InputProps={{
            ...params.InputProps,
            type: "search",
            endAdornment: (
              <Fragment>
                {isFetching && <CircularProgress color="inherit" size={20} />}
                {params.InputProps.endAdornment}
              </Fragment>
            ),
          }}
        />
      )}
    />
  );
};
