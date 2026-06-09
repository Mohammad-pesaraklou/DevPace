"use client";

import { Paper, Typography, Box, Chip, IconButton, Stack } from "@mui/material";
import { styled } from "@mui/material/styles";
import { Draggable } from "@hello-pangea/dnd";
// types
import { ITask } from "@/shared/types/tasks.types";
// icons
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
// util
import { getTypeColor } from "@/shared/utils/util";
import TaskMoreOptions from "./TaskMoreOptions";

export const CardWrapper = styled(Paper)(({ theme }) => ({
  padding: "12px 12px",
  borderRadius: 10,
  cursor: "pointer",
  border: `1px solid ${theme.palette.divider}`,
  backgroundColor: theme.palette.background.default,
  transition: "all 0.2s ease",
  boxShadow: theme.shadows[0],

  "&:hover": {
    boxShadow: theme.shadows[3],
  },
}));

const TaskTitle = styled(Typography)(() => ({
  fontWeight: 500,
  lineHeight: 1.4,
  wordBreak: "break-word",
}));
{
  /* future: avatar / comments count / attachments */
}

export default function TaskCard({
  _id,
  bordId,
  columnId,
  name,
  order,
  type,
  index,
}: ITask & { index: number }) {
  return (
    <Draggable draggableId={String(_id)} index={index}>
      {(provided, snapshot) => (
        <Paper
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          sx={{
            padding: 1,
            borderRadius: 1,
            boxShadow: snapshot.isDragging ? 4 : 1,
            backgroundColor: "background.paper",
            transition: "box-shadow 0.2s ease, transform 0.2s ease",
          }}
        >
          <CardWrapper elevation={0}>
            {/* Header */}
            <Stack
              direction="row"
              justifyContent="space-between"
              alignItems="flex-start"
            >
              <TaskTitle variant="body2">{name}</TaskTitle>

              <TaskMoreOptions taskId={String(_id)} />
            </Stack>

            {/* Footer */}
            <Box
              mt={1}
              display="flex"
              justifyContent="space-between"
              alignItems="center"
            >
              {type && (
                <Chip
                  label={type}
                  size="small"
                  color={getTypeColor(type) as any}
                  sx={{
                    fontSize: 11,
                    height: 22,
                    borderRadius: 6,
                  }}
                />
              )}

              {/* future: avatar / comments count / attachments */}
            </Box>
          </CardWrapper>
        </Paper>
      )}
    </Draggable>
  );
}
