import { useState } from "react";
import { api } from "@/utils/api";
import Link from "next/link";
import type { SearchType } from "@/types/Search.types";
import { Search } from "../shared";
import type { Form, Submission } from "@prisma/client";

type OptionType = Submission & { form: Form };

export const LogSearch = () => {
  const [input, setInput] = useState("");

  const { data: options, isFetching } = api.log.getSearchLogs.useQuery(
    {
      title: input,
    },
    { enabled: !!input, keepPreviousData: true, staleTime: 1000 },
  );

  const isOptionEqualToValue: SearchType["isOptionEqualToValue"] = (
    option,
    value,
  ) => (option as OptionType).form.title === (value as OptionType).form.title;

  const getOptionLabel: SearchType["getOptionLabel"] = (option) =>
    (option as OptionType).form.title;

  const renderOption: SearchType["renderOption"] = (props, option) => (
    <Link
      href={`/share/${(option as OptionType).form.id}`}
      key={(option as OptionType).form.id}
      color="inherit"
    >
      <li {...props}>
        {(option as OptionType).form.title} | {(option as OptionType).status}
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
      options={options?.data.logs ?? []}
    />
  );
};
