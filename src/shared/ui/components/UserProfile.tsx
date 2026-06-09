"use client";
import React, { useState } from "react";
import { Person4 } from "@mui/icons-material";
import { Menu, MenuItem, IconButton } from "@mui/material";
import { IUserProfileItems, profileItems } from "@/constant/nav";
import useAuth from "@/store/authSlice";

function UserProfile() {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [selected, setSelected] = useState("");
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleSelect = (item: IUserProfileItems) => {
    setSelected(item.title);
    const func = item.action ? item.action : null;
    if (func) func();
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
        aria-label="user profile button"
        aria-expanded={open ? "true" : undefined}
        className="bg-[#44546F] border border-divider hover:bg-[#506282] transition-colors p-1"
      >
        <Person4 className="text-white" />
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
        {profileItems.map((item) => (
          <MenuItem
            key={item.id}
            onClick={() => handleSelect(item)}
            className="text-sm"
          >
            {item.title}
          </MenuItem>
        ))}
      </Menu>
    </React.Fragment>
  );
}

export default UserProfile;
