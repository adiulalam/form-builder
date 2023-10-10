import { create } from "zustand";

type FormTitleType = {
  isReadOnly: boolean;
  setIsReadOnly: (state: boolean) => void;
};

export const useFormTitle = create<FormTitleType>((set) => ({
  isReadOnly: true,
  setIsReadOnly: (state: boolean) => set({ isReadOnly: state }),
}));
