import {
  Dialog,
  DialogTitle,
  Button,
  DialogActions,
  DialogContent,
} from "@mui/material";

interface Props {
  open: boolean;
  setOpen: (bool: boolean) => void;
  message: string;
  action: (...arg: any) => void;
}

function Modal({ open, setOpen, action, message }: Props) {
  return (
    <Dialog open={open} onClose={() => setOpen(false)}>
      <DialogContent className="flex flex-col gap-5">
        <DialogTitle
          sx={{ padding: "16px 8px" }}
          className="leading-10"
          align="center"
          variant="h2"
        >
          {message}
        </DialogTitle>

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
            size="large"
            onClick={action}
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
export default Modal;
