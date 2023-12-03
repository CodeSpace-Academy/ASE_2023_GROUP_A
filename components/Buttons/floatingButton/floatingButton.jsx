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
  return (
    <>
      <div
        className={`${theme === "light" ? "bg-blue-500" : "bg-blue-900"} ${
          classes.floatingButton
        }`}
        onClick={handleScrollToTop}
        onKeyUp={handleScrollToTop}
        role="button"
        tabIndex={0}
        aria-label="to top"
      >
        <FaArrowUp />
      </div>
      <div
        className={`${theme === "light" ? "bg-blue-500" : "bg-blue-800"} ${
          classes.floatingButton2
        }`}
        onClick={handleScrollToBottom}
        onKeyDown={handleScrollToBottom}
        role="button"
        tabIndex={0}
        aria-label="to bottom"
      >
        <FaArrowDown />
      </div>
    </>
  );
}
