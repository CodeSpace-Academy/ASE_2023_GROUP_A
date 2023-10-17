import { useRouter } from "next/router";
import { fetchRecipeDataFromMongo, getUpdatedDescription } from "../helpers/mongoDB-utils";
import Recipe from "../components/Recipes/Recipe";

const RecipePage = ({ recipe, newDescription }) => {

  const router = useRouter();
  const { recipeName } = router.query;

  if (!recipe) {
    console.log(`Can't find Recipe for:`, JSON.stringify(recipeName));
  }
  return (
    <div>
      <Recipe recipe={recipe} newDescription={newDescription}/>
    </div>
  );
};

export const getServerSideProps = async ({ params }) => {
  const recipeName = params.recipeName;
  const recipe = await fetchRecipeDataFromMongo(recipeName, "recipes");
  const newDescription = await getUpdatedDescription(recipe._id);
  console.log("Fetched R8 Desc:", newDescription);
  return {
    props: { recipe , newDescription},
  };
};

export default RecipePage;
