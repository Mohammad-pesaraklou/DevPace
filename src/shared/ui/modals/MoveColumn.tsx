"use client";
import {
  Dialog,
  DialogTitle,
  Button,
  DialogActions,
  DialogContent,
} from "@mui/material";
import SelectOption from "../Inputs/SelectOption";
import useBordStore from "@/store/createBoardSlice";
import { useState } from "react";
import useColumnStore from "@/store/createColumnSlice";
import { toast } from "react-toastify";

interface Props {
  open: boolean;
  setOpen: (bool: boolean) => void;
  columnId: string;
}

function MoveColumn({ open, setOpen, columnId }: Props) {
  const moveColToOtherBord = useBordStore((state) => state.moveColToOtherBord);
  const borderId = useBordStore((state) => state.bord?._id);
  const [toBordId, setToBordID] = useState<string>("");
  const selectedColumnId = useColumnStore((state) => state.selectedColumnId);
  console.log({ columnId, selectedColumnId });

  async function handleMove() {
    if (!selectedColumnId || !borderId) {
      toast.error("invalid data");

      return;
    }
    moveColToOtherBord({
      from: String(borderId),
      to: toBordId,
      colId: selectedColumnId!,
    });
    setOpen(false);
  }

  return (
    <Dialog fullWidth maxWidth="sm" open={open} onClose={() => setOpen(false)}>
      <DialogContent className="flex flex-col gap-5">
        <DialogTitle
          sx={{ padding: "16px 8px" }}
          className="leading-10"
          align="center"
          variant="h2"
        >
          Move Column
        </DialogTitle>
        <SelectOption setValue={setToBordID} value={toBordId} />
        <DialogActions className="flex justify-start items-center gap-3">
          <Button
            size="large"
            onClick={() => setOpen(false)}
            variant="outlined"
            className=""
          >
            Cancel
          </Button>
          <Button
            onClick={handleMove}
            size="large"
            variant="contained"
            className=""
          >
            Confirm
          </Button>
        </DialogActions>
      </DialogContent>
    </Dialog>
  );
}

export default MoveColumn;
