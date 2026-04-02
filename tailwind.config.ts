import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./features/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      // Modern Architecture: Theme tokens are now managed directly 
      // in 'app/globals.css' via 'antaris-theme.css'.
      // This config is now only for content resolution and static plugins.
    },
  },
  plugins: [require("tailwindcss-animate")],
};

export default config;
