import { Box } from "@mui/material";
import { useState } from "react";
import { FormTitle } from "./FormTitle";
import { FormFavourite } from "./FormFavourite";
import { FormShare } from "./FormShare";

export const FormNavbar = () => {
  const [isReadOnly, setIsReadOnly] = useState<boolean>(true);

  return (
    <Box
      className="flex w-full flex-row items-center justify-between gap-2"
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
      </Box>
    </Box>
  );
};
