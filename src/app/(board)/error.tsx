"use client";
import { Box, Button, Typography, Container } from "@mui/material";
import RefreshIcon from "@mui/icons-material/Refresh";
import DashboardIcon from "@mui/icons-material/Dashboard";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  console.log({ error });
  return (
    <Container maxWidth="sm">
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          minHeight: "80vh",
          textAlign: "center",
          gap: 2,
        }}
      >
        <Box sx={{ fontSize: 64, color: "text.secondary", opacity: 0.5 }}>
          <DashboardIcon fontSize="inherit" />
        </Box>

        <Typography variant="h4" fontWeight="bold">
          {error.message || "Something went wrong"}
        </Typography>

        <Typography variant="body1" color="text.secondary" sx={{ mb: 2 }}>
          We {`couldn't`} load your board. Please check your connection or try
          again.
        </Typography>

        <Box sx={{ display: "flex", gap: 2 }}>
          <Button
            variant="contained"
            startIcon={<RefreshIcon />}
            onClick={() => reset()}
            sx={{ textTransform: "none", borderRadius: 2 }}
          >
            Try again
          </Button>

          <Button
            variant="outlined"
            onClick={() => (window.location.href = "/boards")}
            sx={{ textTransform: "none", borderRadius: 2 }}
          >
            Back to Boards
          </Button>
        </Box>
      </Box>
    </Container>
  );
}
