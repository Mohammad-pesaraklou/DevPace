import { z } from "zod";

export const userSchema = z.object({
  fullName: z
    .string()
    .min(1, "نام الزامی است")
    .min(3, "نام باید حداقل 3 کاراکتر باشد"),

  email: z.string().min(1, "ایمیل الزامی است").email("فرمت ایمیل معتبر نیست"),

  role: z.string().min(1, "نقش کاربر الزامی است"),

  isActive: z.boolean(),
  isAwsome: z.boolean({ error: "ضروریه" }),
  bio: z.string().max(300, "بیو نباید بیشتر از 300 کاراکتر باشد").optional(),
});

export type UserFormValues = z.infer<typeof userSchema>;
