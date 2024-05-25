import type { ReadAllInput } from "@/server/schema/form.schema";
import { create } from "zustand";

type FormSortType = {
  sort: ReadAllInput["sort"];
  setSort: (name: ReadAllInput["sort"]) => void;
  order: "asc" | "desc";
  setOrder: (name: "asc" | "desc") => void;
};

export const useFormSort = create<FormSortType>((set) => ({
  sort: "title",
  setSort: (name) => set({ sort: name }),
  order: "asc",
  setOrder: (name) => set({ order: name }),
}));
