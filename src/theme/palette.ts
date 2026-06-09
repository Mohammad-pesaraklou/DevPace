import { PaletteMode } from "@mui/material/styles";

export const getPalette = (mode: PaletteMode) => {
  if (mode === "dark") {
    return {
      mode,

      primary: {
        main: "#579DFF", // Jira blue
        dark: "#388BFF",
        light: "#7BB5FF",
      },

      secondary: {
        main: "#9F8AE2", // purple
      },

      success: {
        main: "#4BCE97", // green
      },

      warning: {
        main: "#F5CD47", // yellow
      },

      error: {
        main: "#F87171", // red
      },

      info: {
        main: "#6CCAFF",
      },

      background: {
        default: "#0D1117", // main Jira background
        paper: "#1E2634", // card background
      },

      text: {
        primary: "#F3F6FC",
        secondary: "#9CA3AF",
        disabled: "#6B7280",
      },
      divider: "#6b6b6d",
      dividerSecondary: "#6b6b6d",
      custome: {
        blue: "#579DFF",
        green: "#4BCE97",
        yellow: "#F5CD47",
        red: "#F87171",
        purple: "#9F8AE2",
      },
    };
  }

  //   light mode
  return {
    mode,
    primary: {
      main: "#0C66E4",
    },
    background: {
      default: "#F7F8F9",
      paper: "#FFFFFF",
    },
    text: {
      primary: "#172B4D",
      secondary: "#44546F",
    },
    divider: "#DFE1E6",
  };
};
