import React from "react";
import PropTypes from "prop-types";

/**
 * An input field for the number of instructions.
 *
 * @component
 * @param {Object} props - The component's props.
 * @param {Function} props.handleChange - The function to handle changes in the input.
 * @param {string} props.selectedInstructions - The selected number of instructions.
 * @returns {JSX.Element} - The component's rendered elements.
 */
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
