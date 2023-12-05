// similarRecipesPageContext.js
import React, {
  createContext, useContext, useState, useMemo, useEffect,
} from "react";
import { useRouter } from "next/router";

const SimilarRecipesPageContext = createContext();

export const SimilarRecipesPageProvider = ({ children }) => {
  const isServer = typeof window === "undefined";

  const [currentSimilarRecipesPage, setSimilarRecipesCurrentPage] = useState(
    isServer ? 1 : parseInt(localStorage.getItem("lastSimilarPage") || 1, 10),
  );

  const router = useRouter();

  useEffect(() => {
    if (!isServer) {
      localStorage.setItem("lastSimilarPage", currentSimilarRecipesPage.toString());
    }
  }, [currentSimilarRecipesPage]);

  const updatePageNumber = (newPageNumber) => {
    setSimilarRecipesCurrentPage(() => {
      localStorage.setItem("lastSimilarPage", newPageNumber.toString());
      if (!isServer) {
        localStorage.setItem("lastSimilarPage", newPageNumber.toString());
      }
      return newPageNumber;
    });
  };

  const goBack2 = () => {
    const pageNumber = parseInt(localStorage.getItem("lastSimilarPage"), 10);
    if (pageNumber >= 1) {
      setSimilarRecipesCurrentPage(pageNumber);
      router.back();
    }
  };

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
    <SimilarRecipesPageContext.Provider
      value={contextValue}
    >
      {children}
    </SimilarRecipesPageContext.Provider>
  );
};

const useSimilarRecipesPageContext = () => {
  const context = useContext(SimilarRecipesPageContext);
  if (!context) {
    throw new Error('usePageNumber must only be used within a page number provider');
  }

  return context;
};
export default useSimilarRecipesPageContext;
