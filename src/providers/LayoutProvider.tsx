"use client";

import queryClient from "@/shared/lib/query-client";
import { QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { useEffect } from "react";

function LayoutProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    import("../shared/lib/vitalsReporter").then((module) => {
      module.initWebVitalsReporter();
    });
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      {children}
      <ReactQueryDevtools />
    </QueryClientProvider>
  );
}

export default LayoutProvider;
