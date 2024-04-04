import { useState } from "react";
import { api } from "@/utils/api";
import Link from "next/link";
import type { SearchType } from "@/types/Search.types";
import { Search } from "../shared";
import type { Form } from "@prisma/client";

export const FormSearch = () => {
  const [input, setInput] = useState("");

  const { data: options, isFetching } = api.form.getSearchForms.useQuery(
    {
      title: input,
    },
    { enabled: !!input, keepPreviousData: true, staleTime: 1000 }
  );

  const isOptionEqualToValue: SearchType["isOptionEqualToValue"] = (
    option,
    value
  ) => (option as Form).title === (value as Form).title;

  const getOptionLabel: SearchType["getOptionLabel"] = (option) =>
    (option as Form).title;

  const renderOption: SearchType["renderOption"] = (props, option) => (
    <Link
      href={`/form/${(option as Form).id}`}
      key={(option as Form).id}
      color="inherit"
    >
      <li {...props}>
        {(option as Form).title} | {(option as Form).status}
      </li>
    </Link>
  );

  return (
    <Search
      isOptionEqualToValue={isOptionEqualToValue}
      getOptionLabel={getOptionLabel}
      renderOption={renderOption}
      setInput={setInput}
      loading={isFetching}
      options={options?.data.forms ?? []}
    />
  );
};
