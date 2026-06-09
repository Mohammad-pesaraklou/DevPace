import useAuth from "@/store/authSlice";

interface INavItems {
  id: number;
  title: string;
  link: `/${string}`;
}

const navItems: INavItems[] = [
  { id: 1, title: "Project", link: "/project" },
  { id: 2, title: "Boards", link: "/b/21" },
  { id: 3, title: "Dasbaord", link: "/project" },
] as const;

export interface IUserProfileItems extends Omit<INavItems, "link"> {
  action?: () => void;
}

const profileItems: IUserProfileItems[] = [
  { id: 1, title: "Profile" },
  { id: 2, title: "Settings" },
  { id: 3, title: "Logout", action: useAuth.getState().logout },
];
export { navItems, profileItems };
