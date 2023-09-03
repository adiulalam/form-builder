import "@/styles/globals.css";
import { type Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import { type AppType } from "next/app";
import { api } from "@/utils/api";
import { Navbar } from "@/components/navbar";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { Footer } from "@/components/footer";
import { useTheme } from "@/hooks/useTheme";

const MyApp: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {
  const { theme, mode, setMode } = useTheme();

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
