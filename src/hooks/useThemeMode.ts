import { create } from "zustand";

type DarkModeType = {
  mode: "light" | "dark";
  setMode: () => void;
};

export const useThemeMode = create<DarkModeType>((set) => ({
  mode: "dark",
  setMode: () =>
    set((state) => ({ mode: state.mode === "light" ? "dark" : "light" })),
}));
