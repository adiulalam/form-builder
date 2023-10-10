import { create } from "zustand";

type FormTitleType = {
  readonly: boolean;
  setReadonly: (state: boolean) => void;
};

export const useFormTitle = create<FormTitleType>((set) => ({
  readonly: true,
  setReadonly: (state: boolean) => set({ readonly: state }),
}));
