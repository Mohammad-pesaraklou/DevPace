import { jwtVerify } from "jose";
import { API_MESSAGES } from "@/constant/messages";
import BoardModel from "@/models/Board.model";
import connectToDb from "@/shared/lib/mongodb";
import ValidateBody from "@/shared/lib/validate";
import { BordPayload } from "@/shared/types/bord.types";
import { BoardSchema } from "@/validation/server/board.validation";
import { NextRequest, NextResponse } from "next/server";
import { getSession, requireAuth } from "@/shared/lib/auth";
import { Types } from "mongoose";
import { AUTH_MESSAGES } from "@/validation/messages/auth.messages";
const mockData = [
  {
    id: "6122333232",
    title: "some title",
    createdAt: 1221221,
    updatedAt: 2121221,
  },
  {
    id: "61223332cdwedwe32",
    title: "two title",
    createdAt: 1221221,
    updatedAt: 2121221,
  },
  {
    id: "612swwqs2333232",
    title: "third title",
    createdAt: 1221221,
    updatedAt: 2121221,
  },
];

export async function GET(req: NextRequest) {
  try {
    await connectToDb();

    // const session = await getSession();
    // if (!session) {
    //   return NextResponse.json(
    //     { message: AUTH_MESSAGES.UNAUTHORIZED },
    //     { status: 401 },
    //   );
    // }
    // const userId = session.id;

    const auth_result = await requireAuth(req);
    if (auth_result instanceof NextResponse) {
      return auth_result;
    }
    const userId = auth_result.user.id;

    const boards = await BoardModel.find({ creator: userId });
    console.log({ boards });
    const response = {
      data: boards,
      success: true,
    };
    return NextResponse.json(response, { status: 200 });
  } catch (error) {
    console.log("error in route handler", error);
    return NextResponse.json(
      { success: false, message: "خطای داخلی سرور رخ داده است" },
      { status: 500 },
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    await connectToDb();
    const authResult = await requireAuth(req);
    if (authResult instanceof NextResponse) {
      return authResult;
    }
    const { id: userId } = authResult.user;
    const body: BordPayload = await req.json();
    const { title, settings, stared } = body;
    const validateBody = ValidateBody(BoardSchema, body);
    if (validateBody instanceof NextResponse) {
      return validateBody;
    }
    const userObjectId = new Types.ObjectId(userId);
    const board = await BoardModel.create({ title, creator: userObjectId });
    const response = {
      data: board,
      success: true,
      message: API_MESSAGES.BOARD_CREATED,
    };
    return NextResponse.json(response, { status: 201 });
  } catch (error) {
    console.log("error in route handler", error);
    const response = {
      error,
      success: false,
      message: API_MESSAGES.WENT_WRONG,
    };

    return NextResponse.json(response, { status: 500 });
  }
}
