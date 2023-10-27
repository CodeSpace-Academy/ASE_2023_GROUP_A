import { useRouter } from "next/router";
import { DBConnection, fetchAllergens, fetchRecipeDataFromMongo } from "@/helpers/mongoDB-utils";
import Recipe from "../components/Recipes/Recipe";
import Description from './../components/Description/Description';

const RecipePage = ({ recipe, allergens }) => {
  const router = useRouter();
  const { recipeName } = router.query;

  if (!recipe) {
    console.log(`Can't find Recipe for:`, JSON.stringify(recipeName));
  }
  if (!allergens) {
    console.log(`Can't find Allergens for:`, JSON.stringify(allergens));
    return(
      <div>
        Loading...
      </div>
    )
  }
  return (
    <div>
      <Recipe recipe={recipe} description={recipe.description} Allergies={allergens} />
    </div>
  );
};

export const getServerSideProps = async ({ params }) => {
  const recipeName = params.recipeName;
  const client = await DBConnection()
  const recipe = await fetchRecipeDataFromMongo(client,recipeName, "recipes");
  
  const allergens = await fetchAllergens();
  
  if(!allergens || !recipe){
    return {
      notFound: true, // Return a 404 page or handle the error accordingly
    };
  }else{
    return {
    props: { recipe , allergens },
  };
  }
  
};

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

// export const getServerSideProps = async ({ params }) => {
//   const recipeName = params.recipeName;
//   const recipe = await fetchRecipeDataFromMongo(recipeName, "recipes");
//   const allergens = await fetchAllergens();
  
//   if (!Array.isArray(allergens) || !recipe) {
//     return {
//       notFound: true, // Return a 404 page or handle the error accordingly
//     };
//   } else {
//     return {
//       props: { recipe, allergens },
//     };
//   }
// };

// export default RecipePage;

