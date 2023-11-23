import React, { useState } from "react";
import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import ArrowDropDown from "@mui/icons-material/ArrowDropDown";

export default function DropdownMenu({ sortOrder, setSortOrder }) {
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleSortOption = (newSortOrder) => {
    setSortOrder(newSortOrder);
    handleClose();
  };

  const getSortOrderText = () => {
    switch (sortOrder) {
      case "[A-Z]":
        return "Ascending";
      case "[Z-A]":
        return "Descending";
      case "Recent":
        return "Recent";
      case "Oldest":
        return "Oldest";
      case "cooktime(asc)":
        return "Cook time (asc)";
      case "cooktime(desc)":
        return "Cook time (desc)";
      case "preptime(asc)":
        return "Prep time (asc)";
      case "preptime(desc)":
        return "Prep time (desc)";
      case "steps(asc)":
        return "Steps (asc)";
      case "steps(desc)":
        return "Steps (desc)";
      default:
        return null;
    }
  };

  return (
    <div>
      <Button
        sx={{ background: "#007bff !important", "&:hover": { background: "lightBlue !important" } }}
        aria-controls="simple-menu"
        aria-haspopup="true"
        variant="contained"
        onClick={handleClick}
      >
        Sort
        {sortOrder}
        {getSortOrderText(sortOrder)}
        <ArrowDropDown />
      </Button>

      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem onClick={() => handleSortOption("[A-Z]")}>
          Title (asc)
        </MenuItem>

        <MenuItem onClick={() => handleSortOption("[Z-A]")}>
          Title (desc)
        </MenuItem>

        <MenuItem onClick={() => handleSortOption("Recent")}>Recent</MenuItem>

        <MenuItem onClick={() => handleSortOption("Oldest")}>Oldest</MenuItem>

        <MenuItem onClick={() => handleSortOption("cooktime(asc)")}>
          Cook time (asc)
        </MenuItem>

        <MenuItem onClick={() => handleSortOption("cooktime(desc)")}>
          Cook time (desc)
        </MenuItem>

        <MenuItem onClick={() => handleSortOption("preptime(asc)")}>
          Prep time (asc)
        </MenuItem>

        <MenuItem onClick={() => handleSortOption("preptime(desc)")}>
          Prep time (desc)
        </MenuItem>

        <MenuItem onClick={() => handleSortOption("steps(asc)")}>
          Steps (asc)
        </MenuItem>

        <MenuItem onClick={() => handleSortOption("steps(desc)")}>
          Steps (desc)
        </MenuItem>

        <MenuItem onClick={() => handleSortOption("none")}>None</MenuItem>
      </Menu>
    </div>
  );
}
