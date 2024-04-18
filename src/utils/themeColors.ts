import type { Theme } from "@mui/material";

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
  "& .MuiChartsLegend-series text": {
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
});
