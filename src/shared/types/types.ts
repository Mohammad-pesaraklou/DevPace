import { Types } from "mongoose";

export type ErrorResponse = {
  message: string;
  success: boolean;
  status: number;
};
export type HttpResponse<T = undefined> = {
  success: boolean;
  message?: string;
  data?: T;
  error?: string;
};
export type ID = string | Types.ObjectId;
export type TWithId = { _id: string | Types.ObjectId };

export type User = {
  email: string;
  id: string;
};
export type BaseUser = {
  fullName: string;
  password: string;
  age: number;
  createdAt: Date;
};

export type Params<T> = {
  params: Promise<T>;
};
