import { API_MESSAGES } from "@/constant/messages";
import BoardModel from "@/models/Board.model";
import ColumnModel from "@/models/Column.model";
import TaskModel from "@/models/Task.model";
import { requireAuth } from "@/shared/lib/auth";
import connectToDb from "@/shared/lib/mongodb";
import { Params } from "@/shared/types/types";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
  { params }: Params<{ id: string }>,
) {
  try {
    await connectToDb();
    const authResult = await requireAuth(req);
    if (authResult instanceof NextResponse) {
      return authResult;
    }
    const { id: bordID } = await params;
    const bord = await BoardModel.findById(bordID, {});
    const columns = await ColumnModel.find({ bordId: bordID }).sort({
      order: 1,
    });
    const tasks = await TaskModel.find({ bordId: bordID }).sort({ order: 1 });

    const response = {
      success: true,
      data: {
        bord,
        columns,
        tasks,
      },
    };

    return NextResponse.json(response, { status: 200 });
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
