import React from "react";
import { FaArrowUp, FaArrowDown } from "react-icons/fa";
import classes from "./floatingButton.module.css";

/**
 *Component representing a Floating Button for scrolling to the top and bottom of the page.
 *
 * @component
 * @example
 * // Usage of FloatingButton component
 * <FloatingButton />
 */
export default function FloatingButton() {
  /**
   * Handles scrolling to the top of the page with a smooth scroll effect.
   *
   * @function
   * @param {React.KeyboardEvent<HTMLDivElement>} e - The keyboard event.
   * @returns {void}
   */
  const handleScrollToTop = (e) => {
    if (e.key === "Enter" || e.key === " ") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  /**
   * Handles scrolling to the bottom of the page with a smooth scroll effect.
   *
   * @function
   * @param {React.KeyboardEvent<HTMLDivElement>} e - The keyboard event.
   * @returns {void}
   */
  const handleScrollToBottom = (e) => {
    if (e.key === "Enter" || e.key === " ") {
      window.scrollTo({
        top: document.body.scrollHeight,
        behavior: "smooth",
      });
    }
  };

  return (
    <>
      {/* Scroll to Top Button */}
      <div
        className={classes.floatingButton}
        onClick={handleScrollToTop}
        onKeyDown={handleScrollToTop}
        role="button"
        tabIndex="0"
        aria-label="Scroll to Top"
      >
        <FaArrowUp />
      </div>

      {/* Scroll to Bottom Button */}
      <div
        className={classes.floatingButton2}
        onClick={handleScrollToBottom}
        onKeyDown={handleScrollToBottom}
        role="button"
        tabIndex="0"
        aria-label="Scroll to Bottom"
      >
        <FaArrowDown />
      </div>
    </>
  );
}
