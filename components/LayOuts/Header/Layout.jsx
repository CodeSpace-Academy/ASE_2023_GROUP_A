import React from "react";
import { useTheme } from "../../Context/ThemeContext"; // Update the import path as needed
import Navigation from "./Navigation";
const Layout = ({ children }) => {
  const { theme } = useTheme();

  return (
    <div
      className={`header-layout ${
        theme === "dark" ? "bg-black" : "bg-slate-300"
      }`}
    >
      <Navigation />
      {/* <Navigation /> */}
      {children}
    </div>
  );
};

export default Layout;
