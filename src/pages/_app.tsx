import "@/styles/globals.css";
import { type Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import { type AppType } from "next/app";
import { api } from "@/utils/api";
import { Navbar } from "@/components/navbar";
import { useMemo, useState } from "react";
import {
  CssBaseline,
  ThemeProvider,
  createTheme,
  responsiveFontSizes,
} from "@mui/material";
import { themeColors } from "@/utils/themeColors";
import { Footer } from "@/components/footer";

const MyApp: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {
  const [mode, setMode] = useState<"light" | "dark">("dark");
  let theme = useMemo(
    () =>
      createTheme({
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

  theme = responsiveFontSizes(theme);

  return (
    <SessionProvider session={session}>
      <ThemeProvider theme={theme}>
        <CssBaseline enableColorScheme />
        <Navbar mode={mode} setMode={setMode} />
        <Component {...pageProps} />
        <Footer />
      </ThemeProvider>
    </SessionProvider>
  );
};

export default api.withTRPC(MyApp);
