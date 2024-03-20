import {
  Card,
  CardActions,
  CardContent,
  Button,
  Fade,
  Typography,
} from "@mui/material";
import type { ReadDashboardFormCardSchema } from "@/server/schema/dashboard.schema";

export const DashboardCard = (props: ReadDashboardFormCardSchema) => {
  return (
    <Fade in>
      <Card
        variant="outlined"
        className="flex w-screen min-w-full flex-1 flex-col justify-between sm:w-80 sm:min-w-[20rem]"
      >
        <CardContent className="self-end">
          <Typography variant="subtitle1" component="div">
            {props.heading}
          </Typography>
          <Typography variant="h5" component="div" textAlign="right">
            {props.value}
          </Typography>
        </CardContent>
        <CardActions className="self-start">
          <Button
            size="small"
            variant="outlined"
            component="a"
            href={props?.link ?? undefined}
            target="_blank"
            rel="noopener noreferrer"
          >
            {props.button}
          </Button>
        </CardActions>
      </Card>
    </Fade>
  );
};
