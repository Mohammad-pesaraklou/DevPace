"use client";
import {
  Paper,
  Typography,
  Stack,
  Button,
  TextField,
  PaperProps,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import React, { ChangeEvent, useState } from "react";
// icons
import AddIcon from "@mui/icons-material/Add";
// types
import { IColumn } from "@/shared/types/column.type";
// state
import useColumnStore from "@/store/createColumnSlice";
import useBordStore from "@/store/createBoardSlice";
// components
import TaskCard from "@/features/taks/components/Task.Card";
import AddCard from "@/shared/ui/modals/AddCard";

import { Draggable, Droppable } from "@hello-pangea/dnd";
import { fa } from "zod/v4/locales";
import ColumnMoreOptions from "./ColumnMoreOptions";
import { CardsContainer, ColumnHeader, ColumnWrapper } from "./Column.styles";

interface IColumnProps {
  columnId: string;
  index: number;
}

export default React.memo(function Column({ columnId, index }: IColumnProps) {
  const column = useBordStore((state) => state.columns[columnId]);
  console.log({ column });
  const { _id, bordId, name, order } = column;
  const [IsopenAddCard, setIsOpenAddCard] = useState(false);
  const [IsEdit, setIsEdit] = useState(false);
  const [colName, setColName] = useState(name);
  const [IsShow, setIsShow] = useState(fa);
  console.log("column re render", `${name}:${_id}`);
  const renameColumn = useBordStore((state) => state.renameColumn);
  const setSelectedColumnId = useColumnStore(
    (state) => state.setSelectedColumnId,
  );
  const rowTasks = useBordStore((state) => state.tasks);
  const tasks = Object.values(rowTasks ?? {})
    .filter((task) => task.columnId === _id)
    .sort((a, b) => a.order - b.order);

  function renameHandler(id: string) {}

  return (
    <Draggable index={index} draggableId={String(_id)}>
      {(provided) => (
        <ColumnWrapper
          ref={provided.innerRef}
          {...provided.draggableProps}
          elevation={0}
        >
          <div
            className={`${IsEdit && "fixed inset-0 w-screen h-screen z-40"}`}
            onClick={() => setIsEdit(false)}
          ></div>
          {/* Header */}
          <ColumnHeader
            onDoubleClick={() => setIsEdit(true)}
            {...provided.dragHandleProps}
          >
            {IsEdit ? (
              <TextField
                value={colName}
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  setColName(e.target.value)
                }
                onBlur={() => renameColumn(colName, String(_id))}
                name="colName"
                className="z-50"
                aria-label="change olumn name input"
              />
            ) : (
              <Typography
                variant="subtitle1"
                fontWeight={600}
                sx={{ lineHeight: 1.3 }}
              >
                {name}
              </Typography>
            )}

            <ColumnMoreOptions setIsEdit={setIsEdit} columnId={String(_id)} />
          </ColumnHeader>

          {/* Cards as Droppable area */}
          <Droppable droppableId={String(_id)}>
            {(provided, snapshot) => (
              <CardsContainer
                ref={provided.innerRef}
                {...provided.droppableProps}
                sx={{
                  backgroundColor: snapshot.isDraggingOver
                    ? "action.hover"
                    : "transparent",
                }}
                className="transition-colors duration-150"
              >
                {tasks.map((task, index) => (
                  <TaskCard
                    key={String(task._id)}
                    index={index}
                    _id={task._id}
                    bordId={task.bordId}
                    columnId={task.columnId ?? _id}
                    name={task.name}
                    order={task.order}
                    type={task.type}
                  />
                ))}

                {provided.placeholder}
              </CardsContainer>
            )}
          </Droppable>

          <Button
            variant="text"
            startIcon={<AddIcon />}
            onClick={() => {
              setSelectedColumnId(String(_id));
              setIsOpenAddCard(true);
            }}
            sx={{
              justifyContent: "flex-start",
              paddingX: 1,
              marginTop: 1,
              color: "text.secondary",
              textTransform: "none",
              "&:hover": { bgcolor: "action.hover" },
            }}
          >
            Add a card
          </Button>

          {IsopenAddCard && (
            <AddCard open={IsopenAddCard} setOpen={setIsOpenAddCard} />
          )}
        </ColumnWrapper>
      )}
    </Draggable>
  );
});
