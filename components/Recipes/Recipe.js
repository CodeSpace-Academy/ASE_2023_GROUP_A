import React, { useState } from "react";
import {
  CookTime,
  PrepTime,
  Published,
  TotalTime,
} from "../TimeAndDate/TimeConvertor";
import RecipeDetailTags from "../Tags/RecipeDetailTags";
import Description from "../Description/Description";
import Allergens from "../Allergens/allergens";
import DropDownSVG from "../IconsAndSvg's/DropDownSVG";
import CoverImage from "../Images/CoverImage";
import IngredientsList from "../ingredients/IngredientsList";
import RecipeInstructions from "../Instructions/RecipeInstructions";
import UpdateRecipeInstructions from "../Instructions/editRecipeInstructions";
import Link from "next/link"; 
import { FaArrowLeft, FaTag, FaUsers } from "react-icons/fa";
import { FiBook } from "react-icons/fi";
import Loading from "../Loading/Loading";
import { useTheme } from "../Context/ThemeContext";

const Recipe = ({ recipe, Allergies }) => {
  const [showTags, setShowTags] = useState(false);
  const [showInstructions, setShowInstructions] = useState(false);
  const { theme } = useTheme();

  if (!recipe) {
    return (
      <div>
        <Loading />
      </div>
    );
  }

  const textClass = theme === "dark" ? "text-white" : "text-black";
  const ingredientsList = Object.entries(recipe.ingredients).map((ingredient) => `${ingredient}`);

  const firstImage = recipe.images[0];

  return (
    <div className={`container mx-auto mt-24 p-4 ${textClass}`}>
      <Link href="/">
        <span className={`text-gray-600 text-xl ${textClass}`}>
          <FaArrowLeft />
        </span>
      </Link>
      <div
        className={`bg-${
          theme === "dark" ? "gray-700" : "white"
        } p-4 rounded shadow mb-4 lg:flex`}
      >
        <div className="lg:w-1/2">
          <h1 className={`text-2xl font-bold ${textClass}`}>
            {recipe.title}
          </h1>
          <CoverImage images={recipe.images} title={recipe.title} />
          <Description description={recipe.description} recipeId={recipe._id} />
          <div className={`mt-4 ${textClass}`}>
            <p>
              <FaUsers className="ml-4 mr-2" />
              <b>Servings</b>: {recipe.servings}
            </p>
          </div>
          <div className={`mt-4 ${textClass}`}>
            <p>
              <FiBook className="mr-2" />
              <b>Category</b>: {recipe.category}
            </p>
          </div>
          <div className={`mt-4 ${textClass}`}>
            <FaTag className="mr-2" />
            <b>Tags</b>
            <RecipeDetailTags recipe={recipe} />
          </div>
        </div>
        <div className={`lg-w-1/2 p-4 ${textClass}`}>
          
          <PrepTime prepTime={recipe.prep} />
          <CookTime cookTime={recipe.cook} />
          <TotalTime totalTime={recipe} />
          <Allergens
            allergens={Allergies}
            recipeIngredients={ingredientsList}
          />
          <h3 className="mt-2 text-lg font-semibold">Ingredients:</h3>
          <IngredientsList ingredients={Object.entries(recipe.ingredients)} />

          <h3 className={`text-lg font-semibold ${textClass}`}>Instructions</h3>
          <RecipeInstructions recipes={recipe} />

          <div className={`${textClass} mt-4`}>
            <Published published={recipe.published} />
          </div>

          {showInstructions && <RecipeInstructions recipes={recipe} />}
          <UpdateRecipeInstructions />
        </div>
      </div>
    </div>
  );
};

export default Recipe;



// import React, { useState } from "react";
// import {
//   CookTime,
//   PrepTime,
//   Published,
//   TotalTime,
// } from "../TimeAndDate/TimeConvertor";

// import RecipeDetailTags from "../Tags/RecipeDetailTags";
// import Description from "../Description/Description";
// import Allergens from "../Allergens/allergens";
// import CoverImage from "../Images/CoverImage";
// import IngredientsList from "../ingredients/IngredientsList";
// import RecipeInstructions from "../Instructions/RecipeInstructions";
// import UpdateRecipeInstructions from "../Instructions/editRecipeInstructions";
// import Link from "next/link";
// import {
//   FaArrowLeft,
//   FaTag,
//   FaUtensils,
//   FaUsers,
//   FaClock,
// } from "react-icons/fa";
// import { GiCookingPot } from "react-icons/gi";
// import { FiClock as FiTotalTime } from "react-icons/fi";
// import Loading from "../Loading/Loading";
// import { useTheme } from "../Context/ThemeContext";
// import Grid from "@mui/material/Grid";

// const Recipe = ({ recipe, Allergies }) => {
//   const [showTags, setShowTags] = useState(false);
//   const [showInstructions, setShowInstructions] = useState(false);
//   const { theme } = useTheme();

//   if (!recipe) {
//     return (
//       <div>
//         <Loading />
//       </div>
//     );
//   }

//   const textClass = theme === "dark" ? "text-white" : "text-black";
//   const ingredientsList = Object.entries(recipe.ingredients).map(
//     (ingredient) => `${ingredient}`
//     );

//     const firstImage = recipe.images[0];
  
//     return (
//       <Grid container spacing={2}>
//         <Grid item xs={12}>
//           <div className={`container mx-auto mt-24 p-8 ${textClass}`}>
//             <Link href="/">
//               <span className={`text-gray-600 text-xl ${textClass}`}>
//                 <FaArrowLeft /> 
//               </span>
//             </Link>
  
//             <h1 className={`text-4xl font-bold ${textClass} mt-6 mb-4 text-center`}>
//               {recipe.title}
//             </h1>
//           </div>
//         </Grid>
  
//         <Grid item xs={12} md={6}>
//           <CoverImage
//             images={recipe.images}
//             title={recipe.title}
//             className="w-full h-auto lg:h-64 object-cover mb-4"
//           />
//           <Description description={recipe.description} recipeId={recipe._id} />
//           <div className="mt-4">
//           <h3 className={`text-lg font-semibold ${textClass}`}>
//             Instructions
//           </h3>
//           <RecipeInstructions recipes={recipe} />
//         </div>
//         </Grid>
  
//         <Grid item xs={12} md={6}>
//           <div className="grid grid-cols-2 gap-4 mt-4 p-4 mr-9">
//             <div>
//               <div className="flex items-center mb-2">
//                 <GiCookingPot className="mr-2" />
//                 <CookTime cookTime={recipe.cook} />
//                 <FaUsers className="ml-4 mr-2" />
//                 <b>{recipe.servings} servings</b>
//               </div>
//               <div className="flex items-center mb-2">
//                 <FaClock className="mr-2" />
//                 <PrepTime prepTime={recipe.prep} />
//                 <FiTotalTime className="ml-4 mr-2" />
//                 <TotalTime totalTime={recipe} />
//               </div>
//               <div className="flex items-center mb-2">
//                 <FaUtensils className="mr-2" />
//                  {recipe.category}
//               </div>
//             </div>
  
//             <div>
//               <h3 className="text-lg font-semibold mb-2">
//                 <FaTag className="mr-2" />
//                 Tags
//               </h3>
//               <RecipeDetailTags recipe={recipe} />
//             </div>
//           </div>
  
//           <Allergens
//             allergens={Allergies}
//             recipeIngredients={ingredientsList}
//           />
//           <h3 className="mt-2 text-lg font-semibold">Ingredients:</h3>
//           <IngredientsList ingredients={Object.entries(recipe.ingredients)} />
//         </Grid>
  
//         <Grid item xs={12}>
//           <div className={`container mx-auto p-8 ${textClass}`}>
           
  
//             <div className="mt-4">
//               {showInstructions && <RecipeInstructions recipes={recipe} />}
//               <UpdateRecipeInstructions />
//               <Published published={recipe.published} />
//             </div>
//           </div>
//         </Grid>
//       </Grid>
//     );
//   };
  
//   export default Recipe;
  