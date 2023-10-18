import { useState } from "react";
import Navigation from "./Navigation";

// HeaderLayout component serves as a layout for the application's header
const HeaderLayout = ({ children }) => {
  // State to manage the theme (light or dark)
  const [theme, setTheme] = useState("light");

  // Function to toggle between light and dark themes
  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  return (
    <div
      className={`header-layout ${
        theme === "dark" ? "dark-mode" : "light-mode"
      }`}
    >
      {/* Button to toggle the theme (light/dark) */}
      <button onClick={toggleTheme}>Toggle Theme</button>
      
      {/* Render the Navigation component within the header layout */}
      <Navigation />

      {/* Render the children components within the header layout */}
      {children}
    </div>
  );
};

export default HeaderLayout;
