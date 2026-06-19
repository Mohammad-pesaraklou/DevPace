"use client";
import { use, useEffect, useRef } from "react";
import styled from "@emotion/styled";
import { DragDropContext, Droppable, DropResult } from "@hello-pangea/dnd";
// types
import { IBordDetails } from "@/shared/types/bord.types";
import { HttpResponse } from "@/shared/types/types";
// state
import useBordStore from "@/store/createBoardSlice";
// components
import Column from "./Column";

export interface Props {
  bordData: IBordDetails | undefined;
}

const ColumnContainer = styled("div")(({ theme }) => ({
  width: "100%",
  minHeight: "100%",
  display: "flex",
  flexDirection: "row",
  gap: "12px",
  overflowX: "auto",
  alignItems: "flex-start",
}));
// ColumnList.tsx

function ColumnList({ bordData }: Props) {
  if (!bordData) return <p>Nothing Found.create a column now!</p>;
  const { bord, columns, tasks } = bordData;
  const columnIds = useBordStore((state) => state.columnIds);
  console.log({ columnIds });

  // state variables
  // state actions
  const setBordData = useBordStore((state) => state.setBordData);
  const moveTask = useBordStore((state) => state.moveTask);
  const moveColumn = useBordStore((state) => state.moveColumn);

  console.log("ColumnList re render &&&&&&&&&&&&&&&&&&&");

  const isInitialized = useRef(false);

  useEffect(() => {
    if (!isInitialized.current) {
      console.log("set bord data RUN");
      setBordData(bord, columns, tasks);
      isInitialized.current = true;
    }
  }, [bord, columns, tasks, setBordData]);

  const handleDragEnd = (result: DropResult) => {
    const { destination, source, draggableId } = result;

    if (!destination) return;

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }
    console.log({ result });

    if (result.type === "COLUMN") {
      moveColumn({
        fromIndex: result.source.index,
        toIndex: destination.index,
      });

      return;
    }

    moveTask({
      taskId: draggableId,
      fromColumnId: source.droppableId,
      toColumnId: destination.droppableId,
      fromIndex: source.index,
      toIndex: destination.index,
    });
  };

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <button
        onClick={() => {
          const startTime = performance.now();

          // Artificial long task: Block the main thread for 400ms
          while (performance.now() - startTime < 400) {
            // Do nothing, just freeze the browser execution
          }
          console.log("Heavy operation completed");
        }}
      >
        Test Heavy Interaction (INP)
      </button>
      <Droppable droppableId="columns" direction="horizontal" type="COLUMN">
        {(provided) => (
          <ColumnContainer ref={provided.innerRef} {...provided.droppableProps}>
            {columnIds.map((column, index) => (
              <Column
                key={String(column)}
                columnId={String(column)}
                index={index}
              />
            ))}

            {provided.placeholder}
          </ColumnContainer>
        )}
      </Droppable>
    </DragDropContext>
  );
}

export default ColumnList;
