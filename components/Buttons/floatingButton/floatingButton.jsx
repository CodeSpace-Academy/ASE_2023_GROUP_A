import React from "react";
import { FaArrowUp, FaArrowDown } from "react-icons/fa";
import classes from "./floatingButton.module.css";

/**
 * Functional component representing a Floating Button for scrolling to the top and bottom of the page.
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
   * @returns {void}
   */
  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  /**
   * Handles scrolling to the bottom of the page with a smooth scroll effect.
   *
   * @function
   * @returns {void}
   */
  const handleScrollToBottom = () => {
    window.scrollTo({
      top: document.body.scrollHeight,
      behavior: "smooth",
    });
  };

  return (
    <>
      { /* eslint-disable-next-line jsx-a11y/no-static-element-interactions */ }
      {/* Scroll to Top Button */}
      <div className={classes.floatingButton} onClick={handleScrollToTop}>
        <FaArrowUp />
      </div>

      {/* Scroll to Bottom Button */}
      <div className={classes.floatingButton2} onClick={handleScrollToBottom}>
        <FaArrowDown/>
      </div>
    </>
  );
}
