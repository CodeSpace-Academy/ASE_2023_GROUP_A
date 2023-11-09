import React from "react";
import { useTheme } from "../Context/ThemeContext"; // Update the import path as needed
import Navigation from "./Header/Navigation";
import Footer from "../footer/Footer";
const Layout = ({ children }) => {
  const { theme } = useTheme();

  return (
    <div
      className={`header-layout ${
        theme === "dark" ? "" : ""
      } h-screen w-screen bg-cover bg-center `}
    >
      <Navigation />
      {children}
      <Footer/>
    </div>
  );
};

export default Layout;
