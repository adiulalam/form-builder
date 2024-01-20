import { Input, Box } from "@mui/material";
import { LogContext } from "@/store";
import { useContext } from "react";

export const LogTitle = () => {
  const {
    form: { title },
  } = useContext(LogContext);

  return (
    <Box className="w-auto">
      <Input
        fullWidth
        readOnly={true}
        value={title}
        className="text-2xl"
        multiline
      />
    </Box>
  );
};
