import { Add as AddIcon } from "@mui/icons-material";
import { Fab, Tooltip, Backdrop, CircularProgress } from "@mui/material";
import { api } from "@/utils/api";
import { useRouter } from "next/router";
import { useState } from "react";

export const FormAdd = () => {
  const [open, setOpen] = useState<boolean>(false);

  const { push } = useRouter();

  const { mutate } = api.form.createForm.useMutation({
    onSuccess: ({ data }) => push(`/form/${data.form.id}`),
  });

  const onClickHandler = () => {
    setOpen(true);
    mutate({ title: "Untitled" });
  };

  return (
    <>
      <Tooltip title="Add Form">
        <Fab
          className="fixed bottom-8 right-8 bg-primary"
          size="large"
          onClick={onClickHandler}
        >
          <AddIcon />
        </Fab>
      </Tooltip>
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={open}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    </>
  );
};
