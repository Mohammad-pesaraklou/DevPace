"use client";

import { CircularProgress } from "@mui/material";

export default function Loader() {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-bg backdrop-blur-sm z-50">
      <CircularProgress size={40} thickness={4} />
    </div>
  );
}
