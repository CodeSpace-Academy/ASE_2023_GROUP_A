import { useState, useEffect } from "react";
import Link from "next/link";
import Image from 'next/image' 

const Navigation = () => {
  const [categories, setCategories] = useState([]); // State to store fetched categories
  // Fetch categories from MongoDB when the component mounts
  useEffect(() => {
    fetch("/api/categories")
      .then((response) => response.json())
      .then((data) => setCategories(data))
      .catch((error) => console.error("Error fetching categories:", error));
  }, []);

  const handleOptionSelect = (selectedOption) => {
    console.log("Selected Option:", selectedOption);
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

export default Navigation;

