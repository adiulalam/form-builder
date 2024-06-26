import {
  Card,
  CardActions,
  CardContent,
  Button,
  Fade,
  Typography,
} from "@mui/material";
import type { ReadDashboardCardSchema } from "@/server/schema/dashboard.schema";

export const DashboardCard = (props: ReadDashboardCardSchema) => {
  return (
    <Fade in>
      <Card
        variant="outlined"
        className="flex w-screen min-w-full sm:w-80 sm:min-w-[20rem] flex-1 flex-col justify-between"
      >
        <CardContent className="self-end text-right capitalize">
          <Typography variant="subtitle1">{props.heading}</Typography>
          <Typography variant="h5">{props.value}</Typography>
        </CardContent>
        <CardActions className="self-start">
          {props?.button && props?.link && (
            <Button
              size="small"
              variant="outlined"
              component="a"
              href={props.link}
              target="_blank"
              rel="noopener noreferrer"
            >
              {props.button}
            </Button>
          )}
        </CardActions>
      </Card>
    </Fade>
  );
};
