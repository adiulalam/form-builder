import {
  Create as CreateIcon,
  Description as DescriptionIcon,
  Check as CheckIcon,
} from "@mui/icons-material";
import {
  Backdrop,
  CircularProgress,
  SpeedDial,
  SpeedDialAction,
  SpeedDialIcon,
  styled,
} from "@mui/material";
import { api } from "@/utils/api";
import { useRouter } from "next/router";
import { useState } from "react";

const StyledSpeedDial = styled(SpeedDial)(({ theme }) => ({
  ".MuiSpeedDial-fab": {
    backgroundColor: theme.palette.primary.main,
  },
  ".MuiSpeedDial-fab:hover": {
    backgroundColor: theme.palette.primary.dark,
  },
}));

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

  const actions = [
    {
      icon: <CreateIcon />,
      name: "Create new form",
      click: onClickHandler,
    },
    {
      icon: <DescriptionIcon />,
      name: "See unsubmitted forms",
      click: onClickHandler,
    },
    {
      icon: <CheckIcon />,
      name: "See submitted forms",
      click: onClickHandler,
    },
  ];

  return (
    <>
      <StyledSpeedDial
        className="fixed bottom-8 right-8"
        ariaLabel="SpeedDial"
        icon={<SpeedDialIcon />}
        aria-disabled={true}
      >
        {actions.map((action, index) => (
          <SpeedDialAction
            key={index}
            icon={action.icon}
            tooltipTitle={action.name}
            className="bg-sdark"
            onClick={action.click}
          />
        ))}
      </StyledSpeedDial>
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={open}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    </>
  );
};
