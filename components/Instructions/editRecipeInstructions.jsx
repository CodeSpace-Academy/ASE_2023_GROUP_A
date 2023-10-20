/* The code is defining a React component called `EditRecipeInstructions`. This component allows users
to edit and save recipe instructions. */
/**
 * The `EditRecipeInstructions` component allows users to edit and save recipe instructions.
 * @returns The component is returning a section element containing a form for editing recipe instructions.
 * It displays the current instructions as a numbered list, with each instruction displayed in an input field.
 * The user can edit the instructions by typing in the input fields.
 * The user can also add a new instruction by typing in the input field at the bottom and clicking the "Save new edits" button.
 *  The user can also remove an instruction
 */

import { useState, useEffect } from "react";

const EditRecipeInstructions = ({ instructions, onSave,onDelete,setInstructions }) => {
  const [newInstructions, setNewInstructions] = useState(instructions);
  const [currentInstruction, setCurrentInstruction] = useState("");
  const [showEdit, setShowEdit] = useState(false);


  useEffect(() => {
    setCurrentInstruction(" ")
  }, [instructions]);

  const toggleEdit = () => {
    setShowEdit(!showEdit); // Toggling the showEdit state
  };

  return (
    <section>
      <div className="flex">
        <strong>Update instructions to your liking</strong>
        <button onClick={toggleEdit}>Toggle Edit</button>
      </div>
      {showEdit && (
        <ol>
          {instructions.map((instruction, index) => (
            <li key={index}>
              <input
                type="text"
                value={instruction}
                onChange={(e) => {
                  const updatedInstructions = [...instructions];
                  updatedInstructions[index] = e.target.value;
                  setInstructions(updatedInstructions);
                }}
                className="w-200 border border-gray-300 rounded-md mr-2 p-1"
              />
              <button
                onClick={() =>
                  onDelete(
                    index,
                    instructions.filter(
                      (instruction) => instruction.trim() !== ""
                    )
                  )
                }
              >
                Remove
              </button>
            </li>
          ))}
        </ol>
      )}
      <ol>
        <input
          type="text"
          value={currentInstruction}
          onChange={(e) => setCurrentInstruction(e.target.value)}
        />
      </ol>

      <button
        className="flex bg-blue-500 hover-bg-blue-700 text-white font-bold py-1 px-1 rounded"
        onClick={() => onSave(newInstructions.concat(currentInstruction))}
      >
        Save new edits
      </button>
    </section>
  );
};

export default EditRecipeInstructions;
