import { createTaskAction } from "@/features/taks/actions/action";
import { TaskType } from "@/shared/types/tasks.types";
import useBordStore from "@/store/createBoardSlice";
import useColumnStore from "@/store/createColumnSlice";
import { CheckBox } from "@mui/icons-material";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  ToggleButton,
  ToggleButtonGroup,
} from "@mui/material";
import React, { ChangeEvent, FormEvent, useState } from "react";
import { toast } from "react-toastify";

interface Props {
  open: boolean;
  setOpen: (open: boolean) => void;
}

// name
// type
// columnId
// boardId
// order
function AddCard({ open, setOpen }: Props) {
  const [name, setName] = useState("");
  const [type, setType] = useState<TaskType | null>(null);
  const addTask = useBordStore((state) => state.addTask);
  const tasks = useBordStore((state) => state.tasks);
  const columnId = useColumnStore((state) => state.selectedColumnId);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    console.log("payload sent to add task", { name, type, columnId });

    if (!type || !columnId) {
      toast.error("please add a type");

      return;
    }
    addTask({ name, columnId, type });
    setOpen(false);
  }

  console.log({ tasks, name, type });

  return (
    <Dialog open={open} onClose={() => setOpen(false)} fullWidth>
      <DialogTitle align="center">Add Card</DialogTitle>
      <form onSubmit={handleSubmit}>
        <DialogContent
          sx={{ display: "flex", flexDirection: "column", gap: 3 }}
        >
          <TextField
            fullWidth
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Task name..."
          />

          <ToggleButtonGroup
            value={type}
            exclusive
            onChange={(_, newType) => setType(newType)}
            fullWidth
          >
            <ToggleButton value="pending">Pending</ToggleButton>
            <ToggleButton value="done">Done</ToggleButton>
            <ToggleButton value="block">Blocked</ToggleButton>
          </ToggleButtonGroup>
          <DialogActions>
            <Button onClick={() => {}} color="inherit">
              Cancel
            </Button>

            <Button
              variant="contained"
              type="submit"
              disabled={!name.trim() || !type}
            >
              Add
            </Button>
          </DialogActions>
        </DialogContent>
      </form>
    </Dialog>
  );
}

export default AddCard;
