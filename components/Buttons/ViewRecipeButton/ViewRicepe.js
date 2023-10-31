import theme from "./ViewDetails.module.css"
import Link from "next/link";
const ViewRecipeDetails =({recipe})=>{
    return(
        <div className="rounded bg-red-500 text-white p-2 mt-2 transition-transform hover:scale-105 duration-300 ease-in-out">
        <Link href={`/${encodeURIComponent(recipe.title)}`}>
          <button className={`w-full text-center ${theme.viewRecipeButton}`}>
            View Recipe
          </button>
        </Link>
      </div>
    )
};
export default ViewRecipeDetails;