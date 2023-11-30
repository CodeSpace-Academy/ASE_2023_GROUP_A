import React, { useState } from "react";

/**
 * Component for editing recipe instructions.
 *
 * @param {Array} instructions - The current recipe instructions.
 * @param {string} recipeId - The ID of the recipe being edited.
 * @param {function} onCancel - Callback function to cancel editing mode.
 */
function EditRecipeInstructions({ instructions, recipeId, onCancel }) {
  const [editedInstructions, setEditedInstructions] = useState([
    ...instructions,
  ]);

  const [, setEditMode] = useState(true);

  /**
   * Handles changes to instruction input fields.
   *
   * @param {number} index - The index of the instruction being edited.
   * @param {string} newValue - The new value of the instruction.
   */
  const handleInputChange = (index, newValue) => {
    const updatedInstructions = [...editedInstructions];
    updatedInstructions[index] = newValue;
    setEditedInstructions(updatedInstructions);
  };

  /**
   * Saves the edited instructions to the database.
   */
  const handleInstructionsSave = async () => {
    const requestBody = JSON.stringify({
      recipeId,
      instructions: editedInstructions,
    });

    try {
      const response = await fetch("/api/updateInstructions", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: requestBody,
      });

      if (response.ok) {
        setEditMode((prevState) => !prevState);
      } else {
        console.error("Failed to update instructions.");
      }
    } catch (error) {
      console.error("Error updating instructions:", error);
    } finally {
      setEditMode(false);
    }
  };

  /**
   * Cancels editing mode and returns to the previous instructions.
   */
  const handleCancel = () => {
    onCancel();
  };

  return (
    <>
      <h3 className="mt-2 text-lg font-semibold">Edit Instructions</h3>

      <ol className="list-decimal list-inside bg-pink-200">
        {editedInstructions.map((instruction, index) => (
          <li key={index}>
            <input
              className="w-full"
              type="text"
              value={instruction}
              onChange={(e) => handleInputChange(index, e.target.value)}
            />
          </li>
        ))}
      </ol>

      <div className="flex flex-row gap-4">
        <button type="button" onClick={handleInstructionsSave}>
          Save
        </button>

        <button type="button" onClick={handleCancel}>
          Cancel
        </button>
      </div>
    </>
  );
}

export default EditRecipeInstructions;
