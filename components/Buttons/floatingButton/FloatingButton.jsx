import React from "react";
import { FaArrowUp,FaArrowDown } from "react-icons/fa";
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
      <div className={classes.floatingButton} onClick={handleScrollToTop}>
        <FaArrowUp />
      </div>
      <div className={classes.floatingButton2} onClick={handleScrollToBottom}>
        <FaArrowDown/>
      </div>
    </>
  );
}
