import { ID } from "./types";

export interface IColumn {
  _id: ID;
  name: string;
  order: number;
  bordId: ID;
}

export interface IMoveColumnPayload {
  from: ID;
  to: ID;
  colId: string;
}
