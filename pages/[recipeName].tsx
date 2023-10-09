import { useRouter } from "next/router";
import { fetchRecipeDataFromMongo } from "@/helpers/mongoDB-utils";
import Recipe from "@/components/Recipes/Recipe";
const RecipePage = ({ recipe }:any) =>{
const router = useRouter();
const { recipeName } = router.query;
if(!recipe){
  console.log(`Can't find Recipe for:`,JSON.stringify(recipeName))
}
  return(
        <div>
          <Recipe recipe={recipe}/>
        </div>
  );
};
export const getServerSideProps=async({params}:any)=>{
  const recipeName = params.recipeName;
  const recipe = await fetchRecipeDataFromMongo(recipeName, 'recipes');

  return{
    props: { recipe },
  };
}

export default RecipePage;