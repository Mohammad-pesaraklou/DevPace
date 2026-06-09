import tailwindcssLogical from "tailwindcss-logical";
const config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,css}"],
  corePlugins: {
    preflight: false,
  },
  important: "#__next",
  plugins: [tailwindcssLogical],
  theme: {
    extend: {
      colors: {
        primary: "var(--mui-palette-primary-main)",

        bg: "var(--mui-palette-background-default)",
        paper: "var(--mui-palette-background-paper)",
        surface: "var(--mui-palette-background-paper)",

        text: "var(--mui-palette-text-primary)",
        "text-secondary": "var(--mui-palette-text-secondary)",

        divider: "var(--mui-palette-divider)",
        mml: "var(--mui-palette-mml)",
      },
    },
  },
};

export default config;
