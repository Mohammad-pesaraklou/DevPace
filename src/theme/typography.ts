import { TypographyOptions } from "@mui/material/styles/createTypography";

export const typography: TypographyOptions = {
  fontFamily: "var(--font-geist-sans)",

  h1: {
    fontSize: "2rem",
    fontWeight: 700,
    letterSpacing: "-0.5px",
  },

  h2: {
    fontSize: "1.5rem",
    fontWeight: 700,
  },

  h3: {
    fontSize: "1.25rem",
    fontWeight: 600,
  },
  h6: {
    fontSize: "20px",
    fontWeight: 500,
  },
  body1: {
    fontSize: "0.95rem",
  },

  body2: {
    fontSize: "0.85rem",
    color: "#9CA3AF",
  },

  button: {
    textTransform: "none", // دیگه error نمی‌دهد
    fontWeight: 600,
  },
};
