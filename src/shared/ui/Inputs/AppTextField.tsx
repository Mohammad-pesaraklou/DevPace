import TextField, { TextFieldProps } from "@mui/material/TextField";

type AppTextFieldProps = TextFieldProps;

export default function AppTextField({
  size = "small",
  fullWidth = true,
  variant = "outlined",
  ...props
}: AppTextFieldProps) {
  return (
    <TextField size={size} fullWidth={fullWidth} variant={variant} {...props} />
  );
}
