import React from "react";
import Link from "next/link";
import { useTheme } from "../Context/ThemeContext";
import classes from "./Footer.module.css";

/**
 * Footer component for displaying site information and links.
 * @returns {JSX.Element} - The rendered Footer component.
 */
export default function Footer() {
  const pageName = "< Cooking Devs />";
  const currentYear = new Date().getFullYear();
  const { theme } = useTheme();
  const isDarkTheme = theme === "dark";

  return (
    <footer
      className={`py-6 ${
        theme === "light" ? "bg-blue-400" : "bg-gray-900"
      } bottom-0 left-0 right-0 z-10 sm:block`}
    >
      <div
        className={`${classes.footer} ${
          isDarkTheme ? "text-white" : ""
        }`}
      >
        <Link
          target="_blank"
          href="https://www.privacypolicies.com/live/f3493839-9aed-4582-8b43-74340eb8295f"
          className={`${isDarkTheme ? "text-white" : ""}`}
        >
          Privacy Policy
        </Link>

        <Link
          target="_blank"
          href="https://www.mars.com/cookies-english"
          className={`${isDarkTheme ? "text-white" : ""}`}
        >
          Cookie Policy
        </Link>

        <Link
          target="_blank"
          href="https://www.mars.com/legal"
          className={`${isDarkTheme ? "text-white" : ""}`}
        >
          Terms of Use
        </Link>

        <Link
          target="_blank"
          href="https://www.mars.com/accessibility"
          className={`${isDarkTheme ? "text-white" : ""}`}
        >
          Accessibility
        </Link>

        <Link
          href="#cookie-settings"
          className={`${isDarkTheme ? "text-white" : ""}`}
        >
          Cookie Settings
        </Link>
      </div>
      <div className={`${classes.copyright}`}>
        <small
          className={`text-sm text-center mb-0 pt-2 ${
            isDarkTheme ? "text-white" : ""
          }`}
        >
          Copyright ©
          {' '}
          {currentYear}
          {' '}
          {pageName}
          {' '}
          Pty Ltd | All rights reserved
        </small>
      </div>
    </footer>
  );
}
