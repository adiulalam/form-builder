import "@/styles/globals.css";
import { type Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import { type AppType } from "next/app";
import { api } from "@/utils/api";
import { Navbar } from "@/components/navbar";
import {
  CssBaseline,
  StyledEngineProvider,
  ThemeProvider,
} from "@mui/material";
import { Footer } from "@/components/footer";
import { useThemeMode } from "@/hooks/useThemeMode";
import { useMemo, useEffect } from "react";
import { createTheme, responsiveFontSizes } from "@mui/material";
import { themeColors } from "@/utils/themeColors";
import { SnackbarToast } from "@/components/ui";

const MyApp: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {
  const { mode } = useThemeMode();

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
    [mode]
  );

  const theme = responsiveFontSizes(createTheme(themeOption));

  useEffect(() => {
    if (mode === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [mode]);

  return (
    <SessionProvider session={session}>
      <StyledEngineProvider injectFirst>
        <ThemeProvider theme={theme}>
          <CssBaseline enableColorScheme />
          <SnackbarToast />
          <Navbar />
          <Component {...pageProps} />
          <Footer />
        </ThemeProvider>
      </StyledEngineProvider>
    </SessionProvider>
  );
};

export default api.withTRPC(MyApp);
