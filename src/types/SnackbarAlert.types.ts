import type { AlertColor } from "@mui/material";
import type { Dispatch, SetStateAction } from "react";

export type SnackConfigType = {
  isOpen: boolean;
  severity: AlertColor;
  message: string;
};

export type SnackbarAlertType = SnackConfigType & {
  duration: number;
  setSnackConfig: Dispatch<SetStateAction<SnackConfigType>>;
};
