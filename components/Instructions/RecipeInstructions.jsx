/**
 * The component displays a list of instructions for a recipe and allows the user to
 * edit and save changes to the instructions.
 * @returns  a fragment containing a heading, an ordered list of instructions, and an EditRecipeInstructions component.
 */

import { Fragment, useEffect, useState } from "react";
import EditRecipeInstructions from "./editRecipeInstructions";

const RecipeInstructions = ({ recipes }) => {
  // State to manage the instructions
  const [instructions, setInstructions] = useState([...recipes.instructions]);

  // Fetching data from local storage when the component mounts
  useEffect(() => {
    const fetchInstructions = async () => {
      return await fetch(`/api/instructions/${recipes._id}`);
    };
    fetchInstructions(); //I was testing if the api routing is responding so yeah i will take a look into this tomorrow mornig
    const recipeInstructions = localStorage.getItem("recipeInstructions");
    if (recipeInstructions) {
      setInstructions(JSON.parse(recipeInstructions));
    }
  }, []);

  // Function to handle saving changes to local storage
  const handleSaveChanges = (newInstructions) => {
    const updateInstructions = async () => {
      return await fetch(`/api/instructions/${recipes._id}`, {
        method: "PUT",
      });
    };
    updateInstructions();//I was testing if the api routing is responding so yeah i will take a look into this tomorrow mornig
    localStorage.setItem("recipeInstructions", JSON.stringify(newInstructions));
    setInstructions(newInstructions);
  };

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
        instructions={recipes.instructions}
        onSave={handleSaveChanges}
      />
    </Fragment>
  );
};

export default RecipeInstructions;
