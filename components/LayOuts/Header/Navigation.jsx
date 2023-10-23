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
