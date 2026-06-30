import { createBoardOpt } from "@/shared/lib/query/board.query";
import {
  Dialog,
  DialogTitle,
  Button,
  TextField,
  DialogContent,
  DialogActions,
} from "@mui/material";
import { useMutation } from "@tanstack/react-query";
import { ChangeEvent, useState } from "react";
import { toast } from "react-toastify";

interface Props {
  open: boolean;
  setOpen: (bool: boolean) => void;
}

function NewBoardModal({ open, setOpen }: Props) {
  const [title, setTitle] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const {
    mutate: createBordAction,
    isPending,
    isSuccess,
    data,
  } = useMutation(createBoardOpt);

  async function handleSubmit() {
    setIsLoading(true);

    try {
      createBordAction({ title });

      if (isSuccess) {
        toast.success(data?.message);
        setOpen(false);
      }
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Dialog fullWidth maxWidth="xs" open={open} onClose={() => setOpen(false)}>
      <DialogTitle align="center">New Bord</DialogTitle>

      <DialogContent className="flex flex-col gap-4 pt-2">
        <TextField
          autoFocus
          label="Board title"
          value={title}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setTitle(e.target.value)
          }
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              handleSubmit();
            }
          }}
          fullWidth
        />
        <DialogActions className="px-6 pb-4">
          <Button onClick={() => setOpen(false)} color="inherit">
            Cancel
          </Button>

          <Button
            variant="contained"
            onClick={handleSubmit}
            type="submit"
            disabled={!title.trim() || isLoading}
          >
            {isLoading ? "Creating..." : "Create"}
          </Button>
        </DialogActions>
      </DialogContent>
    </Dialog>
  );
}

export default NewBoardModal;
