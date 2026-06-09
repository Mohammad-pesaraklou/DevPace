import { TextField } from "@mui/material";
import {
  FieldErrors,
  FieldValues,
  Path,
  UseFormRegister,
} from "react-hook-form";
import { HTMLInputTypeAttribute } from "react";

interface Props<T extends FieldValues> {
  register: UseFormRegister<T>;
  name: Path<T>;
  type: HTMLInputTypeAttribute;
  placeholder: string;
  error?: FieldErrors<T>;
}

export default function TextFieldInp<T extends FieldValues>({
  register,
  name,
  type,
  placeholder,
  error,
}: Props<T>) {
  return (
    <TextField
      {...register(name)}
      name={name}
      type={type}
      placeholder={placeholder}
      error={!!error}
      helperText={error?.message as string | undefined}
      fullWidth
      // label
    />
  );
}
