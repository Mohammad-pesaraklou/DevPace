"use client";
import { publicPages } from "@/constant";
import refreshRequest from "@/shared/lib/refreshRequest";
import Loader from "@/shared/ui/loaders/Loader";
import useAuth from "@/store/authSlice";
import { usePathname, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

function AuthProvider({ children }: { children: React.ReactNode }) {
  const [loading, setLoading] = useState(true);
  const setUser = useAuth((state) => state.setUser);
  const { replace } = useRouter();
  const pathname = usePathname();
  useEffect(() => {
    async function authInit() {
      try {
        const isPublic = publicPages.includes(pathname);
        if (isPublic) return setLoading(false);

        const response = await refreshRequest();
        // console.log("response in auth provider", response);
        if (!response || !("user" in response)) {
          replace("/login");
          return;
        }
        setUser(response?.user!);
      } finally {
        setLoading(false);
      }
    }
    authInit();
  }, []);
  if (loading) return <Loader />;
  return children;
}

export default AuthProvider;
