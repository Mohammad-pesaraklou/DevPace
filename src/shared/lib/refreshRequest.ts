import { HttpResponse, User } from "../types/types";
import { AUTH_MESSAGES } from "@/validation/messages/auth.messages";

type RefreshSuccess = {
  user: User;
  accessToken: string | null;
};

type RefreshResponse = RefreshSuccess | HttpResponse;

let refreshPromise: Promise<RefreshResponse> | null = null;

const BASE_URL = process.env.BASE_URL ?? process.env.NEXT_PUBLIC_BASE_URL;

async function refreshRequest() {
  if (!refreshPromise) {
    refreshPromise = (async () => {
      const response = await fetch(`${BASE_URL}/api/auth/refresh`, {
        method: "POST",
        credentials: "include",
      });

      // console.log("responsse retrun from api/redresh", response);
      if (response.status === 401 || response.status === 403) {
        return {
          message: AUTH_MESSAGES.UNAUTHORIZED,
          success: false,
          status: 401,
        } as HttpResponse<undefined>;
      }
      // console.log({ response });
      const { data } = await response.json();

      if (!("accessToken" in data)) {
        return {
          message: "invalid data",
          success: false,
          status: 400,
        } as HttpResponse;
      }

      return {
        accessToken: data.accessToken,
        user: data.user,
      };
    })().finally(() => {
      refreshPromise = null;
    });
  }

  return refreshPromise;
}

export default refreshRequest;
