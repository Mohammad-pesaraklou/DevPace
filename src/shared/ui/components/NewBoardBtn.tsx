"use client";
import useAuth from "@/store/authSlice";
import { Button, Dialog, DialogActions, DialogTitle } from "@mui/material";
import { redirect, useRouter } from "next/navigation";
import React, { useState } from "react";
import NewBoardModal from "../modals/NewBoardModal";

function NewBoardBtn() {
  const [open, setOpen] = useState(false);
  const [openNewBoard, setOpenNewBoard] = useState(false);

  const user = useAuth((state) => state.user);
  // console.log({ user });
  const router = useRouter();
  function navigate() {
    router.push("/login");
  }

  return (
    <>
      <Button
        aria-label="new board button"
        variant="outlined"
        onClick={() => {
          if (!user?.id) {
            setOpen(true);
          } else {
            setOpenNewBoard(true);
          }
        }}
      >
        New Board
      </Button>
      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>Login to Start Your advanture</DialogTitle>
        <DialogActions>
          <Button onClick={() => setOpen(false)} color="inherit">
            Cancel
          </Button>

          <Button variant="contained" onClick={navigate}>
            Login
          </Button>
        </DialogActions>
      </Dialog>
      <NewBoardModal open={openNewBoard} setOpen={setOpenNewBoard} />
    </>
  );
}

export default NewBoardBtn;
