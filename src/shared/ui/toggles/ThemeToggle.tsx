"use client";
import { DarkMode, LightMode } from "@mui/icons-material";
import { useColorScheme } from "@mui/material/styles";

function ThemeToggle() {
  const { mode, setMode } = useColorScheme();

  const toggle = () => {
    setMode(mode === "dark" ? "light" : "dark");
  };

  return (
    <div onClick={toggle} className="cursor-pointer mt-2">
      {mode === "dark" ? <LightMode /> : <DarkMode />}
    </div>
  );
}
export default ThemeToggle;
