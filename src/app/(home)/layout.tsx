import AuthProvider from "@/providers/AuthProvider";
import HomeNavbar from "@/shared/ui/layout/HomeNavbar";
import React from "react";

function LayoutHome({ children }: { children: React.ReactNode }) {
  return (
    <React.Fragment>
      <HomeNavbar />
      {children}
    </React.Fragment>
  );
}

export default LayoutHome;
