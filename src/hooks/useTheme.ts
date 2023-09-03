import { useMemo, useState } from "react";
import { createTheme, responsiveFontSizes } from "@mui/material";
import { themeColors } from "@/utils/themeColors";

export const useTheme = () => {
  const [mode, setMode] = useState<"light" | "dark">("dark");

  const themeOption = useMemo(
    () => ({
      palette: {
        mode,
        primary: {
          light: themeColors.primary.light,
          main: themeColors.primary.main,
          dark: themeColors.primary.dark,
        },
        secondary: {
          light: themeColors.secondary.light,
          main: themeColors.secondary.main,
          dark: themeColors.secondary.dark,
        },
      },
      shape: {
        borderRadius: 10,
      },
      components: {
        MuiPaper: {
          styleOverrides: {
            root: {
              borderRadius: 0,
            },
          },
        },
      },
    }),
    [mode],
  );

  const theme = responsiveFontSizes(createTheme(themeOption));
  return { mode, setMode, theme };
};
