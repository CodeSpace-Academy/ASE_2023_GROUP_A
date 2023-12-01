import React from "react";
import { FaArrowUp, FaArrowDown } from "react-icons/fa";
import classes from "./FloatingButton.module.css";

/**
 * FloatingButton component that provides buttons for scrolling to the top and bottom of the page.
 *
 * @component
 * @example
  * <FloatingButton />
 */
export default function FloatingButton() {
  /**
   * Handles scrolling based on the specified direction.
   *
   * @param {string} direction - The direction to scroll ("up" or "down").
   * @returns {void}
   */
  const handleScroll = (direction) => {
    const topPosition = direction === "up" ? 0 : document.body.scrollHeight;

    window.scrollTo({
      top: topPosition,
      behavior: "smooth",
    });
  };

  return (
    <>
      {/* Scroll to Top Button */}
      <div
        className={classes.floatingButton}
        onClick={() => handleScroll("up")}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            handleScroll("up");
          }
        }}
        role="button"
        tabIndex="0"
        aria-label="Scroll to Top"
      >
        <FaArrowUp />
      </div>

      {/* Scroll to Bottom Button */}
      <div
        className={classes.floatingButton2}
        onClick={() => handleScroll("down")}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            handleScroll("down");
          }
        }}
        role="button"
        tabIndex="0"
        aria-label="Scroll to Bottom"
      >
        <FaArrowDown />
      </div>
    </>
  );
}
