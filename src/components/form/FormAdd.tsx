import { Add as AddIcon } from "@mui/icons-material";
import { Fab } from "@mui/material";
import { api } from "@/utils/api";
import { useRouter } from "next/router";

export const FormAdd = () => {
  const { push } = useRouter();

  const { mutate } = api.form.createForm.useMutation({
    onSuccess: ({ data }) => push(`/form/${data.form.id}`),
  });

  const onClickHandler = () => {
    mutate({ title: "Untitled" });
  };

  return (
    <Fab
      className="fixed bottom-8 right-8 bg-primary"
      size="large"
      onClick={onClickHandler}
    >
      <AddIcon />
    </Fab>
  );
};
