import { ID } from "./types";

export type TaskType = "done" | "block" | "pending";

export interface ITask {
  _id: ID;
  name: string;
  type: TaskType;
  columnId: ID;
  bordId: ID;
  order: number;
}
