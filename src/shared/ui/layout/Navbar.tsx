import { AbcSharp, LogoDev, Menu } from "@mui/icons-material";
import ThemeToggle from "../toggles/ThemeToggle";
import { navItems } from "@/constant/nav";
import Link from "next/link";

function Navbar() {
  return (
    <nav className="flex w-full items-center px-4 h-16 justify-between border-b border-divider">
      <div className="flex items-center gap-6">
        <div className="flex gap-4 items-center">
          <Menu />
          <Link href={"/"} className="cursor-pointer">
            <AbcSharp sx={{ fontSize: 80 }} />
          </Link>
        </div>
        <div className="flex items-center gap-3">
          {navItems.map((item) => (
            <Link href={item.link} key={item.id}>
              {item.title}
            </Link>
          ))}
        </div>
      </div>
      <ThemeToggle />
    </nav>
  );
}

export default Navbar;
