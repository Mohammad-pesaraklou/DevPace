"use server";
import apiFetch from "../../../shared/lib/apiFetch";
import {
  BordPayload,
  IBord,
  IBordDetails,
} from "../../../shared/types/bord.types";
import { HttpResponse, ID } from "../../../shared/types/types";
import { AUTH_MESSAGES } from "@/validation/messages/auth.messages";
import { forceLogout } from "@/shared/lib/auth";
import BoardModel from "@/models/Board.model";
import ColumnModel from "@/models/Column.model";
import TaskModel from "@/models/Task.model";
import connectToDb from "@/shared/lib/mongodb";
import { SafeParser } from "@/shared/utils/util";
import { cookies } from "next/headers";
import { revalidateTag, unstable_cache } from "next/cache";

export async function getBoardsClient(
  userId: string,
): Promise<IBord[] | HttpResponse> {
  console.log("get boards called");
  try {
    const response = await apiFetch(`api/bord`, {
      next: { tags: [`boards`] },
    });

    console.log("response in getting boards", response);
    return response?.data;
  } catch (error) {
    console.log("error in getBoards", error);
    if (error.message === AUTH_MESSAGES.UNAUTHORIZED) await forceLogout();

    const response = {
      success: false,
      message: error?.message,
    };

    return response;
  }
}

const getBoardsCached = unstable_cache(
  async (userId: string) => {
    console.log("get boards called", userId);

    await connectToDb();
    const boards = await BoardModel.find({ creator: userId }).lean();

    return boards;
  },
  ["getBoards"],
  {
    tags: ["boards"],
  },
);

export async function getBoards(userId: string): Promise<IBord[] | undefined> {
  const boards = await getBoardsCached(userId);
  return SafeParser(boards);
}
export async function createBoard({
  title,
}: BordPayload): Promise<HttpResponse<IBord> | undefined> {
  try {
    const response = (await apiFetch(`api/bord`, {
      method: "POST",
      body: JSON.stringify({ title }),
    })) as HttpResponse<IBord> | undefined;

    if (response?.success) {
      revalidateTag("boards");
    }

    return response;
  } catch (error) {
    console.log("error happen in creating bord", error);
  }
}

export async function getBoardData(
  id: ID,
): Promise<HttpResponse<IBordDetails> | undefined> {
  try {
    const res = await apiFetch(`api/bord/${id}`, {
      next: { tags: [`bord/${String(id)}`] },
    });

    if (!res?.success) return;

    // console.log("response from data >>", res.data);
    return res;
  } catch (error) {
    console.log("error in getting board data", error);
  }
}

export async function getBordData(
  id: ID,
  userId: string,
): Promise<IBordDetails | undefined> {
  await connectToDb();
  // console.log("*** getBordData called ", { bordId: id });

  const bord = await BoardModel.findById(id, {}).lean();
  if (String(bord.creator) !== userId) {
    throw new Error("dont allow!");
  }
  const columns = await ColumnModel.find({ bordId: id })
    .sort({
      order: 1,
    })
    .lean();
  const tasks = await TaskModel.find({ bordId: id }).sort({ order: 1 }).lean();
  return SafeParser<IBordDetails>({ bord, columns, tasks });
}
