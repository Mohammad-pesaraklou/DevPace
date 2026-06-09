import { API_MESSAGES } from "@/constant/messages";
import ColumnModel from "@/models/Column.model";
import { requireAuth } from "@/shared/lib/auth";
import { Params } from "@/shared/types/types";
import { isValidObjectId } from "mongoose";
import { NextRequest, NextResponse } from "next/server";

export async function PUT(
  req: NextRequest,
  { params }: Params<{ columnId: string }>,
) {
  try {
    const authResult = await requireAuth(req);
    if (authResult instanceof NextResponse) {
      return authResult;
    }
    const { columnId } = await params;
    const newName = await req.json();

    if (!isValidObjectId(columnId)) {
      return NextResponse.json({
        success: false,
        message: API_MESSAGES.INVALID_ID,
      });
    }
    console.log({ newName, columnId });
    const column = await ColumnModel.findByIdAndUpdate(
      columnId,
      { $set: { name: newName } },
      { returnDocument: "after" },
    );
    console.log("colmn created", column);
    const response = {
      success: true,
      message: API_MESSAGES.COLUMN_RENMAE,
      data: column,
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
export async function DELETE(
  req: NextRequest,
  { params }: Params<{ columnId: string }>,
) {
  try {
    const authResult = await requireAuth(req);
    if (authResult instanceof NextResponse) {
      return authResult;
    }
    const { columnId } = await params;

    if (!isValidObjectId(columnId)) {
      return NextResponse.json({
        success: false,
        message: API_MESSAGES.INVALID_ID,
      });
    }
    await ColumnModel.findByIdAndDelete(columnId);
    const response = {
      success: true,
      message: API_MESSAGES.COLUMN_DELETED,
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
