import { useRouter } from "next/router";
// import { DBConnection, fetchAllergens, fetchRecipeDataFromMongo } from "@/helpers/mongoDB-utils";
// import Recipe from "../components/Recipes/Recipe";
// import Description from './../components/Description/Description';
import { useEffect, useState } from "react";

const RecipePage = ({recipe, allergens}) => {
  // const [recipe, setRecipe] = useState();
  // const [allergens, setAllergens] = useState();

//   useEffect(() => {
//     const fetchData = async () => {
//       const response = await fetch(`/api/recipes/${recipeName}`);
//       if (response.ok) {
//         const data = await response.json();
//         // console.log("DATA",data)
//         setRecipe(data.recipe);
//         setAllergens(data.allergies)
//       }
//     }
//     fetchData()
// },[])
// console.log("RECIPE:", recipe)
// console.log("Allergens:", allergens)
  if (!recipe) {
    console.log(`Can't find Recipe for:`, JSON.stringify(recipe));
  }
  // if (!allergens) {
  //   console.log(`Can't find Allergens for:`, JSON.stringify(allergens));
  //   return(
  //     <div>
  //       Loading...
  //     </div>
  //   )
  // }
  console.log(recipe, allergens)
  return (
    <div>
      {recipe}
      {recipe}
      {recipe}
      {recipe}
      {recipe}
      {/* {allergens} */}
      {/* <Recipe recipe={recipe} description={recipe.description} Allergies={allergens} /> */}
    </div>
  );
};

// export const getServerSideProps = async ({ params }) => {
//   const recipeName = params.recipeName;
//   const encodedRecipeName = encodeURIComponent(recipeName);
//   const response = await fetch(`api/${encodedRecipeName}`);
//   if (response.ok) {
//     const data = await response.json();
//     return {
//       props: { recipe: data.recipe, allergens: data.allergens },
//     };
//   } else {
//     return {
//       notFound: true, // Return a 404 page or handle the error accordingly
//     };
//   }
// };


export default RecipePage;


// import { useRouter } from "next/router";
// import { fetchAllergens, fetchRecipeDataFromMongo } from "../helpers/mongoDB-utils";
// import Recipe from "../components/Recipes/Recipe";
// import Description from './../components/Description/Description';

// const RecipePage = ({ recipe, allergens }) => {
//   const router = useRouter();
//   const { recipeName } = router.query;

//   if (!recipe) {
//     console.log(`Can't find Recipe for:`, JSON.stringify(recipeName));
//     return <div>Loading...</div>;
//   }
  
//   // Check if allergens is an array before rendering Recipe component
//   if (!Array.isArray(allergens)) {
//     console.log(`Can't find Allergens for:`, JSON.stringify(allergens));
//     return <div>Loading...</div>;
//   }

//   return (
//     <div>
//       <Recipe recipe={recipe} description={recipe.description} Allergies={allergens} />
//     </div>
//   );
// };

export const getServerSideProps = async ({ params }) => {
  const recipeName = params.recipeName;
  console.log(recipeName)
  const response = await fetch(`api/recipes/${recipeName}`);
  console.log(response)
    return {
      props: { recipe:recipeName },
  }
};

// export default RecipePage;

