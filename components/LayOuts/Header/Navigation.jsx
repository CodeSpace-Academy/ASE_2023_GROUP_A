// /* The above code is a React component that represents a navigation bar. It imports various components
// and hooks from React and Next.js. */
// /* The line `import { useState, useEffect } from "react";` is importing the `useState` and `useEffect`
// hooks from the React library. These hooks are used to manage state and perform side effects in
// functional components. The `useState` hook allows you to add state to your component, while the
// `useEffect` hook allows you to perform side effects, such as fetching data or subscribing to events,
// in a functional component. */
// import { useState, useEffect } from "react";
// import DropdownMenu from "./DropdownMenu";
// import Link from "next/link";
// import Image from "next/image";
// import { useTheme } from "next-themes";

// const Navigation = () => {
//   const { theme, setTheme } = useTheme();
//   const [categories, setCategories] = useState([]); // State to store fetched categories
//   // Fetch categories from MongoDB when the component mounts
//   useEffect(() => {
//     // Fetch categories from the API route
//     fetch("/api/categories")
//       .then((response) => response.json())
//       .then((data) => setCategories(data))
//       .catch((error) => console.error("Error fetching categories:", error));
//   }, []);
//   const handleOptionSelect = (selectedOption) => {
//     console.log("Selected Option:", selectedOption);
//     // You can perform actions when an option is selected
//   };
//   // Function to toggle the theme
//   const toggleTheme = () => {
//     if (theme === "light") {
//       setTheme("dark");
//     } else {
//       setTheme("light");
//     }
//   };

//   return (
//     <nav className="bg-red-600">
//       <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
//         <div className="relative flex h-60 items-center justify-between">
//           <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
//             {/* <!-- Mobile menu button--> */}
//             <button
//               type="button"
//               className="relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
//               aria-controls="mobile-menu"
//               aria-expanded="false"
//             >
//               <span className="absolute -inset-0.5"></span>
//               <span className="sr-only">Open main menu</span>
//               {/* <!--
//               Icon when menu is closed.

//               Menu open: "hidden", Menu closed: "block"
//             --> */}
//               <svg
//                 className="block h-6 w-6"
//                 fill="none"
//                 viewBox="0 0 24 24"
//                 strokeWidth="1.5"
//                 stroke="currentColor"
//                 aria-hidden="true"
//               >
//                 <path
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                   d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
//                 />
//               </svg>
//               {/* <!--
//               Icon when menu is open.

//               Menu open: "block", Menu closed: "hidden"
//             --> */}
//               <svg
//                 className="hidden h-6 w-6"
//                 fill="none"
//                 viewBox="0 0 24 24"
//                 strokeWidth="1.5"
//                 stroke="currentColor"
//                 aria-hidden="true"
//               >
//                 <path
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                   d="M6 18L18 6M6 6l12 12"
//                 />
//               </svg>
//             </button>
//           </div>
//           <div className="flex flex-shrink-0 items-center">
//             <Link href={`/`}>
//               <Image
//                 src="/Images/logo.png"
//                 alt="Cooking Devs"
//                 height={150}
//                 width={180}
//               />
//             </Link>
//           </div>
//           <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
//             <div className="hidden sm:ml-6 sm:block">
//               <div className="flex space-x-4">
//                 {/* <!-- Current: "bg-gray-900 text-white", Default: "text-gray-300 hover:bg-gray-700 hover:text-white" --> */}
//                 {/* <Link
//                   href={`/recipes`}
//                   className="text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium"
//                 >
//                   Recipe
//                 </Link> */}
//                 <Link
//                   href={`/recipeList`}
//                   className="text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-2xl font-medium"
//                 >
//                   Recipes
//                 </Link>
//                 <Link
//                   href={`/Favourites`}
//                   className="text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-2xl font-medium"
//                 >
//                   Favourites
//                 </Link>
//               </div>
//             </div>
//           </div>
//           <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
//             <button
//               type="button"
//               onClick={toggleTheme}
//               className="relative rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
//             >
//               <span className="absolute -inset-1.5"></span>
//               <span className="sr-only">Toggle Theme</span>
//               {theme === "light" ? (
//                 <svg
//                   className="h-6 w-6"
//                   fill="none"
//                   viewBox="0 0 24 24"
//                   strokeWidth="1.5"
//                   stroke="currentColor"
//                   aria-hidden="true"
//                 >
//                   <path
//                     strokeLinecap="round"
//                     strokeLinejoin="round"
//                     d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0"
//                   />
//                 </svg>
//               ) : (
//                 <svg
//                   className="h-6 w-6"
//                   fill="none"
//                   viewBox="0 0 24 24"
//                   strokeWidth="1.5"
//                   stroke="currentColor"
//                   aria-hidden="true"
//                 >
//                   <path
//                     strokeLinecap="round"
//                     strokeLinejoin="round"
//                     d="M6 18L18 6M6 6l12 12"
//                   />
//                 </svg>
//               )}
//             </button>
//           </div>
//           <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
//             {/*
//           <!-- Profile dropdown --> */}
//             <div className="relative ml-3">
//               <div>
//                 <button
//                   type="button"
//                   className="relative flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
//                   id="user-menu-button"
//                   aria-expanded="false"
//                   aria-haspopup="true"
//                 >
//                   <span className="absolute -inset-1.5"></span>
//                   <span className="sr-only">Open user menu</span>
//                 </button>
//               </div>
//               {/* <!--
//               Dropdown menu, show/hide based on menu state.

//               Entering: "transition ease-out duration-100"
//                 From: "transform opacity-0 scale-95"
//                 To: "transform opacity-100 scale-100"
//               Leaving: "transition ease-in duration-75"
//                 From: "transform opacity-100 scale-100"
//                 To: "transform opacity-0 scale-95"
//             --> */}
//               <div>
//                 {/* <!-- Active: "bg-gray-100", Not Active: "" --> */}
//                 <DropdownMenu
//                   options={categories}
//                   onSelect={handleOptionSelect}
//                 />
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* <!-- Mobile menu, show/hide based on menu state. --> */}
//       <div className="sm:hidden" id="mobile-menu">
//         <div className="space-y-1 px-2 pb-3 pt-2">
//           {/* <!-- Current: "bg-gray-900 text-white", Default: "text-gray-300 hover:bg-gray-700 hover:text-white" --> */}

//           <Link
//             href={`/`}
//             className="text-gray-300 hover:bg-gray-700 hover:text-white block rounded-md px-3 py-2 text-base font-medium"
//           >Home

//           </Link>
//           <Link
//             href={`/recipes`}
//             className="text-gray-300 hover:bg-gray-700 hover:text-white block rounded-md px-3 py-2 text-base font-medium"
//           >
//            Recipe
//           </Link>
//           <Link
//             href={`/recipeList`}
//             className="text-gray-300 hover:bg-gray-700 hover:text-white block rounded-md px-3 py-2 text-base font-medium"
//           >
//             Favourites
//           </Link>
//         </div>
//       </div>
//     </nav>
//   );
// };

// export default Navigation;

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useTheme } from "next-themes";
import DropdownMenu from "../Header/DropdownMenu"; // Import the DropdownMenu component

const Navigation = () => {
  const { theme, setTheme } = useTheme();
  const [categories, setCategories] = useState([]);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    fetch("/api/categories")
      .then((response) => response.json())
      .then((data) => setCategories(data))
      .catch((error) => console.error("Error fetching categories:", error));
  }, []);

  const handleOptionSelect = (selectedOption) => {
    console.log("Selected Option:", selectedOption);
    // You can perform actions when an option is selected
  };

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
    <nav className="bg-blue-100">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="relative flex h-20 items-center justify-between">
          <div className="flex items-center">
            <div className="mr-6">
              <Link href={`/home`}>
                <Image
                  src="/Images/logo.png"
                  alt="Cooking Devs"
                  width={75} 
                  height={70}
                />
              </Link>
            </div>
          </div>
          {/* Desktop View Navigation Links */}
          <div className="hidden sm:flex items-center space-x-4  ">
            <NavLink href={`/recipeList`} text="Recipes" />
            <NavLink href={`/Favourites`} text="Favourites" />
          </div>
          <div className="flex items-center space-x-4 md:space-x-8">
            <ToggleThemeButton theme={theme} toggleTheme={toggleTheme} />
            <DropdownMenu options={categories} onSelect={handleOptionSelect} />
          </div>
          {/* Mobile Menu Button */}
          <div className="sm:hidden">
            <MobileMenuButton onClick={toggleMobileMenu} />
          </div>
          
          
        </div>
        {/* Mobile Dropdown Menu */}
        
        {mobileMenuOpen && (
          <MobileMenu
            onClose={() => setMobileMenuOpen(false)}
            categories={categories}
          />
        )}
      </div>
    </nav>
    
  );
};

const NavLink = ({ href, text }) => (
  <Link
    href={href}
    className="text-yellow-700 hover-bg-gray-700 hover-text-white px-3 py-2 text-2xl font-medium"
  >
    {text}
  </Link>
);

const ToggleThemeButton = ({ theme, toggleTheme }) => (
  <button
    type="button"
    onClick={toggleTheme}
    className="text-gray-400 hover-text-white focus:outline-none focus-ring-2 focus-ring-white focus-ring-offset-2 focus-ring-offset-gray-800"
  >
    {theme === "light" ? (
      <svg
        className="w-6 h-6"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0"
        />
      </svg>
    ) : (
      <svg
        className="w-6 h-6"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M6 18L18 6M6 6l12 12"
        />
      </svg>
    )}
  </button>
);

const MobileMenuButton = ({ onClick }) => (
  <button
    type="button"
    onClick={onClick}
    className="text-gray-400 hover-text-white p-2 focus-outline-none focus-ring-2 focus-ring-inset focus-ring-white"
  >
    <span className="sr-only">Open main menu</span>
    <svg
      className="w-6 h-6"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
      />
    </svg>
  </button>
);

const MobileMenu = ({ onClose, categories }) => (
  <div className="sm:hidden w-full">
    <div className=" text-gray-300 text-base font-medium">
      {/* <Link
        href={`/`}
        onClick={onClose}
        className="block px-3 py-2 hover-bg-gray-700 hover-text-white"
      >
        Home
      </Link> */}
      <Link
        href={`/recipeList`}
        onClick={onClose}
        className="block px-3 py-2 hover-bg-gray-700 hover-text-white"
      >
        Recipes
      </Link>
      <Link
        href={`/Favourites`}
        onClick={onClose}
        className="block px-3 py-2 hover-bg-gray-700 hover-text-white"
      >
        Favourites
      </Link>
    </div>
  </div>
);

export default Navigation;
