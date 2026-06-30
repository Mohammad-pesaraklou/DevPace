"use client";
import useBordStore from "@/store/createBoardSlice";
import {
  Dialog,
  DialogTitle,
  Button,
  TextField,
  DialogContent,
  DialogActions,
} from "@mui/material";
import { FormEvent, useState } from "react";

interface Props {
  open: boolean;
  setOpen: (bool: boolean) => void;
}

function NewColumnModal() {
  const addColumn = useBordStore((state) => state.addColumn);
  const bordId = useBordStore((state) => state.bord?._id)!;
  const [open, setOpen] = useState(false);

  const [name, setName] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<boolean>(false);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    console.log("rnnnn");
    setIsLoading(true);

    try {
      if (name.trim().length < 3) {
        setError(true);

        return;
      }
      console.log("payload", { bordId, name });
      addColumn({ bordId, name });
      setName("");
      setError(false);
    } finally {
      setIsLoading(false);
      setOpen(false);
    }
  }

  return (
    <>
      <Button onClick={() => setOpen(true)} variant="contained">
        Create Column
      </Button>
      {open && (
        <Dialog
          fullWidth
          maxWidth="xs"
          open={open}
          onClose={() => setOpen(false)}
        >
          <DialogTitle align="center">New Board</DialogTitle>

          <form onSubmit={handleSubmit}>
            <DialogContent
              onSubmit={handleSubmit}
              className="flex flex-col gap-4 pt-2"
            >
              <TextField
                autoFocus
                label="Column name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                error={error}
                helperText={error ? "Name must be at least 3 characters" : ""}
                fullWidth
              />

              <DialogActions className="px-0 pb-0">
                <Button
                  type="button"
                  onClick={() => setOpen(false)}
                  color="inherit"
                >
                  Cancel
                </Button>

                <Button
                  type="submit"
                  variant="contained"
                  disabled={!name.trim() || isLoading}
                >
                  {isLoading ? "Creating..." : "Create"}
                </Button>
              </DialogActions>
            </DialogContent>
          </form>
        </Dialog>
      )}
    </>
  );
}

export default NewColumnModal;
