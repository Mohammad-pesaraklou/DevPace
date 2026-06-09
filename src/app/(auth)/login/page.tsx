import LoginForm from "@/features/auth/components/Login";
import { Container } from "@mui/material";
import React from "react";

function LoginPage() {
  return (
    <Container
      sx={{
        width: "100%",
        backgroundColor: "background",
        minHeight: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <LoginForm />
    </Container>
  );
}

export default LoginPage;
