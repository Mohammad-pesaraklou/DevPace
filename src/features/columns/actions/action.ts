"use server";
import { forceLogout } from "@/shared/lib/auth";
import { IMoveColumnPayload } from "./../../../shared/types/column.type";

import apiFetch from "@/shared/lib/apiFetch";
import { IColumn } from "@/shared/types/column.type";
import { HttpResponse, ID } from "@/shared/types/types";
import { AUTH_MESSAGES } from "@/validation/messages/auth.messages";
import { revalidatePath, revalidateTag } from "next/cache";

type IBaseCol = Omit<IColumn, "_id">;

export async function createColumn(
  col: IBaseCol,
): Promise<HttpResponse<IColumn> | undefined> {
  try {
    const response = (await apiFetch("api/bord/column", {
      method: "POST",
      body: JSON.stringify(col),
    })) as HttpResponse<IColumn> | undefined;

    const bordId = response?.data?.bordId;

    if (bordId) {
      revalidateTag(`bord/${String(bordId)}`);
    }

    console.log("repsonse in create col ", response);

    return response;
  } catch (error) {
    if (error.message === AUTH_MESSAGES.UNAUTHORIZED) await forceLogout();

    console.log("error happen in createColumn", error);

    return error;
  }
}

export async function renameColumnAction(
  name: string,
  colId: ID,
  bordId: string,
): Promise<HttpResponse<IColumn> | undefined> {
  try {
    const response = await apiFetch(`api/bord/column/${colId}`, {
      method: "PUT",
      body: JSON.stringify(name),
    });

    if (bordId) {
      revalidateTag(`bord/${String(bordId)}`);
    }

    return response;
  } catch (error) {
    if (error.message === AUTH_MESSAGES.UNAUTHORIZED) await forceLogout();

    console.log("error happen in renameColumnAction", error);

    return error;
  }
}

export async function deleteColumnAction(
  colId: ID,
  bordId: string,
): Promise<HttpResponse<IColumn> | undefined> {
  try {
    const response = await apiFetch(`api/bord/column/${colId}`, {
      method: "DELETE",
    });

    if (bordId) {
      revalidateTag(`bord/${String(bordId)}`);
      revalidatePath(`bord/${String(bordId)}`);
    }

    return response;
  } catch (error) {
    if (error.message === AUTH_MESSAGES.UNAUTHORIZED) await forceLogout();

    console.log("error happen in deleting column", error);

    return error;
  }
}

export async function moveColumnAction({
  from,
  to,
  colId,
}: IMoveColumnPayload): Promise<HttpResponse | undefined> {
  try {
    const response = await apiFetch(`api/bord/move`, {
      method: "POST",
      body: JSON.stringify({ from, to, colId }),
    });

    if (from && to && response?.success) {
      revalidateTag(`bord/${String(from)}`);
      revalidateTag(`bord/${String(to)}`);
    }
    console.log("moveColumnAction in action repsonse", { response });

    return response;
  } catch (error) {
    if (error.message === AUTH_MESSAGES.UNAUTHORIZED) await forceLogout();

    console.log("error happen in deleting column", error);

    return error;
  }
}
