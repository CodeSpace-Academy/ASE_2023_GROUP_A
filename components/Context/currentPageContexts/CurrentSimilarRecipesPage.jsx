import React, { createContext, useContext, useState, useMemo, useEffect } from "react";
import { useRouter } from "next/router";

/**
 * Context for managing the state of the current similar recipes page.
 * @type {React.Context}
 */
const SimilarRecipesPageContext = createContext();

/**
 * Provider component for the SimilarRecipesPageContext.
 * @param {Object} props - Component properties.
 * @param {React.ReactNode} props.children - The children components.
 */
export const SimilarRecipesPageProvider = ({ children }) => {
  const isServer = typeof window === "undefined";

  /**
   * State for the current similar recipes page.
   * @type {[number, React.Dispatch<React.SetStateAction<number>>]}
   */
  const [currentSimilarRecipesPage, setSimilarRecipesCurrentPage] = useState(
    isServer ? 1 : parseInt(localStorage.getItem("lastSimilarPage") || 1, 10),
  );

  const router = useRouter();

  useEffect(() => {
    // Update local storage with the current page number.
    if (!isServer) {
      localStorage.setItem("lastSimilarPage", currentSimilarRecipesPage.toString());
    }
  }, [currentSimilarRecipesPage]);

  /**
   * Function to update the current page number.
   * @param {number} newPageNumber - The new page number.
   */
  const updatePageNumber = (newPageNumber) => {
    setSimilarRecipesCurrentPage(() => {
      localStorage.setItem("lastSimilarPage", newPageNumber.toString());
      if (!isServer) {
        localStorage.setItem("lastSimilarPage", newPageNumber.toString());
      }
      return newPageNumber;
    });
  };

  /**
   * Function to go back to the previous page.
   */
  const goBack2 = () => {
    const pageNumber = parseInt(localStorage.getItem("lastSimilarPage"), 10);
    if (pageNumber >= 1) {
      setSimilarRecipesCurrentPage(pageNumber);
      router.back();
    }
  };

  /**
   * The value of the context, memoized to avoid unnecessary re-renders.
   * @type {Object}
   * @property {number} currentSimilarRecipesPage - The current similar recipes page number.
   * @property {Function} updatePageNumber - Function to update the page number.
   * @property {Function} setSimilarRecipesCurrentPage - Function to set the current page number.
   * @property {Function} goBack2 - Function to go back to the previous page.
   */
  const contextValue = useMemo(
    () => ({
      currentSimilarRecipesPage,
      updatePageNumber,
      setSimilarRecipesCurrentPage,
      goBack2,
    }),
    [currentSimilarRecipesPage, updatePageNumber, goBack2],
  );

  return (
    <SimilarRecipesPageContext.Provider value={contextValue}>
      {children}
    </SimilarRecipesPageContext.Provider>
  );
};

/**
 * Hook to use the SimilarRecipesPageContext.
 * @returns {Object} - The context value.
 * @throws {Error} - Throws an error if used outside a SimilarRecipesPageProvider.
 */
const useSimilarRecipesPageContext = () => {
  const context = useContext(SimilarRecipesPageContext);
  if (!context) {
    throw new Error('useSimilarRecipesPageContext must only be used within a SimilarRecipesPageProvider');
  }

  return context;
};

export default useSimilarRecipesPageContext;
