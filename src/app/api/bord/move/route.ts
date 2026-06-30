import { API_MESSAGES } from "@/constant/messages";
import ColumnModel from "@/models/Column.model";
import TaskModel from "@/models/Task.model";
import { requireAuth } from "@/shared/lib/auth";
import connectToDb from "@/shared/lib/mongodb";
import { IMoveColumnPayload } from "@/shared/types/column.type";
import { ID } from "@/shared/types/types";
import { CheckValidObjectID } from "@/shared/utils/auth.util";
import { NextRequest, NextResponse } from "next/server";

export const runtime = "nodejs";

export async function POST(req: NextRequest) {
  try {
    await connectToDb();
    await requireAuth(req);

    const body: IMoveColumnPayload = await req.json();
    const { from, to, colId } = body;
    console.log({ from, to, colId });
    const isValidId = CheckValidObjectID([from, to, colId]);

    if (!isValidId) {
      const response = {
        success: false,
        status: 401,
        message: API_MESSAGES.INVALID_ID,
      };

      return NextResponse.json(response);
    }
    await ColumnModel.findOneAndUpdate(
      { bordId: from, _id: colId },
      { $set: { bordId: to } },
    );
    await TaskModel.updateMany(
      { borderId: from, columnId: colId },
      { $set: { borderId: to } },
    );
    const response = {
      success: true,
      message: API_MESSAGES.COLUMN_MOVED,
    };

    return NextResponse.json(response);
  } catch (error) {
    const response = {
      success: false,
      status: error?.status || 500,
      message: API_MESSAGES.WENT_WRONG,
    };

    return NextResponse.json(response);
  }
}
