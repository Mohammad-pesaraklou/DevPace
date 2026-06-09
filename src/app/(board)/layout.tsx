import AuthProvider from "@/providers/AuthProvider";
import Layout from "@/shared/ui/layout/Layout";
import React from "react";

function PagesLayout({ children }: { children: React.ReactNode }) {
  return <Layout>{children}</Layout>;
}

export default PagesLayout;
