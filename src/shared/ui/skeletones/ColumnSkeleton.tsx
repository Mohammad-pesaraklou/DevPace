import { Skeleton } from "@mui/material";
import React from "react";
import TaskSkeleton from "./TaskSkeleton";
import {
  ColumnHeader,
  ColumnWrapper,
} from "@/features/columns/components/Column.styles";

function ColumnSkeletonWrapper() {
  return (
    <div className="w-full flex justify-start items-center gap-4">
      {Array(3)
        .fill(undefined)
        .map((_, index) => (
          <ColumnSkeleton key={index} />
        ))}
    </div>
  );
}
function ColumnSkeleton() {
  return (
    <ColumnWrapper>
      <ColumnHeader className="h-[50px]">
        <Skeleton variant="text" height={20} width={80} />
      </ColumnHeader>
      <TaskSkeleton />
    </ColumnWrapper>
  );
}
ColumnSkeletonWrapper.ColumnSkeleton = ColumnSkeleton;

export default ColumnSkeletonWrapper;
