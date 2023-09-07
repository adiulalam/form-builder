import { Add as AddIcon } from "@mui/icons-material";
import { Fab } from "@mui/material";

export const FormAdd = () => {
  return (
    <Fab
      className="absolute bottom-8 right-8 bg-primary"
      size="large"
      onClick={() => console.log("clicked")}
    >
      <AddIcon />
    </Fab>
  );
};
