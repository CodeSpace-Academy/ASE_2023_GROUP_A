/* eslint-disable jsx-a11y/control-has-associated-label */
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
      <div
        className={classes.floatingButton}
        onClick={handleScrollToTop}
        onKeyDown={(event) => {
          if (event.key === "Enter") {
            handleScrollToTop();
          }
        }}
        role="button"
        tabIndex="0"
      >
        <FaArrowUp />
      </div>

      <div
        className={classes.floatingButton2}
        onClick={handleScrollToBottom}
        onKeyDown={(event) => {
          if (event.key === "Enter") {
            handleScrollToBottom();
          }
        }}
        role="button"
        tabIndex="0"
      >
        <FaArrowDown />
      </div>
    </>
  );
}
