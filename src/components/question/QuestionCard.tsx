import { useContext } from "react";
import { FormContext, QuestionContext } from "@/store";
import { Box, Typography, CardHeader, Card, CardContent } from "@mui/material";
import { QuestionCardMenu, QuestionTitle } from ".";
import { OptionBar } from "../option";
import { FieldContainer } from "../field";
import { useRouter } from "next/router";

export const QuestionCard = () => {
  const router = useRouter();
  const isEditor = router.pathname === "/form/[id]" || router.pathname === "/";

  const { status } = useContext(FormContext);
  const { type } = useContext(QuestionContext);

  return (
    <Card className="flex w-full flex-col" variant="outlined">
      <CardHeader
        action={status === "DRAFT" && isEditor && <QuestionCardMenu />}
        title={<QuestionTitle />}
        subheader={
          <Box className="mt-4 flex flex-col flex-wrap gap-2">
            <Typography
              variant="subtitle2"
              color={type ? "inherit" : "lightsalmon"}
            >
              {type ?? "NO TYPE PROVIDED"}
            </Typography>
          </Box>
        }
      />
      {type && (
        <CardContent>
          {status === "DRAFT" && isEditor ? <OptionBar /> : <FieldContainer />}
        </CardContent>
      )}
    </Card>
  );
};
