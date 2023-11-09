import { useState } from "react";
import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import ArrowDropDown from "@mui/icons-material/ArrowDropDown";

const DropdownMenu = ({ handleSort, sortOrder }) => {
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleSortOption = (sortOrder) => {
    handleSort(sortOrder);
    handleClose();
  };

  return (
    <div>
      <Button
        sx={{ background: "#007bff", "&:hover": { background: "lightBlue" } }}
        aria-controls="simple-menu"
        aria-haspopup="true"
        variant="contained"
        onClick={handleClick}
      >
        Sort{" "}
        {sortOrder === "[A-Z]"
          ? "Ascending"
          : sortOrder === "[Z-A]"
          ? "Descending"
          : sortOrder === "Recent"
          ? "Recent"
          : sortOrder === "Oldest"
          ? "Oldest"
          : sortOrder == "cooktime(asc)"
          ? "cooktime(asc)"
          : sortOrder == "cooktime(desc)"
          ? "cooktime(desc)"
          : sortOrder == "preptime(asc)"
          ? "preptime(asc)"
          : sortOrder == "preptime(desc)"
          ? "preptime(desc)"
          : sortOrder == "steps(asc)"
          ? "steps(asc)"
          : sortOrder == "steps(desc)"
          ? "steps(desc)"
          : null}{" "}
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
          {" "}
          Name (asc){" "}
        </MenuItem>

        <MenuItem onClick={() => handleSortOption("[Z-A]")}>
          {" "}
          Name (desc)
        </MenuItem>

        <MenuItem onClick={() => handleSortOption("Recent")}> Recent </MenuItem>

        <MenuItem onClick={() => handleSortOption("Oldest")}> Oldest </MenuItem>

        <MenuItem onClick={() => handleSortOption("cooktime(asc)")}>
          {" "}
          Cook time (asc){" "}
        </MenuItem>

        <MenuItem onClick={() => handleSortOption("cooktime(desc)")}>
          {" "}
          Cook time (desc){" "}
        </MenuItem>

        <MenuItem onClick={() => handleSortOption("preptime(asc)")}>
          {" "}
          Prep time (asc){" "}
        </MenuItem>

        <MenuItem onClick={() => handleSortOption("preptime(desc)")}>
          {" "}
          Prep time (desc){" "}
        </MenuItem>

        <MenuItem onClick={() => handleSortOption("steps(asc)")}>
          {" "}
          Steps (asc){" "}
        </MenuItem>

        <MenuItem onClick={() => handleSortOption("steps(desc)")}>
          {" "}
          Steps (desc){" "}
        </MenuItem>

        <MenuItem onClick={() => handleSortOption("none")}> None </MenuItem>
      </Menu>
    </div>
  );
};

export default DropdownMenu;
