import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        darkturquoise: "#00ced1",
        paleturquoise: "#afeeee"
      },
      boxShadow: {
        'border': "0px 0px 2px 0px rgba(0,0,0,0.75)"
      }
    },
  },
  plugins: [],
};
export default config;
