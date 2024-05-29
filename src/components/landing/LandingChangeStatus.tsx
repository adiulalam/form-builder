import { Status } from "@prisma/client";
import { Button } from "@mui/material";
import type { Dispatch } from "react";
import type { PlaygroundAction } from "@/hooks/usePlaygroundReducer";
import type { PlaygroundProviderType } from "@/types/Provider.types";

const oppositeStatus = {
  [Status.COMPLETED]: Status.DRAFT,
  [Status.DRAFT]: Status.COMPLETED,
};

export const LandingChangeStatus = ({
  state,
  dispatch,
}: {
  state: PlaygroundProviderType;
  dispatch: Dispatch<PlaygroundAction>;
}) => {
  if (!state.isPlayground) return null;

  return (
    <Button
      variant="contained"
      color={state.form.status === "DRAFT" ? "error" : "primary"}
      onClick={() =>
        dispatch({
          type: "changeFormStatus",
          payload: { status: oppositeStatus[state.form.status] },
        })
      }
    >
      Change status to {oppositeStatus[state.form.status]}
    </Button>
  );
};
