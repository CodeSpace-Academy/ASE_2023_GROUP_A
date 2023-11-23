// Filename: pages/similar-recipes/[...slug].js
import { useEffect, useState } from "react";
import RecipeCard from "../../../components/cards/RecipeCard";
import { useRouter } from "next/router";

const SimilarRecipes = () => {
  const router = useRouter();
  const { slug } = router.query;
  const [similarRecipes, setSimilarRecipes] = useState([]);

  useEffect(() => {
    if (slug) {
      const recipeTitle = Array.isArray(slug) ? slug[0] : slug;
      console.log("Similar Recipes For recipeTitle", recipeTitle);
  
      // Fetch similar recipes when the component mounts
      const fetchSimilarRecipes = async () => {
        try {
          const response = await fetch(`/api/search/similarRecipes?recipeTitle=${recipeTitle}`);
          console.log("Response:",response)
          if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
          }
      
          const data = await response.json();
          setSimilarRecipes(data.similarRecipes);
        } catch (error) {
          console.error("Error fetching recipes:", error);
        }
      };
      
  
      fetchSimilarRecipes();
    }
  }, [slug]);
  


  console.log("Similar Recipes For Slug:", slug);
  

  return (
    <div className="p-30">

      <h2>Similar Recipes to {slug}</h2>
      <h2>Similar Recipes to {slug}</h2>
      <h2>Similar Recipes to {slug}</h2>
      <h2>Similar Recipes to {slug}</h2>
      <h2>Similar Recipes to {slug}</h2>

      <div>
        {similarRecipes.map((recipe) => (
          <RecipeCard key={recipe._id} recipe={recipe} />
        ))}
      </div>
    </div>
  );
};

export default SimilarRecipes;
