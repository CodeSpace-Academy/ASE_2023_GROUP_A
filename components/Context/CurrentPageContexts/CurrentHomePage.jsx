// PageContext.js
import React, {
  createContext, useContext, useState, useMemo, useEffect,
} from "react";
import { useRouter } from "next/router";

/**
 * Context for managing the state of the current page.
 * @type {React.Context}
 */
const PageContext = createContext();

/**
 * Provider component for the PageContext.
 * @param {Object} props - Component properties.
 * @param {React.ReactNode} props.children - The children components.
 */
export const PageProvider = ({ children }) => {
  const isServer = typeof window === "undefined";

  /**
   * State for the current page.
   * @type {[number, React.Dispatch<React.SetStateAction<number>>]}
   */
  const [currentPage, setCurrentPage] = useState(
    isServer ? 1 : parseInt(localStorage.getItem("lastPage") || 1, 10),
  );

  const router = useRouter();

  useEffect(() => {
    if (!isServer) {
      localStorage.setItem("lastPage", currentPage.toString());
    }
  }, [currentPage]);

  /**
   * Function to update the current page number.
   * @param {number} newPageNumber - The new page number.
   */
  const updatePage = (newPageNumber) => {
    setCurrentPage(() => {
      // Update local storage with the new page number.
      localStorage.setItem("lastPage", newPageNumber.toString());
      if (!isServer) {
        localStorage.setItem("lastPage", newPageNumber.toString());
      }
      return newPageNumber;
    });
  };

  /**
   * Function to go back to the previous page.
   */
  const goBack = () => {
    const pageNumber = parseInt(localStorage.getItem("lastPage"), 10);
    if (pageNumber >= 1) {
      updatePage(pageNumber);
      router.back();
    }
  };

  /**
   * API endpoint for fetching recipes based on the current page.
   * @type {string}
   */
  const api = `/api/recipes?page=${currentPage}`;

  /**
   * The value of the context, memoized to avoid unnecessary re-renders.
   * @type {Object}
   * @property {number} currentPage - The current page number.
   * @property {Function} updatePage - Function to update the page number.
   * @property {Function} goBack - Function to go back to the previous page.
   * @property {string} api - API endpoint for fetching recipes based on the current page.
   */
  const contextValue = useMemo(
    () => ({
      currentPage,
      updatePage,
      goBack,
      api,
    }),
    [api, currentPage, updatePage, goBack],
  );

  return (
    <PageContext.Provider value={contextValue}>{children}</PageContext.Provider>
  );
};

/**
 * Hook to use the PageContext.
 * @returns {Object} - The context value.
 * @throws {Error} - Throws an error if used outside a PageProvider.
 */
export const usePageContext = () => {
  const context = useContext(PageContext);
  if (!context) {
    throw new Error('usePageContext must only be used within a PageProvider');
  }
  return context;
};
