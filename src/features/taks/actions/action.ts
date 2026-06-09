"use server";

import apiFetch from "@/shared/lib/apiFetch";
import { ITask } from "@/shared/types/tasks.types";
import { HttpResponse } from "@/shared/types/types";
import { revalidateTag } from "next/cache";

export async function createTaskAction(
  payload: Omit<ITask, "_id">,
): Promise<HttpResponse<ITask> | undefined> {
  try {
    const response = await apiFetch("api/bord/task", {
      method: "POST",
      body: JSON.stringify(payload),
    });
    console.log("response for create task action", response);
    if (payload.bordId && response?.success) {
      revalidateTag(`bord/${payload.bordId}`);
    }
    return response;
  } catch (error) {
    console.log("error in create Task Action", error);
  }
}
