import React from "react";
import PropTypes from "prop-types";

export default function InstructionF({ handleChange, selectedInstructions }) {
  return (
    <div className="flex">
      <input
        type="number"
        min={0}
        placeholder="Number of instructions..."
        value={parseInt(selectedInstructions, 10)}
        onChange={handleChange}
        className="border border-gray-300 rounded-l-md px-4 py-2"
      />
    </div>
  );
}

InstructionF.propTypes = {
  handleChange: PropTypes.func.isRequired,
  selectedInstructions: PropTypes.string.isRequired,
};
