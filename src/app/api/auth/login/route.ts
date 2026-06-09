import { API_MESSAGES } from "@/constant/messages";
import UserModel from "@/models/User.model";
import connectToDb from "@/shared/lib/mongodb";
import ValidateBody from "@/shared/lib/validate";
import {
  accessTokenOptions,
  compareHashedPass,
  genAccToken,
  genRefToken,
  hashPassword,
  refreshTokenOptions,
} from "@/shared/utils/auth.util";
import { loginValidateSchema } from "@/validation/server/login.validation";
import { NextRequest, NextResponse } from "next/server";
import { LoginValidation } from "@/validation/form.validation";
export async function POST(req: NextRequest) {
  try {
    await connectToDb();
    const body: LoginValidation = await req.json();

    console.log({ body });
    const validateResponse = ValidateBody(loginValidateSchema, body);
    // check body
    if (validateResponse instanceof NextResponse) {
      return validateResponse;
    }

    const existedUser = await UserModel.findOne({ email: body.email }).lean();

    let refreshToken: string;
    let AccessToken: string;

    if (existedUser) {
      const compareRes = compareHashedPass(body.password, existedUser.password);
      if (!compareRes) {
        return NextResponse.json(
          { message: "invalid email or password", success: false },
          { status: 401 },
        );
      }

      refreshToken = genRefToken(existedUser);
      AccessToken = genAccToken(existedUser);

      const payload = {
        accessToken: AccessToken,
      };
      const response = NextResponse.json({
        message: API_MESSAGES.LOGIN_SUCCESS,
        data: payload,
        success: true,
      });

      response.cookies.set("refreshToken", refreshToken, refreshTokenOptions);

      response.cookies.set("accessToken", AccessToken, accessTokenOptions);

      return response;
    }

    const hashedPass = hashPassword(body.password);

    const user = await UserModel.create({
      email: body.email,
      password: hashedPass,
    });

    refreshToken = genRefToken(user);
    AccessToken = genAccToken(user);

    const payload = {
      accessToken: AccessToken,
    };

    const response = NextResponse.json({
      message: API_MESSAGES.LOGIN_SUCCESS,
      data: payload,
      success: true,
    });
    response.cookies.set("refreshToken", refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 60 * 60 * 24 * 7, // seconds
      sameSite: "lax",
      path: "/",
    });

    return response;
  } catch (error) {
    console.log("error in login api", error);

    return NextResponse.json(
      { success: false, message: "error in login api route" },
      { status: 500 },
    );
  }
}
