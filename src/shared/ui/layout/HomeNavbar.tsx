import { AbcSharp, Menu } from "@mui/icons-material";
import ThemeToggle from "../toggles/ThemeToggle";
import { navItems } from "@/constant/nav";
import Link from "next/link";
import { AppBar, Box, Button, Stack, Toolbar } from "@mui/material";
import UserProfile from "../components/UserProfile";
import NewBoardBtn from "../components/NewBoardBtn";
// components
function HomeNavbar() {
  return (
    <AppBar position="static">
      <Toolbar className="flex w-full items-center px-4 h-16 justify-between border-b border-divider">
        <Box className="flex items-center gap-6 max-h-[64px]">
          <Box className="flex gap-4 items-center">
            <Menu />
            <Link href={"/"} className="cursor-pointer">
              <AbcSharp sx={{ fontSize: 70 }} />
            </Link>
          </Box>
          <Box className="flex items-center gap-3">
            {navItems.map((item) => (
              <Link href={item.link} key={item.id}>
                {item.title}
              </Link>
            ))}
            <NewBoardBtn />
          </Box>
        </Box>
        <Stack className="flex items-center gap-3" direction={"row"}>
          <ThemeToggle />
          <UserProfile />
        </Stack>
      </Toolbar>
    </AppBar>
  );
}

export default HomeNavbar;
