import { Box, Typography } from "@mui/material";
import React from "react";

function ColumnPage({ columns }) {
  return (
    <Box sx={{ width: "100%", background: "background.paper", height: "100%" }}>
      <Typography variant="h2">Name column</Typography>
    </Box>
  );
}

export default ColumnPage;
