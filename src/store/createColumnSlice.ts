import { renameColumnAction } from "@/features/columns/actions/action";
import { create, StoreApi, UseBoundStore } from "zustand";
import useBordStore from "./createBoardSlice";
import { toast } from "react-toastify";
import { normalizeArrayToObj } from "@/shared/utils/util";

export type ColumnStore = {
  selectedColumnId: string | null;
  setSelectedColumnId: (id: string) => void;
  showMoveColumn: boolean;
  setShowMoveColumn: (bool?: boolean) => void;
};

const useColumnStore: UseBoundStore<StoreApi<ColumnStore>> = create(
  (set, get) => ({
    selectedColumnId: null,
    showMoveColumn: false,
    setSelectedColumnId(id) {
      set({ selectedColumnId: id });
    },
    setShowMoveColumn(bool) {
      set({ showMoveColumn: bool });
    },
  }),
);

export default useColumnStore;
