import { Button, ButtonProps } from "@mui/material";
import React, { ReactNode } from "react";

interface Props extends ButtonProps {
  children: ReactNode;
}

function AppButton({ variant = "contained", children, ...props }: Props) {
  return (
    <Button variant={variant} {...props}>
      {children}
    </Button>
  );
}

export default AppButton;
