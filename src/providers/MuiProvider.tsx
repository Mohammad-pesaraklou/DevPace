"use client";

import { AppRouterCacheProvider } from "@mui/material-nextjs/v15-appRouter";
import ThemeProvider from "@/providers/ThemeProvider";

type Props = {
  children: React.ReactNode;
};

export default function MuiProvider({ children }: Props) {
  return (
    <AppRouterCacheProvider>
      <ThemeProvider>{children}</ThemeProvider>
    </AppRouterCacheProvider>
  );
}
