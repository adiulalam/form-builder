import { Box, Button, CircularProgress } from "@mui/material";
import { useState, useContext } from "react";
import { FormTitle } from "./FormTitle";
import { FormFavourite } from "./FormFavourite";
import { FormShare } from "./FormShare";
import { FormContext } from "@/store";
import { api } from "@/utils/api";

export const FormNavbar = ({ isFetching }: { isFetching: boolean }) => {
  const [isReadOnly, setIsReadOnly] = useState<boolean>(true);
  const { id, status } = useContext(FormContext);
  const { form } = api.useContext();

  const { mutate } = api.form.updateFormStatus.useMutation({
    onSuccess: () => form.getPrivateForm.invalidate({ id }),
  });

  const onClickHandler = () => {
    mutate({
      body: { status: status === "DRAFT" ? "COMPLETED" : "DRAFT" },
      params: { id },
    });
  };

  return (
    <Box
      className="flex w-full flex-col items-center justify-between gap-2 md:flex-row"
      maxWidth={"xl"}
    >
      <Box className="w-full">
        <FormTitle
          isReadOnly={isReadOnly}
          setIsReadOnly={setIsReadOnly}
          isClickEdit={true}
        />
      </Box>
      <Box className="flex flex-row items-center justify-between">
        <FormFavourite />
        <FormShare />
        <Button
          variant="text"
          color={status === "DRAFT" ? "error" : "primary"}
          onClick={onClickHandler}
        >
          {status}
        </Button>

        {isFetching && <CircularProgress color="inherit" size={20} />}
      </Box>
    </Box>
  );
};
