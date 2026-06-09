import { Paper, Skeleton, Stack, Box } from "@mui/material";
import React from "react";
import { CardWrapper } from "@/features/taks/components/Task.Card";

function TaskSkeleton() {
  return (
    <Paper sx={{ pt: 2 }}>
      <CardWrapper elevation={0}>
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="flex-start"
          spacing={2}
        >
          <Skeleton variant="text" height={20} width="60%" />
          <Skeleton variant="circular" width={20} height={20} />
        </Stack>

        <Box sx={{ mt: 2 }}>
          <Skeleton variant="rounded" height={15} width="30%" />
        </Box>
      </CardWrapper>
    </Paper>
  );
}

export default TaskSkeleton;
