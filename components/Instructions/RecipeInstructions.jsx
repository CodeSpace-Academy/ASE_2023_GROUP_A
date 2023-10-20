/* The code is a React component called `RecipeInstructions`. It displays a list of instructions for a
recipe and allows the user to edit and save changes to the instructions. */
/**
 * The component displays a list of instructions for a recipe and allows the user to
 * edit and save changes to the instructions.
 * @returns  a fragment containing a heading, an ordered list of instructions, and an EditRecipeInstructions component.
 */

import { Fragment, useEffect, useState, } from "react";
import EditRecipeInstructions from "./editRecipeInstructions";

const RecipeInstructions = ({ recipes }) => {
  // State to manage the instructions
  const [instructions, setInstructions] = useState([]);
   const [loading, setLoading] = useState(true);

  // Fetching data from local storage when the component mounts
  useEffect(() => {
    const fetchInstructions = async () => {
      try {
        const response = await fetch(`/api/instructions/${recipes._id}`);
        if (response.ok) {
          const data = await response.json();
          setInstructions(data.instructions);
          setLoading(false);
        } else {
          console.error("Failed to fetch instructions");
        }
      } catch (error) {
        console.error("Error fetching instructions:", error);
      }
    };

    fetchInstructions();
  }, [recipes._id]);

  // Function to handle saving changes to local storage
  const handleSaveChanges = async (newInstructions) => {
    try {
      const response = await fetch(`/api/instructions/${recipes._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ instructions: newInstructions }),
      });

      if (response.ok) {
        // Successfully updated the instructions
        setInstructions(newInstructions);
      } else {
        // Handle the error if the request is not successful
        console.error("Failed to update instructions.");
      }
    } catch (error) {
      console.error("Error while updating instructions:", error);
    }
  };
  const handleRemoveInstruction = async (index, newInstructions) => {
    try {
      const response = await fetch(`/api/instructions/${recipes._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ instructions: newInstructions }),
      });
      if (response.ok) {
        const updatedInstructions = [...newInstructions];
        updatedInstructions.splice(index, 1);

        setInstructions(
          updatedInstructions.filter((instruction) => instruction.trim() !== "")
        );
        console.log(
          updatedInstructions
        );
      }
    } catch (err) {
      // Handle errors if the API request fails
      console.error(err);
    }
  };
  if (loading) {
  return(<div className="bg-zinc-500 rounded-md">Loading...</div>)
}
  return (
    <Fragment>
      <h3 className="mt-2 text-lg font-semibold">Instructions</h3>
      <ol className="list-decimal list-inside">
        {instructions.map((instruction, index) => (
          <li key={index} className="text-gray-600">
            {instruction}
          </li>
        ))}
      </ol>

      <EditRecipeInstructions
        instructions={instructions}
        onSave={handleSaveChanges}
        onDelete={handleRemoveInstruction}
        setInstructions={setInstructions} // Pass the setInstructions function
      />
    </Fragment>
  );
};

export default RecipeInstructions;
