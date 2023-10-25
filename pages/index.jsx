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
      <RecipeList />
    </main>
  );
};
export default Home;
