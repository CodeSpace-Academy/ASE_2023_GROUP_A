import React from "react";
import { useTheme } from "../Context/ThemeContext"; // Update the import path as needed
import Navigation from "./Header/Navigation";
import Footer from "../footer/Footer";
const Layout = ({ children }) => {
  const { theme } = useTheme();

  return (
    <div
      className={`header-layout ${
        theme === "dark" ? "bg-black" : "bg-slate-300"
      }`}
    >
      <Navigation />
      {children}
      <Footer/>
    </div>
  );
};

export default Layout;