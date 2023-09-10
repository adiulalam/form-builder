import { create } from "zustand";

type FormSortType = {
  sort: string;
  setSort: (name: string) => void;
  order: "asc" | "desc";
  setOrder: () => void;
};

export const useFormSort = create<FormSortType>((set) => ({
  sort: "title",
  setSort: (name) => set({ sort: name }),
  order: "asc",
  setOrder: () =>
    set((state) => ({ order: state.order === "asc" ? "desc" : "asc" })),
}));
