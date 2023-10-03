import { Send as SendIcon } from "@mui/icons-material";
import { Fab, Tooltip, Backdrop, CircularProgress } from "@mui/material";

export const FormSubmit = () => {
  return (
    <>
      <Tooltip title="Submit Form">
        <Fab
          className="fixed bottom-8 right-8 bg-secondary"
          variant="extended"
          // onClick={}
          type="submit"
        >
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
