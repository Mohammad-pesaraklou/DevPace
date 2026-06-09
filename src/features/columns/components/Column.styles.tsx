"use client";
import { Paper, PaperProps, Stack } from "@mui/material";
import { styled } from "@mui/material/styles";

// types

interface ICustomPaperProp extends PaperProps {
  customPadding?: string;
}

export const ColumnWrapper = styled(Paper, {
  shouldForwardProp: (prop) => prop !== "customPadding",
})<ICustomPaperProp>(({ theme, customPadding }) => ({
  width: 320,
  minWidth: 320,
  background: theme.palette.background.paper,
  borderRadius: 12,
  padding: customPadding ?? "12px 12px",
  display: "flex",
  flexDirection: "column",
  overflow: "hidden",
  boxShadow: theme.shadows[1],
  transition: "box-shadow 0.2s ease, background 0.2s ease",
  "&:hover": {
    boxShadow: theme.shadows[4],
  },
}));

export const ColumnHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  padding: "4px 4px 12px 4px",
  borderBottom: `1px solid ${theme.palette.divider}`,
}));

export const CardsContainer = styled(Stack)(({ theme }) => ({
  marginTop: 12,
  gap: 10,
  flex: 1,
  overflowY: "auto",
  paddingRight: 4,
  paddingBottom: 8,
  maxHeight: "70vh",
}));
