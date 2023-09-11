import { Add as AddIcon } from "@mui/icons-material";
import { Fab } from "@mui/material";
import { api } from "@/utils/api";
import { useContext } from "react";
import { FormsContext } from "@/store/FormsProvider";

export const FormAdd = () => {
  const { refetch } = useContext(FormsContext);

  const { mutate } = api.form.createForm.useMutation({
    onSuccess: (data) => {
      console.log("🚀 ~ file: FormAdd.tsx:14 ~ onSuccess ~ data:", data);
      refetch();
    },
  });

  const onClickHandler = () => {
    mutate({ title: "Untitled" });
  };

  return (
    <Fab
      className="absolute bottom-8 right-8 bg-primary"
      size="large"
      onClick={onClickHandler}
    >
      <AddIcon />
    </Fab>
  );
};
