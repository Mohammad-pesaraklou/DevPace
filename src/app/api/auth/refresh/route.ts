import { API_MESSAGES } from "@/constant/messages";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import { verify } from "jsonwebtoken";
import { accessTokenOptions, genAccToken } from "@/shared/utils/auth.util";
import UserModel from "@/models/User.model";
import { AUTH_MESSAGES } from "@/validation/messages/auth.messages";
import connectToDb from "@/shared/lib/mongodb";

export async function POST(req: NextRequest) {
  try {
    await connectToDb();
    const refreshToken = (await cookies()).get("refreshToken")?.value;
    // console.log("refresh token in refshresh route", refreshToken);
    if (!refreshToken) {
      return NextResponse.json(
        { success: false, message: AUTH_MESSAGES.UNAUTHORIZED },
        { status: 403 },
      );
    }
    const verifyRes = verify(refreshToken, process.env.PRIVATE_JWT_TOKEN);

    if (verifyRes?.id) {
      const user = await UserModel.findById(verifyRes.id).lean();
      if (!user) {
        return NextResponse.json(
          { success: false, message: AUTH_MESSAGES.UNAUTHORIZED },
          { status: 403 },
        );
      }
      const userObj = {
        email: verifyRes.email,
        _id: verifyRes.id,
      };
      const accessToken = genAccToken(userObj);
      delete userObj._id;
      userObj["id"] = verifyRes.id;

      const response = NextResponse.json(
        { success: true, data: { user: userObj, accessToken } },
        { status: 201 },
      );

      response.cookies.set("accessToken", accessToken, accessTokenOptions);
      return response;
    }
  } catch (error) {
    console.log("error in refresh route", error);
    if (error?.message === AUTH_MESSAGES.JWT_MALFORMED) {
      (await cookies()).delete("refreshToken");
    }
    return NextResponse.json(
      { success: false, message: AUTH_MESSAGES.UNAUTHORIZED },
      { status: 401 },
    );
  }
}
