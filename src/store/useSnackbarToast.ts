import type { AlertColor } from "@mui/material";
import { create } from "zustand";

type SnackConfigType = {
  isOpen: boolean;
  severity: AlertColor;
  message: string;
};

type SnackbarToastType = {
  snackConfig: SnackConfigType;
  setSnackConfig: (name: SnackConfigType) => void;
};

export const useSnackbarToast = create<SnackbarToastType>((set) => ({
  snackConfig: {
    isOpen: false,
    severity: "success",
    message: "",
  },
  setSnackConfig: (obj: SnackConfigType) => set({ snackConfig: obj }),
}));
