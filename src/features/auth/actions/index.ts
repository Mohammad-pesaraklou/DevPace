import { HttpResponse } from "@/shared/types/types";
import { LoginResponse } from "../types";
import { LoginValidation } from "@/validation/form.validation";

export async function loginAction(
  data: LoginValidation,
): Promise<HttpResponse<LoginResponse> | HttpResponse<undefined>> {
  console.log({ data });

  try {
    const response = await fetch(`/api/auth/login`, {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    });
    const result = await response.json();

    return result;
  } catch (error) {
    console.log(error);

    return error;
  }
}

export async function logoutAction() {
  try {
    await fetch(`/api/auth/logout`, {
      credentials: "include",
    });
    window.location.href = "/";
  } catch (error) {
    console.log(error);

    return error;
  }
}
