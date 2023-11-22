import React from "react";
import PropTypes from "prop-types";
import Badge from "@mui/material/Badge";
import { FaTrash } from "react-icons/fa";

export default function Badges({
  numberOfRecipes,
  handleDefault,
  filterCount,
}) {
  return (
    <div className="flex mt-10">
      <Badge
        badgeContent={filterCount}
        color="primary"
        style={{ margin: "auto", fontWeight: "bold", zIndex: "-1" }}
      >
        FILTERS
      </Badge>

      <button type="button" onClick={handleDefault}>
        <span
          style={{ display: "inline-flex", fontWeight: "bold", gap: "0.2em" }}
        >
          Remove Filters
          <FaTrash style={{ color: "blue", opacity: "0.5" }} />
        </span>
      </button>

      <Badge
        badgeContent={numberOfRecipes}
        color="primary"
        style={{ margin: "auto", fontWeight: "bold", zIndex: "-1" }}
      >
        Recipes
      </Badge>
    </div>
  );
}

Badges.propTypes = {
  numberOfRecipes: PropTypes.number.isRequired,
  handleDefault: PropTypes.func.isRequired,
  filterCount: PropTypes.number.isRequired,
};
