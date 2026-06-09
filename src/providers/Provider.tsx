import React from "react";
import LayoutProvider from "@/providers/LayoutProvider";
import MuiProvider from "@/providers/MuiProvider";
import AuthProvider from "./AuthProvider";

function Provider({ children }: { children: React.ReactNode }) {
  return (
    <React.Fragment>
      <MuiProvider>
        <AuthProvider>
          <LayoutProvider>{children}</LayoutProvider>
        </AuthProvider>
      </MuiProvider>
    </React.Fragment>
  );
}

export default Provider;
