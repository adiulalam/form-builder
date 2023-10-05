import { useSnackbarToast } from "@/store";
import { Snackbar, Alert } from "@mui/material";

export const SnackbarToast = () => {
  const setSnackConfig = useSnackbarToast((state) => state.setSnackConfig);

  const { isOpen, severity, message } = useSnackbarToast(
    (state) => state.snackConfig,
  );

  const handleClose = () =>
    setSnackConfig({
      isOpen: false,
      severity,
      message,
    });

  return (
    <Snackbar
      open={isOpen}
      autoHideDuration={5000}
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
