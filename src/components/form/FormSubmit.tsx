import { SubmissionContext } from "@/store";
import { Send as SendIcon } from "@mui/icons-material";
import { Fab, Tooltip, Backdrop, CircularProgress } from "@mui/material";
import { useContext } from "react";
import type { ComponentProps } from "react";

type ButtonPropsTypes = {
  disabled: boolean;
  component: string | undefined;
  className: ComponentProps<"button">["className"];
  type?: "submit" | "button" | "reset";
  variant: "extended" | "circular";
};

export const FormSubmit = () => {
  const { status } = useContext(SubmissionContext);
  const disabled = status === "COMPLETED";

  const buttonProps: ButtonPropsTypes = {
    disabled,
    component: disabled ? "div" : undefined,
    className: "fixed bottom-8 right-8 bg-secondary",
    type: "submit",
    variant: "extended",
  };

  return (
    <>
      <Tooltip title="Submit Form">
        <Fab {...buttonProps}>
          Submit
          <SendIcon className="ml-2" />
        </Fab>
      </Tooltip>

      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={false}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    </>
  );
};
