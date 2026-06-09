import { API_MESSAGES } from "@/constant/messages";
import TaskModel from "@/models/Task.model";
import connectToDb from "@/shared/lib/mongodb";
import { ITask, TaskType } from "@/shared/types/tasks.types";
import { NextRequest, NextResponse } from "next/server";

type TBody = Omit<ITask, "_id">;
export async function POST(req: NextRequest) {
  try {
    await connectToDb();

    const { name, type, bordId, columnId, order }: TBody = await req.json();

    const task = await TaskModel.create({
      name,
      type,
      bordId,
      columnId,
      order,
    });
    const response = {
      success: true,
      message: API_MESSAGES.TASK_CREATEDD,
      data: task,
    };

    return NextResponse.json(response, { status: 201 });
  } catch (error) {
    console.log("error in add task api", error);
    const response = {
      error,
      success: false,
      message: API_MESSAGES.WENT_WRONG,
    };

    return NextResponse.json(response, { status: 500 });
  }
}
