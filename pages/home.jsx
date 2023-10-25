import classes from "./home.module.css";

export default function HomePage() {
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
              {/* <button type="submit" className="absolute right-0 top-0 mt-2 mr-3">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path
              fillRule="evenodd"
              d="M13.293 13.293a1 1 0 0 1-1.414 1.414l-3.5-3.5a1 1 0 0 1 0-1.414l3.5-3.5a1 1 0 0 1 1.414 1.414L11.414 10l1.879 1.879a1 1 0 0 1 0 1.414z"
            />
          </svg>
        </button> */}
            </div>
          </div>
        </div>
      </div>
        <div>
          <h2>Featured Recipes</h2>
        </div>
        <div>
          <h2>Favorites Recipes</h2>
        </div>
    </>
  );
}
