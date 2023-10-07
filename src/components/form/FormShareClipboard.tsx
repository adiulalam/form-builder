import { IconButton, InputAdornment, OutlinedInput } from "@mui/material";
import {
  ContentPaste as ContentPasteIcon,
  ContentCopy as ContentCopyIcon,
} from "@mui/icons-material";
import { useSnackbarToast } from "@/store";
import { useShallow } from "zustand/react/shallow";

export const FormShareClipboard = ({ text }: { text: string }) => {
  const { setSnackConfig, isOpen } = useSnackbarToast(
    useShallow((state) => ({
      setSnackConfig: state.setSnackConfig,
      isOpen: state.snackConfig.isOpen,
    })),
  );

  const onClickHandler = () => {
    void navigator.clipboard.writeText(text.toString());

    setSnackConfig({
      isOpen: true,
      severity: "info",
      message: "Copied Successfully",
      duration: 2000,
    });
  };

  return (
    <OutlinedInput
      endAdornment={
        <InputAdornment position="end">
          <IconButton edge="end" role="CopyButton">
            {isOpen ? <ContentPasteIcon /> : <ContentCopyIcon />}
          </IconButton>
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
