import { createTheme, extendTheme, PaletteMode } from "@mui/material/styles";
import { getPalette } from "./palette";
import { typography } from "./typography";
import { shadows } from "./shadow";

export const getTheme = () =>
  createTheme({
    cssVariables: {
      colorSchemeSelector: "class",
    },
    colorSchemes: {
      dark: {
        palette: getPalette("dark"),
      },
      light: {
        palette: getPalette("light"),
      },
    },
    typography,
    shadows: shadows,
    shape: {
      borderRadius: 10,
    },

    components: {
      MuiPaper: {
        styleOverrides: {
          root: {
            backgroundImage: "none",
            borderRadius: 12,
          },
        },
      },

      MuiCard: {
        styleOverrides: {
          root: {
            borderRadius: 14,
            border: "1px solid rgba(255,255,255,0.04)",
          },
        },
      },

      MuiButton: {
        defaultProps: {
          disableElevation: true,
          variant: "contained",
        },
        styleOverrides: {
          root: {
            borderRadius: 8,
            fontWeight: 600,
          },
        },
      },
      MuiMenuItem: {
        styleOverrides: {
          root: {
            "&:hover": {
              backgroundColor: "transparent",
            },
            "&.Mui-selected": {
              backgroundColor: "transparent",
              "&:hover": {
                backgroundColor: "transparent",
              },
            },
          },
        },
        defaultProps: {
          disableRipple: true,
        },
      },
      MuiAppBar: {
        styleOverrides: {
          root: {
            backgroundColor: "#161B22",
            borderBottom: "1px solid #1F2937",
            borderRadius: "0px",
          },
        },
      },
    },
  });
