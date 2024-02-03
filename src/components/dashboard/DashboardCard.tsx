import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

import { Fade } from "@mui/material";

type Props = {
  heading: string;
  button: string;
};

export const DashboardCard = (props: Props) => {
  return (
    <Fade in>
      <Card
        variant="outlined"
        className="flex w-screen min-w-full flex-1 flex-col justify-between sm:w-80 sm:min-w-[20rem]"
      >
        <CardContent>
          <Typography variant="h5" component="div">
            {props.heading}
          </Typography>
        </CardContent>
        <CardActions className="self-end">
          <Button size="small">{props.button}</Button>
        </CardActions>
      </Card>
    </Fade>
  );
};
