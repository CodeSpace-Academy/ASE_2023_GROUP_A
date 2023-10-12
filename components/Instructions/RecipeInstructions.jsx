import { Fragment } from "react";
import EditRecipeInstructions from "./editRecipeInstructions";

const RecipeInstructions = ({ recipes }) => {
  const sortedInstructions = [];

  recipes.instructions.forEach((instruction, index) => {
    sortedInstructions.push({ index, instruction });
  });

  sortedInstructions.sort((a, b) => a.index - b.index);

  recipes.instructions = sortedInstructions.map(
    (instruction) => instruction.instruction
  );
  const reorderedInstructions = sortedInstructions.map((instruction) => (
    <li key={instruction.index} className="text-gray-600">
      {instruction.instruction}
    </li>
  ));

  return (
    <Fragment>
      <h3 className="mt-2 text-lg font-semibold">Instructions</h3>

      <EditRecipeInstructions />
      <ol className="list-decimal list-inside">{reorderedInstructions}</ol>
    </Fragment>
  );
};

export default RecipeInstructions;
