import RecipeList from "../components/RecipesList/RecipeList";
import EnvError from "./error";

const Home = () => {
  if (!process.env.mongodb_password && process.env.mongodb_username) {
    return <EnvError />;
  }

  return (
    <main
      className={`flex min-h-screen flex-col items-center justify-between p-24 `}
    >
      <RecipeList
        recipe={{
          _id: "",
          title: "",
          description: "",
          allergens: "",
          prep: 0,
          cook: 0,
          category: "",
          servings: 0,
          published: "",
          tags: [],
          images: [],
        }}
      />
    </main>
  );
};
export default Home;
