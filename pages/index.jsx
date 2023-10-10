import RecipeList from "../components/RecipesList/RecipeList";

const Home = () => {
  return (
    <main
      className={`flex min-h-screen flex-col items-center justify-between p-24 `}
    >
      <RecipeList
        recipe={{
          _id: "",
          title: "",
          description: "",
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
