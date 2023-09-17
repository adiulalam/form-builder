import { IconButton, InputAdornment, OutlinedInput } from "@mui/material";
import { ContentPaste, ContentCopy } from "@mui/icons-material";
import { useState } from "react";
import { SnackbarAlert } from "../ui";
import type { SnackConfigType } from "@/types/SnackbarAlert.types";

export const FormShareClipboard = ({ text }: { text: string }) => {
  const [snackConfig, setSnackConfig] = useState<SnackConfigType>({
    isOpen: false,
    severity: "success",
    message: "",
  });

  const onClickHandler = () => {
    void navigator.clipboard.writeText(text.toString());

    setSnackConfig({
      isOpen: true,
      severity: "info",
      message: "Copied Successfully",
    });
  };

  return (
    <OutlinedInput
      endAdornment={
        <InputAdornment position="end">
          <IconButton edge="end">
            {snackConfig.isOpen ? <ContentPaste /> : <ContentCopy />}
          </IconButton>
          <SnackbarAlert
            {...snackConfig}
            setSnackConfig={setSnackConfig}
            duration={2000}
          />
        </InputAdornment>
      }
      sx={{
        width: { xs: "100%", md: "25rem" },
        input: { cursor: "pointer" },
      }}
      onClick={onClickHandler}
      readOnly
      value={text}
    />
  );
};
