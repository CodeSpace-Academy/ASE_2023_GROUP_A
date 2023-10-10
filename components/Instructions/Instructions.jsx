import { Fragment } from "react";

const Instructions = ({ recipes }) => {
  // Create a variable to store the sorted instructions.
  const sortedInstructions = [];

  // Use the `map()` method to iterate over the `instructions` array in the recipe object. For each instruction, add it to the variable you created in step 1.
  recipes.instructions.map((instruction, index) => {
    sortedInstructions.push(instruction);
  });

  // Use the `sort()` method to sort the instructions in ascending order.
  sortedInstructions.sort();

  // Assign the sorted instructions variable to the `instructions` variable that is used to render the list of instructions.
  recipes.instructions = sortedInstructions;

  return (
    <Fragment>
      <h3 className="mt-2 text-lg font-semibold">Instructions</h3>
      <ol className="list-decimal list-inside">
        {recipes.instructions.map((instruction, index) => (
          <li key={index} className="text-gray-600">
            {instruction}
          </li>
        ))}
      </ol>
    </Fragment>
  );
};

export default Instructions;
