import { logoutAction } from "@/features/auth/actions";
import { User } from "@/shared/types/types";
import { create, StoreApi, UseBoundStore } from "zustand";

export type AuthStore = {
  accessToken: string | null;
  isAuthenticated: boolean;
  user: User | null;
  setUser: (user: User) => void;
  setAccessToken: (accessToken: string) => void;
  logout: () => void;
};

const useAuth: UseBoundStore<StoreApi<AuthStore>> = create((set, get) => ({
  accessToken: null,
  isAuthenticated: !!get()?.accessToken,
  user: null,
  async logout() {
    const res = await logoutAction();
    console.log("res =>>>>>", res);
  },
  setAccessToken: (accessToken: string) => {
    set({ accessToken });
  },
  setUser: (user: User) => {
    set({ user });
  },
}));

export default useAuth;
