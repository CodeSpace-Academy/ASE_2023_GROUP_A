import React from "react";
import { FaArrowUp } from "react-icons/fa";
import classes from "./floatingButton.module.css";

export default function FloatingButton() {
  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className={classes.floatingButton} onClick={handleScrollToTop}>
      <FaArrowUp />
    </div>
  );
}
