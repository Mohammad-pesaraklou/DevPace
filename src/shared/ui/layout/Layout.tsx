import React from "react";
import Navbar from "./Navbar";
import HomeNavbar from "./HomeNavbar";

function Layout({ children }: { children: React.ReactNode }) {
  return (
    <React.Fragment>
      <HomeNavbar />
      {children}
    </React.Fragment>
  );
}

export default Layout;
