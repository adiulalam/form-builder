import {
  IconButton,
  Tooltip,
  Dialog,
  DialogTitle,
  DialogActions,
  Button,
  DialogContent,
  FormControlLabel,
  Switch,
  CircularProgress,
} from "@mui/material";
import { api } from "@/utils/api";
import { useContext } from "react";
import { Share as ShareIcon } from "@mui/icons-material";
import { FormContext } from "@/store/FormProvider";
import { useState, type ChangeEvent } from "react";
import { FormShareClipboard } from "./FormShareClipboard";

export const FormShare = () => {
  const [open, setOpen] = useState<boolean>(false);

  const { isShareable, id } = useContext(FormContext);
  const { form } = api.useContext();

  const { mutate, isLoading } = api.form.updateFormShare.useMutation({
    onSuccess: () => form.getForms.invalidate(),
  });

  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const isChecked = e.target.checked;
    mutate({ body: { isShareable: isChecked }, params: { id } });
  };

  return (
    <>
      <Tooltip title="Share link">
        <IconButton onClick={() => setOpen(true)}>
          <ShareIcon />
        </IconButton>
      </Tooltip>

      <Dialog
        open={open}
        keepMounted
        onClose={() => setOpen(false)}
        PaperProps={{
          className: "flex w-full",
        }}
      >
        <DialogTitle className="flex items-center justify-center">
          Allow Sharing?
        </DialogTitle>
        <DialogContent className="flex flex-col items-center justify-center">
          <FormControlLabel
            control={
              <>
                <CircularProgress size={20} hidden={!isLoading} />
                <Switch
                  checked={isShareable}
                  onChange={onChangeHandler}
                  disabled={isLoading}
                />
              </>
            }
            labelPlacement="start"
            label="Share:"
          />

          {isShareable && (
            <FormShareClipboard text={`${window.location.host}/share/${id}`} />
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)}>Close</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};
