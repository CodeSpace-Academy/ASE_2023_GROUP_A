import { useState, useEffect } from "react";
import DescriptionEdit from "./DescriptionEdit";
import DescriptionError from "../error-messages/DescriptionError";

const Description = ({ description, recipeId }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedDescription, setEditedDescription] = useState(description || "");

  const toggleEditing = () => {
    setIsEditing(!isEditing);
  };

  const handleEditComplete = (editedDescription) => {
    setEditedDescription(editedDescription);
    toggleEditing(false);
  };

  const handleDescriptionSave = async (newDescription) => {
    try {
      // API request to update the description in the database by including the recipeId in the URL
      const response = await fetch(`/api/description/${recipeId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ description: newDescription }),
      });
      if (response) {
        // Update the description in the UI
        setEditedDescription(newDescription);
        // Set isEditingDescription to false to exit the editing mode
        setIsEditing(false);
      } else {
        // Handle the case when the update request fails
        console.error("Failed to update description.");
      }
    } catch (error) {
      // Handle any errors that occur during the update process
      console.error("Error updating description:", error);
    }
  };
  
  return (
    <div>
      <h3 className="font-bold text-black">Description</h3>
      {!description ? (
        <DescriptionError  />
      ) : (
        <div>
      <p>{isEditing ? editedDescription : editedDescription || description}</p>
      {isEditing ? (
        <DescriptionEdit
          initialDescription={description}
          onSave={handleDescriptionSave}
        />
      ) : (
        <button onClick={toggleEditing} onChange={handleEditComplete}>
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
};

export default Description;
