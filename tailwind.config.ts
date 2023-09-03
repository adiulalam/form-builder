import { themeColors } from "./src/utils/themeColors";
import { type Config } from "tailwindcss";

export default {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        plight: themeColors.primary.light,
        primary: themeColors.primary.main,
        pdark: themeColors.primary.dark,
        slight: themeColors.secondary.light,
        secondary: themeColors.secondary.main,
        sdark: themeColors.secondary.dark,
      },
    },
    screens: {
      xs: "0px",
      sm: "600px",
      md: "900px",
      lg: "1200px",
      xl: "1536px",
      "2xl": "1536px",
    },
  },
  plugins: [],
  darkMode: "class",
} satisfies Config;
