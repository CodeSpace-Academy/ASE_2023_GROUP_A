/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import InstructionEdit from "./InstructionsEdit";
import DescriptionError from "../error-messages/DescriptionError";

function Description({ instruction, recipeId }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedInstruction, setEditedInstruction] = useState(Instruction);

  const toggleEditing = () => {
    setIsEditing(!isEditing);
  };

  // const handleEditComplete = (editedDescription) => {
  //   setEditedDescription(editedDescription);
  //   toggleEditing(false);
  // };

  const handleInstructionSave = async (newInstruction) => {
    try {
      const response = await fetch(`/api/Instruction/${recipeId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ description: newInstruction }),
      });
      if (response) {
        setEditedInstruction(newInstruction);
        setIsEditing(false);
      } else {
        console.error("Failed to update Instruction.");
      }
    } catch (error) {
      console.error("Error updating instruction:", error);
    }
  };

  return (
    <div>
      {!Instruction ? (
        <InstructionError />
      ) : (
        <div>
          {!isEditing && <p>{editedInstruction}</p>}
          {isEditing ? (
            <InstructionEdit
              initialInstuction={editedDescription}
              onSave={handleDescriptionSave}
              toggleEditing={toggleEditing}
            />
          ) : (
            <button
              type="button"
              className="flex items-center"
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
