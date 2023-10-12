// import { useEffect, useState } from "react";

// function EditRecipeInstructions({ recipes }) {
//   const [instructions, setInstructions] = useState([]);

//   useEffect(() => {
//     if (recipes) {
//       const fetchRecipeInstructions = async () => {
//         const response = await fetch(`/api/recipes/${recipe.id}/instructions`);
//         const instructions = await response.json();

//         setInstructions(instructions);
//       };
//       fetchRecipeInstructions();
//     }
//   }, [recipes]);

//   const handleInstructionChange = (index, newInstruction) => {
//     setInstructions((prevInstructions) => {
//       const updatedInstructions = [...prevInstructions];
//       updatedInstructions[index] = newInstruction;
//       return updatedInstructions;
//     });
//   };

//   const handleSaveChanges = async () => {
//     const response = await fetch(`/api/recipes/${recipes._id}/instructions`, {
//       method: "PUT",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify(instructions),
//     });

//     if (response.ok) {
//       <p>Recipe instructions updated</p>;
//     } else {
//       <p>Whoopsie, failed to load recipe instructions, please try again</p>;
//     }
//   };
//   return (
//     <section>
//       <div class="flex ">Edit recipe </div>
//       <input />
//       <h1>hi </h1>
//       <ol>
//         {instructions.map((instruction, index) => (
//           <li key={index}>
//             <input
//               type="text"
//               value={instruction}
//               onChange={(e) => handleInstructionChange(index, e.target.value)}
//             />
//           </li>
//         ))}
//       </ol>
//       <button
//         class=" flex bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
//         onClick={handleSaveChanges}
//       >
//         Save new edits
//       </button>
//     </section>
//   );
// }

// export default EditRecipeInstructions;

import React, { useState, useEffect } from "react";

const UpdateRecipeInstructions = ({ recipeId }) => {
  const [recipe, setRecipe] = useState(null);
  const [newInstructions, setNewInstructions] = useState("");

  const getRecipe = async () => {
    const recipe = await db.getRecipe(recipe._Id);
    setRecipe(recipe);
  };

  useEffect(() => {
    getRecipe();
  }, []);

  const handleInstructionsChange = (event) => {
    setNewInstructions(event.target.value);
  };

  const handleSave = async () => {
    // Update the recipe instructions.
    const updatedRecipe = UpdateRecipeInstructions(recipe, newInstructions);

    // Display the updated recipe to the user.
    displayRecipe(updatedRecipe);

    // Save the changes to the database (optional).
    // await saveRecipe(updatedRecipe);
  };

  return (
    <section>
      <div className="flex ">
        Edit recipe{" "}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
          />
        </svg>
      </div>
      {/* <input /> */}
      <ol>
        {instructions.map((instruction, index) => (
          <li key={index}>
            <input
              type="text"
              value={instruction}
              onChange={(e) => handleInstructionChange(index, e.target.value)}
            />
          </li>
        ))}
      </ol>
      <button
        className=" flex bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        onClick={handleSaveChanges}
      >
        Save
      </button>
    </div>
  );
};

export default UpdateRecipeInstructions;
