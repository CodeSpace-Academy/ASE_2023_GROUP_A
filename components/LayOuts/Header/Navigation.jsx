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
    <nav className="w-full bg-red-500 fixed top-0 left-0 right-0 z-10 h-18">
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
            <Link href={`/home`}>
              <Image
                src="/Images/logo3.png"
                alt="Cooking Devs"
                height={50}
                width={70}
              />
            </Link>
          </div>
          <div className="hidden sm:ml-6 sm:block">
            <div className="flex space-x-4 justify-start">
              <Link
                href={`/recipeList`}
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
            >
              <span className="absolute -inset-1.5"></span>
              <span className="sr-only">Toggle Theme</span>
              {theme === "light" ? (
                <svg
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31"
                  />
                </svg>
              ) : (
                <svg
                  className="h-6 w-6"
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
              className={`absolute top-12 left-0 ${mobileMenuOpen ? "bg-red-500 w-full mt-5 text-center mr-6  " : "hidden"}`}
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

// import Image from 'next/image';
// import Link from 'next/link';
// import { useState } from 'react';

// function NavBar() {
//   const [navbar, setNavbar] = useState(false);
//   return (
//     <div>
//       <nav className="w-full bg-red-500 fixed top-0 left-0 right-0 z-10">
//         <div className="justify-between px-4 mx-auto lg:max-w-7xl md:items-center md:flex md:px-8">
//           <div>
//             <div className="flex items-center justify-between py-3 md:py-5 md:block">
//               {/* LOGO */}
//               <Link href="/home">
//               <Image className="text-2xl text-cyan-600 font-bold"  src="/Images/logo3.png" width={30} height={30} alt="logo" />
//               </Link>
//               {/* HAMBURGER BUTTON FOR MOBILE */}
//               <div className="md:hidden">
//                 <button
//                   className="p-2 text-gray-700 rounded-md outline-none focus:border-gray-400 focus:border"
//                   onClick={() => setNavbar(!navbar)}
//                 >
//                   {navbar ? (
//                     <Image src="/Images/close.svg" width={30} height={30} alt="logo" />
//                   ) : (
//                     <Image
//                       src="/Images/hamburger-menu.svg"
//                       width={30}
//                       height={30}
//                       alt="logo"
//                       className="focus:border-none active:border-none"
//                     />
//                   )}
//                 </button>
//               </div>
//             </div>
//           </div>
//           <div>
//             <div
//               className={`flex-1 justify-self-center pb-3 mt-8 md:block md:pb-0 md:mt-0 ${
//                 navbar ? 'p-12 md:p-0 block' : 'hidden'
//               }`}
//             >
//               <ul className="h-screen md:h-auto items-center justify-center md:flex ">
//                 <li className="pb-6 text-xl text-white py-2 md:px-6 text-center border-b-2 md:border-b-0  hover:bg-purple-900  border-purple-900  md:hover:text-purple-600 md:hover:bg-transparent">
//                   <Link href="/recipeList" onClick={() => setNavbar(!navbar)}>
//                     Recipe
//                   </Link>
//                 </li>
//                 <li className="pb-6 text-xl text-white py-2 px-6 text-center  border-b-2 md:border-b-0  hover:bg-purple-600  border-purple-900  md:hover:text-purple-600 md:hover:bg-transparent">
//                   <Link href="/favourite" onClick={() => setNavbar(!navbar)}>
//                     Favourites
//                   </Link>
//                 </li>
//               </ul>
//             </div>
//           </div>
//         </div>
//       </nav>
//     </div>
//   );
// }

// export default NavBar;
