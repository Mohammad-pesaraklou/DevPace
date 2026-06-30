import { NextRequest, NextResponse } from "next/server";
import { jwtVerify } from "jose";
import { publicPages } from "./constant";
import { ID } from "./shared/types/types";

const secret = new TextEncoder().encode(process.env.PRIVATE_JWT_TOKEN);

export async function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;
  const refreshToken = request.cookies.get("refreshToken")?.value;

  const isPublic = publicPages.includes(pathname);

  if (!refreshToken) {
    if (!isPublic) {
      const loginUrl = new URL("/login", request.url);

      return NextResponse.redirect(loginUrl);
    }

    return NextResponse.next();
  }

  // verify refreshToken
  try {
    await jwtVerify(refreshToken, secret);
  } catch {
    const res = NextResponse.redirect(new URL("/login", request.url));
    res.cookies.delete("refreshToken");

    return res;
  }

  if (isPublic && pathname !== "/") {
    return NextResponse.redirect(new URL("/", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico|images).*)"],
};
