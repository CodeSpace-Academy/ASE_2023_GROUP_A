import Link from "next/link";
import theme from "./ViewDetails.module.css";

function ViewRecipeDetails({ recipe }) {
  return (
    <div className="rounded bg-blue-500 text-white p-2 mt-2 transition-transform hover:scale-105 duration-300 ease-in-out">
      <Link href={`/${encodeURIComponent(recipe.title)}`}>
        <button className={`w-full text-center ${theme.viewRecipeButton}`}>
          View Recipe
        </button>
      </Link>
    </div>
  );
}
export default ViewRecipeDetails;
