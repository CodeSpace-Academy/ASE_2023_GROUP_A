import React from "react";
import { useTheme } from "../Context/ThemeContext";
import Navigation from "./Header/Navigation";
import Footer from "../Footer/Footer";

const Layout = ({ children }) => {
  const { theme } = useTheme();

  return (
    <div className={`header-layout ${theme === "light" ? "light-mode" : "dark-mode"}`}>
      <Navigation />
      {children}
      <Footer />
    </div>
  );
};

export default Layout;
