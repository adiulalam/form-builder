import { type Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import type { AppType } from "next/app";
import { Navbar } from "@/components/navbar";
import {
  CssBaseline,
  StyledEngineProvider,
  ThemeProvider as MuiThemeProvider,
  Paper,
} from "@mui/material";
import { Footer } from "@/components/footer";
import { useMemo } from "react";
import { createTheme, responsiveFontSizes } from "@mui/material";
import { themeColors } from "@/utils/themeColors";
import { SnackbarToast } from "@/components/ui";
import { useTheme } from "next-themes";
import dynamic from "next/dynamic";

const ThemeProvider: AppType<{
  session: Session | null;
}> = ({ Component, pageProps: { session, ...pageProps } }) => {
  const { theme: mode } = useTheme();

  const themeOption = useMemo(
    () => ({
      palette: {
        mode: (mode ?? "dark") as "light" | "dark",
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
    [mode]
  );

  const theme = responsiveFontSizes(createTheme(themeOption));

  return (
    <SessionProvider session={session}>
      <StyledEngineProvider injectFirst>
        <MuiThemeProvider theme={theme}>
          <CssBaseline enableColorScheme />
          <SnackbarToast />
          <Navbar />
          <Paper className="bg-neutral-200 dark:bg-inherit">
            <Component {...pageProps} />
          </Paper>
          <Footer />
        </MuiThemeProvider>
      </StyledEngineProvider>
    </SessionProvider>
  );
};

export default dynamic(() => Promise.resolve(ThemeProvider), { ssr: false });
