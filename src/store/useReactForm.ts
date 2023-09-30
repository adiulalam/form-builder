import type { Control } from "react-hook-form";
import { create } from "zustand";

type ControlType = Control<Record<string, string>>;

type ReactFormType = {
  control: ControlType;
  setControl: (obj: ControlType) => void;
};

export const useReactForm = create<ReactFormType>((set) => ({
  control: {} as ControlType,
  setControl: (obj: ControlType) => set({ control: obj }),
}));
