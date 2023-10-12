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
    <div>
      <h3>Update Recipe Instructions</h3>
      {recipe && recipe.instructions && (
        <textarea value={newInstructions} onChange={handleInstructionsChange} />
      )}
      <button
        class="small-button bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        onClick={handleSave}
      >
        Save
      </button>
    </div>
  );
};

export default UpdateRecipeInstructions;
