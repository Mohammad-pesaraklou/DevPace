import { API_MESSAGES } from "@/constant/messages";
import ColumnModel from "@/models/Column.model";
import { requireAuth } from "@/shared/lib/auth";
import connectToDb from "@/shared/lib/mongodb";
import { IColumn } from "@/shared/types/column.type";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    await connectToDb();
    const authResult = await requireAuth(req);

    if (authResult instanceof NextResponse) {
      return authResult;
    }
    const body: Omit<IColumn, "_id"> = await req.json();
    const { bordId, name, order } = body;
    const column: IColumn = await ColumnModel.create({
      bordId,
      name,
      order,
    });
    const response = {
      success: true,
      data: column,
      message: API_MESSAGES.COLUMN_CREATED,
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
