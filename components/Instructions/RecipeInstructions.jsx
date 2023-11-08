/*  It imports necessary dependencies from
the React library, such as `Fragment`, `useState`, and `useEffect`. It also imports a component
called `Loading` from a file located in the "../Loading/Loading" directory. */

import { Fragment, useState, useEffect } from "react";
import Loading from "../Loading/Loading";

const RecipeInstructions = ({ recipes }) => {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  const [instructions, setInstructions] = useState([]);

  useEffect(() => {
    // const delay = 2000;

    const timeoutId = setTimeout(() => {
      try {
        const sortedInstructions = recipes.instructions.map(
          (instruction, index) => ({ index, instruction })
        );
        sortedInstructions.sort((a, b) => a.index - b.index);

        const reorderedInstructions = sortedInstructions.map((instruction) => (
          <li key={instruction.index} className='text-gray-600'>
            {instruction.instruction}
          </li>
        ));

        setInstructions(reorderedInstructions);
        setLoading(false);
      } catch (error) {
        setError("An error occurred while fetching instructions.");
        setLoading(false);
      }
    }, delay);

    return () => clearTimeout(timeoutId);
  }, [recipes.instructions]);

  return (
    <Fragment>
      <h3 className='mt-2 text-lg font-semibold'></h3>
      {loading ? (
        <p>
          <Loading />
        </p>
      ) : error ? (
        <p>{error}</p>
      ) : (
        <ol className='list-decimal list-inside'>{instructions}</ol>
      )}
    </Fragment>
  );
};

export default RecipeInstructions;
