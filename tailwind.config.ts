import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          500: "#42BBFF",
          800: "#0C3247",
          900: "#42BBFF1A",
        },
        black: {
          600: "#2E3757",
          700: "#1D2032",
          800: "#131625",
          900: "#10121E",
        },
        white: {
          100: "#FFFFFF",
          300: "#ADB3CC",
          500: "#55597D",
        },
        purle: {
          500: "#9542FF",
          900: "#9542FF1A",
        },
        green: {
          400: "#68D1BF",
          500: "#42FF77",
          900: "#42FF771A",
        },
      },
      fontFamily: {
        inter: ["Inter", "sans-serif"], 
      },
      fontSize: {
        custom: ["32px", "40px"], // The second value is for line-height
        custom_1: ["24px", "32px"],
        custom_2: ["20px", "28px"],
        custom_3: ["10px", "12px"],
      },
      letterSpacing: {
        custom: "-0.02em", 
      },
      backgroundImage: {
        "custom-gradient":
          "linear-gradient(to right, #43B7FE 100%, #4F48E6 100%)",
      },
    },
  },
  plugins: [],
};
export default config;
