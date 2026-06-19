"use client";

import { getTheme } from "@/theme";
import { ThemeProvider, CssBaseline } from "@mui/material";

export default function AppThemeProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const theme = getTheme();

  return (
    <ThemeProvider theme={theme} defaultMode="dark">
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
}
