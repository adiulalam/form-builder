import { type Dispatch, type SetStateAction } from "react";
export type NavbarDarkType = {
  setMode: Dispatch<SetStateAction<"light" | "dark">>;
  mode: "light" | "dark";
};
