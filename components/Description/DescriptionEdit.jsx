/* eslint-disable react/prop-types */
/* eslint-disable no-trailing-spaces */
import React, { useState, useRef } from "react";

/**
 * A component for editing descriptions.
 * @param {Object} props - The component props.
 * @param {string} props.initialDescription - The initial description text to edit.
 * @param {Function} props.onSave - Function to call when saving the edited description.
 * @param {Function} props.toggleEditing - Function to toggle the editing mode.
 * @returns {JSX.Element} JSX for the DescriptionEdit component.
 */

function DescriptionEdit({ initialDescription, onSave, toggleEditing }) {
  const [newDescription, setNewDescription] = useState(initialDescription);
  const newTextRef = useRef();
  const [isLoading, setIsLoading] = useState(false);

  /**
   * Handles changes in the description input field.
   * @param {Object} e - The event object.
   * @returns {void}
   */

  const handleDescriptionChange = (e) => {
    setNewDescription(e.target.value);
  };

  /**
   * Handles the save action for the edited description.
   * Triggers the onSave function and toggles the editing mode.
   * @returns {void}
   */

  const handleSave = async () => {
    setIsLoading(true);
    try {
      await onSave(newDescription);
      toggleEditing();
    } catch (error) {
      console.error("Error updating description:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <textarea
        ref={newTextRef}
        className="w-auto h-auto bg-gray-300"
        value={newDescription}
        onChange={handleDescriptionChange}
        rows={5}
        cols={50}
        disabled={isLoading}
      />
      <button
        type="button"
        className="bg-orange-300 rounded-sm-3"
        onClick={handleSave}
        disabled={isLoading}
      >
        <p className="text-black">{isLoading ? "Saving..." : "Save"}</p>
      </button>
    </div>
  );
}

export default DescriptionEdit;
