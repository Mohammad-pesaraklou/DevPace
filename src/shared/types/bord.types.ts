import { Types } from "mongoose";
import { IColumn } from "./column.type";
import { ITask, TaskType } from "./tasks.types";
import { ID } from "./types";

export interface IBord {
  _id: string | Types.ObjectId;
  title: string;
  stared?: boolean;
  settings?: Record<string, object>;
  createdAt: number;
  updatedAt: number;
}

export type BordPayload = Omit<IBord, "createdAt" | "updatedAt" | "_id">;

export interface IBordDetails {
  bord: IBord;
  columns: IColumn[];
  tasks: ITask[];
}
export type IBaseCol = Omit<IColumn, "_id">;
export type TMoveTaskPayload = {
  taskId: string;
  fromColumnId: string;
  toColumnId: string;
  fromIndex: number;
  toIndex: number;
};
export type AddTaskPayload = {
  name: string;
  type: TaskType;
  columnId: ID;
};
export type MoveTaskPayload = {
  fromIndex: number;
  toIndex: number;
};
