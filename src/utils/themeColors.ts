import type { Theme } from "@mui/material";
import { axisClasses, legendClasses } from "@mui/x-charts";

export const themeColors = {
  primary: {
    dark: "#357a38",
    main: "#4caf50",
    light: "#6fbf73",
  },
  secondary: {
    dark: "#b26500",
    main: "#ff9100",
    light: "#ffa733",
  },
};

export const chartLegendStyle = (theme: Theme) => ({
  [`& .${legendClasses.series} text`]: {
    [theme.breakpoints.down("sm")]: {
      fontSize: "10px !important",
    },
    [theme.breakpoints.up("sm")]: {
      fontSize: "12px !important",
    },
    [theme.breakpoints.up("md")]: {
      fontSize: "14px !important",
    },
  },
  [`& .${legendClasses.mark}`]: {
    [theme.breakpoints.down("sm")]: {
      height: "10px !important",
      width: "10px !important",
      y: "-5px !important",
      x: "10px !important",
    },
    [theme.breakpoints.up("sm")]: {
      height: "15px !important",
      width: "15px !important",
      y: "-7px !important",
    },
    [theme.breakpoints.up("md")]: {
      height: "20px !important",
      width: "20px !important",
      y: "-10px !important",
    },
  },
  [`& .${axisClasses.left} .${axisClasses.label}`]: {
    transform: "translateX(-5px)",
  },
});
