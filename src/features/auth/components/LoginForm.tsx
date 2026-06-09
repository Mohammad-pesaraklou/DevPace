"use client";
import { Container, TextField, Typography } from "@mui/material";
import React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginValidation, LoginValidation } from "@/validation/form.validation";
import { useForm } from "react-hook-form";
function LoginForm() {
  const { register } = useForm<LoginValidation>({
    resolver: zodResolver(loginValidation),
  });
  return (
    <>
      <Typography align="center" variant="h1">
        Login
      </Typography>
      <TextField {...register("email")} placeholder="Enter your name" />
      <TextField {...register("password")} placeholder="Enter your password" />
    </>
  );
}

export default LoginForm;
