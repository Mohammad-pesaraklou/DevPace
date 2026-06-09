import { toast } from "react-toastify";
import { create, StoreApi, UseBoundStore } from "zustand";
//*********  util
import {
  generateId,
  getNewOrder,
  normalizeArrayToObj,
  RollbackHandler,
  setRealDataToStateHelper,
} from "@/shared/utils/util";
//*********  actions
import {
  createColumn,
  deleteColumnAction,
  moveColumnAction,
  renameColumnAction,
} from "@/features/columns/actions/action";
import { createTaskAction } from "@/features/taks/actions/action";
//*********  types
import { ID } from "./../shared/types/types";
import {
  AddTaskPayload,
  IBaseCol,
  IBord,
  MoveTaskPayload,
  TMoveTaskPayload,
} from "@/shared/types/bord.types";
import { IColumn, IMoveColumnPayload } from "@/shared/types/column.type";
import { ITask } from "@/shared/types/tasks.types";

export interface StateStore {
  bord: IBord | null;
  columns: Record<string, IColumn>;
  tasks: Record<string, ITask>;
  columnIds: string[];
  addColumn: (col: Omit<IBaseCol, "order">) => void;
  setBordData: (bord: IBord, columns: IColumn[], tasks: ITask[]) => void;
  addTask: ({ name, type, columnId }: AddTaskPayload) => void;
  renameColumn: (colName: string, id: string) => void;
  deleteColumnAction: (colId: ID) => void;
  moveTask: ({
    taskId,
    fromColumnId,
    toColumnId,
    fromIndex,
    toIndex,
  }: TMoveTaskPayload) => void;
  moveColumn: ({ fromIndex, toIndex }: MoveTaskPayload) => void;
  moveColToOtherBord: ({ from, to, colId }: IMoveColumnPayload) => void;
}

const useBordStore: UseBoundStore<StoreApi<StateStore>> = create(
  (set, get) => ({
    bord: null,
    columns: {},
    tasks: {},
    columnIds: [],
    setBordData(bord, columns, tasks) {
      const finalColumns = normalizeArrayToObj<IColumn>(columns, {});
      const finalTasks = normalizeArrayToObj<ITask>(tasks, {});
      const finalColumnIds = columns.map((col) => String(col._id));
      set({
        columns: finalColumns,
        bord,
        tasks: finalTasks,
        columnIds: finalColumnIds,
      });
      // console.log({ finalColumns, bord });
    },
    moveColumn: ({ fromIndex, toIndex }) =>
      set((state) => {
        const newColumnIds = [...state.columnIds];

        const [movedColumnId] = newColumnIds.splice(fromIndex, 1);
        newColumnIds.splice(toIndex, 0, movedColumnId);

        const prevColumnId = newColumnIds[toIndex - 1];
        const nextColumnId = newColumnIds[toIndex + 1];

        const prevColumn = prevColumnId
          ? state.columns[prevColumnId]
          : undefined;
        const nextColumn = nextColumnId
          ? state.columns[nextColumnId]
          : undefined;

        const newOrder = getNewOrder(prevColumn?.order, nextColumn?.order);

        return {
          columnIds: newColumnIds,
          columns: {
            ...state.columns,
            [movedColumnId]: {
              ...state.columns[movedColumnId],
              order: newOrder,
            },
          },
        };
      }),
    moveTask: ({ taskId, fromColumnId, toColumnId, fromIndex, toIndex }) =>
      set((state) => {
        const tasksArr = Object.values(state.tasks);

        const movingTask = state.tasks[String(taskId)];
        console.log({ movingTask });
        if (!movingTask) return state;

        const fromTasks = tasksArr
          .filter((t) => t.columnId === fromColumnId)
          .sort((a, b) => a.order - b.order);

        const toTasks =
          fromColumnId === toColumnId
            ? [...fromTasks]
            : tasksArr
                .filter((t) => t.columnId === toColumnId)
                .sort((a, b) => a.order - b.order);

        // از مبدا حذف
        if (fromColumnId === toColumnId) {
          fromTasks.splice(fromIndex, 1);
          fromTasks.splice(toIndex, 0, movingTask);

          const prevTask = fromTasks[toIndex - 1];
          const nextTask = fromTasks[toIndex + 1];

          const newOrder = getNewOrder(prevTask?.order, nextTask?.order);

          return {
            tasks: {
              ...state.tasks,
              [String(taskId)]: {
                ...movingTask,
                order: newOrder,
              },
            },
          };
        }

        // cross-column
        const newToTasks = [...toTasks];
        console.log({ newToTasks });
        newToTasks.splice(toIndex, 0, {
          ...movingTask,
          columnId: toColumnId,
        });

        const prevTask = newToTasks[toIndex - 1];
        const nextTask = newToTasks[toIndex + 1];

        const newOrder = getNewOrder(prevTask?.order, nextTask?.order);

        return {
          tasks: {
            ...state.tasks,
            [String(taskId)]: {
              ...movingTask,
              columnId: toColumnId,
              order: newOrder,
            },
          },
        };
      }),

    async addColumn(col) {
      const snapshot = get();
      const prevColumns = snapshot.columns;

      const lastColumnId = snapshot.columnIds.at(-1);
      const lastColumn = lastColumnId ? prevColumns[lastColumnId] : undefined;

      const newOrder = getNewOrder(lastColumn?.order);
      const tempId = generateId(13);

      const optimisticColumn: IColumn = {
        _id: tempId,
        name: col.name,
        bordId: col.bordId,
        order: newOrder,
      };

      const columnIdSnapshot = snapshot.columnIds;

      set({
        columns: { ...prevColumns, [tempId]: optimisticColumn },
        columnIds: [...columnIdSnapshot, tempId],
      });

      try {
        const res = await createColumn(optimisticColumn);

        if (!res?.success) {
          throw new Error("API_ERROR");
        }

        const newCol: IColumn = res.data!;
        const realId = String(newCol._id);

        set((state) => {
          const nextColumns = { ...state.columns };
          delete nextColumns[tempId];
          nextColumns[realId] = newCol;

          const nextColumnIds = state.columnIds.map((id) =>
            id === tempId ? realId : id,
          );

          return {
            columns: nextColumns,
            columnIds: nextColumnIds,
          };
        });
      } catch (err) {
        set((state) => ({
          columnIds: state.columnIds.filter((id) => id !== tempId),
          columns: (() => {
            const rollbackCols = { ...state.columns };
            delete rollbackCols[tempId];
            return rollbackCols;
          })(),
        }));

        toast.error("Network or server error while creating column.");
        console.error("Error in addColumn:", err);
      }
    },

    async addTask({ name, type, columnId }) {
      const bordId = get().bord?._id;
      const currentTasks = get().tasks;

      if (!bordId) return;
      const lastTask = Object.values(currentTasks)
        .sort((a, b) => a.order - b.order)
        .at(-1);

      let newOrder = getNewOrder(lastTask?.order);
      const tempId = generateId(13);
      const tempTask = {
        _id: tempId,
        name,
        type,
        columnId,
        bordId,
        order: newOrder,
      };
      set({ tasks: { ...currentTasks, [String(tempTask._id)]: tempTask } });

      try {
        const res = await createTaskAction({
          name,
          type,
          columnId,
          bordId,
          order: newOrder,
        });
        if (!res?.success) {
          toast.error(
            res?.message ?? "something went wrong in creating the task",
          );
          const taskSnapshot = get().tasks;
          RollbackHandler({ state: taskSnapshot, tempId, set, key: "tasks" });
          return;
        }
        const newTask = res?.data!;

        const taskSnapshot = get().tasks;
        toast.success(res?.message);
        const finalState = setRealDataToStateHelper(
          taskSnapshot,
          newTask,
          tempId,
          set,
          "tasks",
        );
        set({ tasks: finalState });
      } catch (error) {
        // Rollback
        const taskSnapshot = get().tasks;
        RollbackHandler({ state: taskSnapshot, tempId, set, key: "tasks" });
      }
    },
    async renameColumn(colName: string, id: string) {
      const columns = Object.values(get().columns);

      // optimistic update
      const targetColumn = columns.find((col) => String(col._id) === id);
      const prevName = targetColumn?.name ?? "";
      let updateCol = columns.map((col) =>
        String(col._id) === id ? { ...col, name: colName } : col,
      );
      let finalColumns = normalizeArrayToObj(updateCol, {});

      const bordId =
        get().bord?._id.toString() ?? targetColumn?.bordId.toString()!;

      try {
        const response = await renameColumnAction(colName, id, bordId);
        if (!response?.success) {
          toast.error("something wrong in renaming the column");
          const filtredCols = updateCol.map((col) =>
            String(col._id) === id ? { ...col, name: prevName } : col,
          );
          finalColumns = normalizeArrayToObj(filtredCols, {});
          set({ columns: finalColumns });
          return;
        }
        const newColumns = Object.values(get().columns);
        updateCol = newColumns.map((col) =>
          String(col._id) === id
            ? {
                ...col,
                _id: String(response.data?._id),
                name: response.data?.name!,
              }
            : col,
        );
        finalColumns = normalizeArrayToObj(updateCol, {});
        set({ columns: finalColumns });
      } catch (error) {
        toast.error("something wrong in renaming the column");
        const filtredCols = updateCol.map((col) =>
          String(col._id) === id ? { ...col, name: prevName } : col,
        );
        finalColumns = normalizeArrayToObj(filtredCols, {});
        set({ columns: finalColumns });
        return;
      }
    },
    async deleteColumnAction(colId: ID) {
      // optimistic update
      const snapshot = get().columnIds;
      const filtredColIds = snapshot.filter((id) => String(id) !== colId);
      const deletedColumn = Object.values(get().columns).find(
        (col) => String(col._id) === colId,
      );

      set({ columnIds: filtredColIds });

      const bordId =
        get().bord?._id.toString() ?? deletedColumn?.bordId.toString()!;

      try {
        const response = await deleteColumnAction(colId, bordId);
        if (!response?.success) throw new Error("API_ERROR");
        toast.success(response.message || "column deleted successfully");
      } catch (error) {
        const err_Msg =
          error?.message || "something went wrong please try again";
        toast.error(err_Msg);
        const filtredColIds = [...snapshot];
        set({ columnIds: filtredColIds });
      }
    },
    async moveColToOtherBord({ from, to, colId }) {
      const snapshot = Object.values(get().columns);

      // optimistic update
      const filtredCols = snapshot.filter((col) => String(col._id) !== colId);
      const movedColumn = snapshot.find((col) => String(col._id) === colId);
      const normilizedColObj = normalizeArrayToObj(filtredCols, {});
      console.log("%*%", from, to, colId, filtredCols);
      set({ columns: normilizedColObj });
      try {
        const response = await moveColumnAction({ from, to, colId });
        console.log("moveColumnAction", response);
        if (!response?.success) {
          toast.error(
            response?.message || response?.error || "somehting went wrong!",
          );
          const currentColumns = Object.values(get().columns);
          const normilizedColObj = normalizeArrayToObj(
            [...currentColumns, movedColumn!],
            {},
          );
          set({ columns: { ...normilizedColObj } });
          return;
        }
        toast.success(response.message);
      } catch (error) {
        console.log("moveColToOtherBord error", error);
      }
    },
  }),
);

export default useBordStore;

// helper functions
