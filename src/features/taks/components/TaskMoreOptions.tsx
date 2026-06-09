"use client";
import React, { Dispatch, SetStateAction, useState } from "react";
import { Menu, MenuItem, IconButton } from "@mui/material";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import {
  BordMoreOptons,
  TaskMoreOptons,
  TBordMoreOptions,
} from "@/constant/bord";
import useBordStore from "@/store/createBoardSlice";
import Modal from "@/shared/ui/modals/Modal";

interface Props {
  taskId: string;
}

function TaskMoreOptions({ taskId }: Props) {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [selected, setSelected] = useState("");
  const [confirmDelete, setConfirmDelete] = useState(false);

  const deleteColumnAction = useBordStore((state) => state.deleteColumnAction);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleSelect = async (item: TBordMoreOptions) => {
    setSelected(item.title);
    console.log("item.", item);
    if (item.title === "Delete") {
      setConfirmDelete(true);
    }
    handleClose();
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <React.Fragment>
      <IconButton
        onClick={handleClick}
        size="small"
        aria-controls={open ? "user-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        className=" border border-divider hover:bg-[#4d4d4e] transition-colors p-1"
      >
        <MoreHorizIcon className="text-white" />
      </IconButton>

      <Menu
        id="user-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
        disableScrollLock
        slotProps={{
          paper: {
            className: "mt-2 min-w-[150px] border border-divider shadow-lg",
          },
        }}
      >
        {TaskMoreOptons.map((item) => (
          <MenuItem
            key={item.id}
            onClick={() => handleSelect(item)}
            className="text-sm hover:bg-[#2e3746] rounded-sm"
          >
            {item.title}
          </MenuItem>
        ))}
      </Menu>
      {confirmDelete && (
        <Modal
          action={() => deleteColumnAction(taskId)}
          message="Are you sure you wanna delete this column?"
          open={confirmDelete}
          setOpen={setConfirmDelete}
        />
      )}
    </React.Fragment>
  );
}

export default TaskMoreOptions;
