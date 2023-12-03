import React from "react";

function IngredientsList({ ingredients }) {
  return (
    <ul className="list-disc list-inside">
      {ingredients.map(([ingredient, amount], index) => (
        <li key={index} className="text-gray-1000 ">
          {ingredient}
          :
          {' '}
          {amount}
        </li>
      ))}
    </ul>
  );
}

export default IngredientsList;
