import { Sort } from "../shared";
import { sortItems } from "@/utils/form.config";

export const LogSort = () => {
  const filteredSort = sortItems.filter(({ value }) => value !== "isFavourite");

  return <Sort items={filteredSort} />;
};
