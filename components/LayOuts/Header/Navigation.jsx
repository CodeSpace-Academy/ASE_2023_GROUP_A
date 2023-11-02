import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useTheme } from "next-themes";

const Navigation = () => {
  const { theme, setTheme } = useTheme();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleTheme = () => {
    if (theme === "light") {
      setTheme("dark");
    } else {
      setTheme("light");
    }
  };

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <nav className="w-full bg-blue-500 bg-opacity-80 fixed top-0 left-0 right-0 z-10 h-18">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 ">
        <div className="flex items-center justify-between">
          <div className="flex items-center justify-between py-3 md:py-5 md:block">
            <button
              type="button"
              onClick={toggleMobileMenu}
              className="block sm:hidden relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
              aria-controls="mobile-menu"
              aria-expanded={mobileMenuOpen ? "true" : "false"}
            >
              <span className="absolute -inset-2"></span>
              <span className="sr-only">
                {mobileMenuOpen ? "Close main menu" : "Open main menu"}
              </span>
              <svg
                className={`block h- w-6 ${
                  mobileMenuOpen ? "hidden" : "block"
                }`}
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                />
              </svg>
              <svg
                className={`block h-6 w-6 ${
                  mobileMenuOpen ? "block" : "hidden"
                }`}
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
          <div className="flex mr-10 flex-shrink-0 items-center">        
              <Image
                src="/Images/logo3.png"
                alt="Cooking Devs"
                height={50}
                width={70}
              />      
          </div>
          <div className="hidden sm:ml-6 sm:block">
            <div className="flex space-x-4 justify-start">
              <Link
                href={`/`}
                className="text-white hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-lg font-medium"
              >
                Recipes
              </Link>
              <Link
                href={`/favourites`}
                className="text-white hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-lg font-medium"
              >
                Favourites
              </Link>
            </div>
          </div>

          {/* mobile view */}
          {/* toggle */}
          <div className="absolute inset-y-0 right-0 flex items-center pr-5 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
            <button
              type="button"
              onClick={toggleTheme}
              className="relative rounded-full bg-gray-800 p-1 text-gray-400 hover:text-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-300 focus:ring-offset-2 focus:ring-offset-gray-800"
              style={{ opacity: theme === "dark" ? 0.4 : 1 }}
            >
              <span className="absolute -inset-1.5"></span>
              <span className="sr-only">Toggle Theme</span>
              {theme === "light" ? (
                <svg xmlns="http://www.w3.org/2000/svg"
                 fill="none" 
                 viewBox="0 0 24 24" 
                 strokeWidth="1.5" 
                 stroke="currentColor" 
                 className="w-4 h-6">
                <path strokeLinecap="round"
                 strokeLinejoin="round"
                 d="M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z" />
                 </svg>

              ) : (
                <svg xmlns="http://www.w3.org/2000/svg"
                 fill="none"
                  viewBox="0 0 24 24"
                   strokeWidth="1.5" 
                   stroke="currentColor" className="w-4 h-6">
                  <path strokeLinecap="round" 
                  strokeLinejoin="round"
                   d="M21.752 15.002A9.718 9.718 0 0118 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 003 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 009.002-5.998z" />
                </svg>

              )}
            </button>
          </div>

          <div className="flex flex-center">
            <div>
              <button
                type="button"
                onClick={toggleMobileMenu}
                className="relative flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800 ml-auto"
                id="user-menu-button"
                aria-expanded={mobileMenuOpen ? "true" : "false"}
                aria-haspopup="true"
              >
                <span className="absolute -inset-1.5"></span>
                <span className="sr-only">Open user menu</span>
              </button>
            </div>
            <div
              className={`absolute top-12 left-0 ${mobileMenuOpen ? "bg-red-500 w-full mt-5 text- mr-6 text-center " : "hidden"}`}
              id="mobile-menu"
            >
              <Link
                href={`/recipeList`}
                className="text-black-300 hover:bg-gray-700 hover:text-white block rounded-md px-3 py-2 text-base font-medium"
              >
                Recipe
              </Link>
              <Link
                href={`/favourites`}
                className="text-black-300 hover:bg-gray-700 hover:text-white block rounded-md px-3 py-2 text-base font-medium"
              >
                Favourites
              </Link>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
