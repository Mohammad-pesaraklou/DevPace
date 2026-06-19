"use client";
import React, { Dispatch, SetStateAction, useState } from "react";
import { Menu, MenuItem, IconButton } from "@mui/material";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import { BordMoreOptons, TBordMoreOptions } from "@/constant/bord";
import useBordStore from "@/store/createBoardSlice";
import Modal from "@/shared/ui/modals/Modal";
import useColumnStore from "@/store/createColumnSlice";
import MoveColumn from "@/shared/ui/modals/MoveColumn";

interface Props {
  columnId: string;
  setIsEdit: Dispatch<SetStateAction<boolean>>;
}

function ColumnMoreOptions({ columnId, setIsEdit }: Props) {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [selected, setSelected] = useState("");
  const [confirmDelete, setConfirmDelete] = useState(false);
  const IsShowMove = useColumnStore((state) => state.showMoveColumn);
  const setShowMoveColumn = useColumnStore((state) => state.setShowMoveColumn);
  const setSelectedColumnId = useColumnStore(
    (state) => state.setSelectedColumnId,
  );
  const deleteColumnAction = useBordStore((state) => state.deleteColumnAction);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleSelect = async (item: TBordMoreOptions) => {
    setSelected(item.title);

    switch (item.key) {
      case "delete": {
        setConfirmDelete(true);
        break;
      }

      case "rename": {
        setIsEdit(true);
        break;
      }

      case "move": {
        setShowMoveColumn(true);
        setSelectedColumnId(columnId);
        break;
      }

      default:
        break;
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
        className="bg-[#44546F] border border-divider hover:bg-[#506282] transition-colors p-1"
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
        {BordMoreOptons.map((item) => (
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
          action={() => deleteColumnAction(columnId)}
          message="Are you sure you wanna delete this column?"
          open={confirmDelete}
          setOpen={setConfirmDelete}
        />
      )}
      {IsShowMove && (
        <MoveColumn
          columnId={columnId}
          open={IsShowMove}
          setOpen={setShowMoveColumn}
        />
      )}
    </React.Fragment>
  );
}

export default ColumnMoreOptions;
