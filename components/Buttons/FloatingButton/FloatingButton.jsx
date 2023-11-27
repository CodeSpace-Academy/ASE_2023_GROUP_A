import React from "react";
import { FaArrowUp, FaArrowDown } from "react-icons/fa";
import classes from "./floatingButton.module.css";

export default function FloatingButton() {
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
      <button
        alt="up button"
        className={classes.floatingButton}
        onClick={handleScrollToTop}
        type="button"
      >
        <FaArrowUp />
      </button>
      <button
        alt="down button"
        className={classes.floatingButton2}
        onClick={handleScrollToBottom}
        type="button"
      >
        <FaArrowDown />
      </button>
    </>
  );
}
