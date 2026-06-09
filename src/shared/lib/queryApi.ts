import { AUTH_MESSAGES } from "@/validation/messages/auth.messages";
import { tokenManager } from "../utils/token.manager";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

let isRefreshing: boolean = false;
let refreshPromise: Promise<string | null> | null = null;

async function handleRefreshRequest(): Promise<string | null> {
  if (isRefreshing && refreshPromise) return refreshPromise;

  isRefreshing = true;

  refreshPromise = (async () => {
    try {
      const refreshRes = await fetch(`${BASE_URL}/api/auth/refresh`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },

        credentials: "include",
      });

      if (!refreshRes.ok) throw new Error();

      const { data } = await refreshRes.json();
      tokenManager.setAccessToken(data.accessToken);
      return data.accessToken;
    } catch {
      return null;
    } finally {
      isRefreshing = false;
      refreshPromise = null;
    }
  })();

  return refreshPromise;
}

export default async function queryFetcher(url: string, init?: RequestInit) {
  const accessToken = tokenManager.getAccessToken();
  console.log("accessToken before log", { accessToken });
  let res = await fetch(`${BASE_URL}/${url}`, {
    ...init,
    headers: {
      "Content-Type": "application/json",
      authorization: `${accessToken ? `Bearer ${accessToken}` : ""}`,
    },
    credentials: "include",
  });
  if (res.status === 401 || res.status === 403) {
    const newAccessToken = await handleRefreshRequest();
    if (!newAccessToken) {
      throw new Error(AUTH_MESSAGES.UNAUTHORIZED);
    }
    res = await fetch(`${BASE_URL}/${url}`, {
      ...init,
      headers: {
        "Content-Type": "application/json",
        authorization: `${newAccessToken ? `Bearer ${newAccessToken}` : ""}`,
      },
      credentials: "include",
    });
  }
  return res.json();
}
