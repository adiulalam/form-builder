import { Snackbar, Alert } from "@mui/material";
import type { SnackbarAlertType } from "@/types/SnackbarAlert.types";

export const SnackbarAlert = ({
  isOpen,
  severity,
  message,
  setSnackConfig,
  duration,
}: SnackbarAlertType) => {
  const handleClose = () =>
    setSnackConfig((prev) => ({ ...prev, isOpen: false }));

  return (
    <Snackbar
      open={isOpen}
      autoHideDuration={duration}
      onClose={handleClose}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
    >
      <Alert
        onClose={handleClose}
        variant="filled"
        severity={severity}
        sx={{
          width: "100%",
          alignItems: "center",
          justifyContent: "center",
          display: "flex",
        }}
      >
        {message}
      </Alert>
    </Snackbar>
  );
};
