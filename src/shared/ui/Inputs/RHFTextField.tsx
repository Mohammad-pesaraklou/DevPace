import {
  FieldValues,
  Path,
  useController,
  useFormContext,
} from "react-hook-form";
import { TextFieldProps } from "@mui/material/TextField";
import AppTextField from "./AppTextField";

type RHFTextFieldProps<TFieldValues extends FieldValues> = TextFieldProps & {
  name: Path<TFieldValues>;
};

export default function RHFTextField<TFieldValues extends FieldValues>({
  name,
  helperText,
  ...props
}: RHFTextFieldProps<TFieldValues>) {
  const { control } = useFormContext<TFieldValues>();

  const {
    field,
    fieldState: { error },
  } = useController({
    name,
    control,
  });

  return (
    <AppTextField
      {...field}
      {...props}
      value={field.value ?? ""}
      error={!!error}
      helperText={error?.message || helperText}
    />
  );
}
