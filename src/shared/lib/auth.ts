import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { API_MESSAGES } from "@/constant/messages";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { AUTH_MESSAGES } from "@/validation/messages/auth.messages";
import { verifyToken } from "../utils/auth.util";
import { ID } from "../types/types";

export async function requireAuth(request: NextRequest) {
  const authHeader = request.headers.get("authorization");
  const cookieStore = await cookies();

  if (!authHeader) {
    return NextResponse.json(
      { message: AUTH_MESSAGES.UNAUTHORIZED },
      { status: 401 },
    );
  }
  const [prefix, token] = authHeader.split(" ");

  if (prefix !== "Bearer") {
    cookieStore.delete("accessToken");

    return NextResponse.json(
      { message: AUTH_MESSAGES.UNAUTHORIZED },
      { status: 401 },
    );
  }

  if (!token || token === "null" || token === "undefined") {
    return NextResponse.json(
      { message: AUTH_MESSAGES.UNAUTHORIZED },
      { status: 401 },
    );
  }

  try {
    const payload = jwt.verify(token, process.env.PRIVATE_JWT_TOKEN!);

    return { user: payload };
  } catch {
    cookieStore.delete("accessToken");

    return NextResponse.json(
      { message: API_MESSAGES.INVALID_TOKEN },
      { status: 401 },
    );
  }
}

type UserPayload = {
  id: ID;
  email: string;
};

export async function getSession(): Promise<UserPayload | false> {
  const cookieStore = await cookies();
  const refreshToken = cookieStore.get("refreshToken")?.value;

  if (!refreshToken) {
    return false;
  }

  // verify refreshToken
  try {
    const payload = (await jwt.verify(
      refreshToken,
      process.env.PRIVATE_JWT_TOKEN,
    )) as UserPayload;

    return payload;
  } catch (error) {
    console.log({ error });
    cookieStore.delete("refreshToken");

    return false;
  }
}

export async function forceLogout() {
  redirect("/api/auth/logout");
}
//   const auth = await requireAuth(request);

//   if (auth.error) return auth.error;

//   const user = auth.user;
