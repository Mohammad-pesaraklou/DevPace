import { cookies } from "next/headers";
import { AUTH_MESSAGES } from "@/validation/messages/auth.messages";
import { tokenManager } from "../utils/token.manager";

const BASE_URL = process.env.BASE_URL;

let isRefreshing: boolean = false;
let refreshPromise: Promise<string | null> | null = null;

async function handleRefreshRequest(): Promise<string | null> {
  if (isRefreshing && refreshPromise) return refreshPromise;

  isRefreshing = true;

  refreshPromise = (async () => {
    try {
      const cookieStore = await cookies();
      const refreshToken = cookieStore.get("refreshToken")?.value;

      const refreshRes = await fetch(`${BASE_URL}/api/auth/refresh`, {
        method: "POST",
        headers: { Cookie: `refreshToken=${refreshToken}` },
      });

      if (!refreshRes.ok) throw new Error();

      const { data } = await refreshRes.json();
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

export default async function apiFetch(url: string, init?: RequestInit) {
  const cookieStore = await cookies();
  const refreshToken = cookieStore.get("refreshToken")?.value;
  const accessToken = cookieStore.get("accessToken")?.value;
  tokenManager.setAccessToken(accessToken ?? null);

  const headers = new Headers(init?.headers);
  if (refreshToken) {
    headers.set("Cookie", `refreshToken=${refreshToken}`);
  }
  let res = await fetch(`${BASE_URL}/${url}`, {
    ...init,
    headers: {
      ...headers,
      Authorization: accessToken ? `Bearer ${accessToken}` : "",
    },
  });
  if (res.status === 401 || res.status === 403) {
    const newAccessToken = await handleRefreshRequest();
    if (!newAccessToken) {
      throw new Error(AUTH_MESSAGES.UNAUTHORIZED);
    }
    tokenManager.setAccessToken(newAccessToken);
    res = await fetch(`${BASE_URL}/${url}`, {
      ...init,
      headers: {
        ...headers,
        Authorization: `Bearer ${newAccessToken}`,
      },
    });
  }
  return res.json();
}
