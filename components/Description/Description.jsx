import React, { useState } from "react";
import DescriptionEdit from "./DescriptionEdit";
import DescriptionError from "../error-messages/DescriptionError";

/**
 * component for managing and displaying recipe descriptions.
 * @param {Object} props - The component props.
 * @param {string} props.description - The description text to display.
 * @param {string} props.recipeId - The ID of the recipe.
 * @returns {JSX.Element} JSX for the Description component.
 */

function Description({ description, recipeId }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedDescription, setEditedDescription] = useState(description);

  /**
   * Toggles the editing mode for the description.
   * @returns {void}
   */

  const toggleEditing = () => {
    setIsEditing(!isEditing);
  };

  /**
   * Handles the save action for the edited description.
   * @param {string} newDescription - The updated description.
   * @returns {void}
   */

  const handleDescriptionSave = async (newDescription) => {
    try {
      const response = await fetch(`/api/description/${recipeId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ description: newDescription }),
      });
      if (response) {
        setEditedDescription(newDescription);
        setIsEditing(false);
      } else {
        console.error("Failed to update description.");
      }
    } catch (error) {
      console.error("Error updating description:", error);
    }
  };

  return (
    <div>
      <h3 className="bold text-gray-1000">Description</h3>
      {!description ? (
        <DescriptionError />
      ) : (
        <div>
          {!isEditing && <p>{editedDescription}</p>}
          {isEditing ? (
            <DescriptionEdit
              initialDescription={editedDescription}
              onSave={handleDescriptionSave}
              toggleEditing={toggleEditing}
            />
          ) : (
            <button
              type="button"
              className="flex items-center bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              onClick={toggleEditing}
            >
              <p className="mr-2">Edit Description</p>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6 inline"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
                />
              </svg>
            </button>
          )}
        </div>
      )}
    </div>
  );
}

export default Description;
