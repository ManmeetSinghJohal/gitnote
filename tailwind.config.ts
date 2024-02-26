import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        inter: ["Inter", "sans-serif"], // Assuming 'Inter' is available in your project
      },
      fontSize: {
        custom: ["32px", "40px"], // The second value is for line-height
        custom_1: ["24px", "32px"],
        custom_2: ["20px", "28px"],
        custom_3: ["10px", "12px"],
      },
      letterSpacing: {
        custom: "-0.02em", // Adjust based on visual similarity
      },
    },
  },
  plugins: [],
};
export default config;
