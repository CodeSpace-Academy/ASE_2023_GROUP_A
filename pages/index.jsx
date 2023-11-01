import EnvError from "./error";
import classes from "./home.module.css";
const Home = () => {
  if (
    process.env == {} ||
    !process.env.mongodb_password ||
    !process.env.mongodb_username
  ) {
    return <EnvError />;
  }

  return (
    <>
      <div className={classes.heroImage}>
        <div className="flex justify-center items-center">
          <div className="w-full md:w-1/3 mx-auto  py-20  px-10 mt-20">
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
        <h2>Favorites Recipes</h2>
      </div>
    </>
  );
};

export default Home;
