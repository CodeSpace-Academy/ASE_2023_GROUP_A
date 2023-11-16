import React from "react";
import { FaArrowUp, FaArrowDown } from "react-icons/fa";

import { useTheme } from "../../Context/ThemeContext";
import classes from "./floatingButton.module.css";

export default function FloatingButton() {
  const { theme } = useTheme();
  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  const handleScrollToBottom = () => {
    window.scrollTo({
      top: document.body.scrollHeight,
      behavior: "smooth",
    });
  };

  console.log('button: ', theme);
  return (
    <>
      <div
        className={`${theme === "light" ? "bg-blue-500" : "bg-blue-900"} ${
          classes.floatingButton
        }`}
        onClick={handleScrollToTop}
      >
        <FaArrowUp />
      </div>
      <div
        className={`${theme === "light" ? "bg-blue-500" : "bg-blue-900"} ${
          classes.floatingButton2
        }`}
        onClick={handleScrollToBottom}
      >
        <FaArrowDown />
      </div>
    </>
  );
}
