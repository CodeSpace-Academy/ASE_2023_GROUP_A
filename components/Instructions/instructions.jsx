import React from "react";
import classes from "./instructions.module.css";

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
    <div className={`flex ${classes.instructionsContainer}`}>
      <input
        type="number"
        min={0}
        placeholder="# of Instructions"
        value={parseInt(selectedInstructions, 10)}
        onChange={handleChange}
        className={`${classes.instructionsInput}`}
      />
    </div>
  );
}
