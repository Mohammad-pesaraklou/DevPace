import { ID } from "@/shared/types/types";
import { NextRequest } from "next/server";

declare module "next/server" {
  interface NextRequest {
    user?: {
      id: ID;
      email?: string;
      [key: string]: any;
    };
  }
}
