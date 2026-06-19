"use client";
import { Button, Typography } from "@mui/material";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginValidation, LoginValidation } from "@/validation/form.validation";
import { useForm } from "react-hook-form";
import { loginAction } from "../actions";
import TextFieldInp from "@/shared/ui/Inputs/TextFieldInp";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

function LoginForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginValidation>({
    resolver: zodResolver(loginValidation),
  });

  const router = useRouter();

  const submitHandler = async (data) => {
    const res = await loginAction(data);
    console.log("response", res);

    if (res.success) {
      toast.success(res.message);
      router.replace("/");
    } else {
      toast.error(res.message);

      if (res.error) {
        toast.error(res.error);
      }
    }
  };

  return (
    <form
      onSubmit={handleSubmit(submitHandler)}
      className="flex flex-col gap-5 border rounded-lg p-6 border-divider w-[400px]"
    >
      <Typography align="center" variant="h1">
        Login
      </Typography>
      <TextFieldInp
        register={register}
        type="email"
        error={errors.email}
        name="email"
        placeholder="Enter your Email"
      />

      <TextFieldInp
        register={register}
        type="password"
        error={errors.password}
        name="password"
        placeholder="Enter your password"
      />
      <Button type="submit" variant="contained">
        {isSubmitting ? "Sbmiting..." : "Submit"}
      </Button>
    </form>
  );
}

export default LoginForm;
