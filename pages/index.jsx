import RecipeCard from "@/components/Cards/RecipeCard";
import EnvError from "./error";
import classes from "./home.module.css";
import { useContext } from "react";
import Loading from "@/components/Loading/Loading";
import FavoritesContext from "@/components/Context/Favorites-context";
import useSWR from "swr";

import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { responsive } from "@/helpers/settings/settings";

const Home = () => {
  const favoriteContext = useContext(FavoritesContext);
  
const fetcher =  (url) => fetch(url).then(res => res.json())
  const { data: favoritesData, error } = useSWR(
    "api/recipes/Favourites",
    fetcher,
  );

  if (
    process.env == {} ||
    !process.env.mongodb_password ||
    !process.env.mongodb_username
  ) {
    return <EnvError />;
  }

  if (error || !favoritesData) {
    return (
    <Loading/>
  )
  }
    console.log("FAVORITESDATA:", favoritesData.favorites)
  const favorites = favoritesData.favorites || [];
  favoriteContext.updateFavorites(favorites);
  return (
    <>
      <div className={classes.heroImage}>
        <div className="flex justify-center items-center">
          <div className="w-full md:w-1/3 mx-auto py-20 px-10 mt-20">
            <div className="text-gray-600 ml-20 bg-amber">
              <input
                type="search"
                name="search"
                placeholder="Search"
                className="w-full py-2 pr-10 pl-5 rounded-lg bg-white shadow-md focus:outline-none focus:shadow-outline text-sm"
              />
            </div>
          </div>
        </div>
      </div>
      <div>
        <h2>Welcome back to your Favorite place, the Kitchen</h2>
      </div>
      <div>
        <h2>Favorite Recipes</h2>
        {!favorites ? (
          <p>Loading favorite recipes...</p>
        ) : favorites.length === 0 ? (
          <p>No favorite recipes yet.</p>
        ) : (
          <Carousel responsive={responsive} containerClass="carousel-container">
            {favorites.map((recipe) => (
              <div key={recipe.recipe._id}>
                <RecipeCard recipe={recipe.recipe} favorites={favorites} />
              </div>
            ))}
          </Carousel>
        )}
      </div>
    </>
  );
};

// export const getServerSideProps = async () => {
//   try {
//     const response = await fetch(
//       "http://localhost:3000/api/recipes/Favourites"
//     );
//     if (response.ok) {
//       const favoriteRecipes = await response.json();
//       const favorites = Array.from(favoriteRecipes.favorites) || [];
//       return {
//         props: {
//           favorites,
//           isLoading: false,
//         },
//       };
//     } else {
//       console.error(
//         "Failed to fetch favorite recipes. Status code: " + response.status
//       );

//       return {
//         props: {
//           favorites: [],
//           isLoading: false,
//         },
//       };
//     }
//   } catch (error) {
//     console.error("Error fetching favorite recipes:", error);

//     return {
//       props: {
//         favorites: [],
//         isLoading: false,
//       },
//     };
//   }
// };

export default Home;
