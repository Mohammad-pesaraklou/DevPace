import * as z from "zod";

export const loginValidation = z.object({
  email: z.email({ error: "please enter a valid email" }),
  password: z.string().min(8).max(28),
});

export type LoginValidation = z.infer<typeof loginValidation>;
