import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { api } from "@/utils/api";
import { ThemeProvider as NextThemeProvider } from "next-themes";
import { ThemeProvider } from "@/store";

const MyApp = (props: AppProps) => {
  return (
    <NextThemeProvider attribute="class" defaultTheme="dark">
      <ThemeProvider {...props} />
    </NextThemeProvider>
  );
};

export default api.withTRPC(MyApp);
