import jwt, { verify } from "jsonwebtoken";
import { isValidObjectId, Types } from "mongoose";
import { genSaltSync, hashSync, compareSync } from "bcrypt";

import { ID } from "../types/types";

export type UserPayload = {
  email: string;
  _id: string | Types.ObjectId;
};

export const genRefToken = (user: UserPayload) => {
  return jwt.sign(
    { id: user._id, email: user.email },
    process.env.PRIVATE_JWT_TOKEN,
    { expiresIn: "7d" },
  );
};

export const refreshTokenOptions = {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  maxAge: 60 * 60 * 24 * 7,
  sameSite: "lax",
  path: "/",
} as const;

export const genAccToken = (user: UserPayload) => {
  return jwt.sign(
    { id: user._id, email: user.email },
    process.env.PRIVATE_JWT_TOKEN,
    { expiresIn: "15m" },
  );
};

export const accessTokenOptions = {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  maxAge: 60 * 60 * 24 * 7,
  sameSite: "lax",
  path: "/",
} as const;

export const hashPassword = (pass: string) => {
  const salt = genSaltSync(10);

  return hashSync(pass, salt);
};

export const compareHashedPass = (pass: string, hashedPass: string) => {
  return compareSync(pass, hashedPass);
};

export function CheckValidObjectID(id: ID | ID[]): boolean {
  if (Array.isArray(id)) {
    const cond = id.every((i) => isValidObjectId(i));

    return cond;
  }

  return isValidObjectId(id);
}

export async function verifyToken(token: string) {
  return await verify(token, process.env.PRIVATE_JWT_TOKEN);
}
