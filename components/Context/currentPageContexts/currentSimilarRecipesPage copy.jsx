// similarRecipesPageContext.js
import React, {
  createContext, useContext, useState, useMemo, useEffect,
} from "react";

const SimilarRecipesPageContext = createContext();

export const SimilarRecipesPageProvider = ({ children }) => {
  const [currentSimilarRecipesPage, setSimilarRecipesCurrentPage] = useState(1);

  useEffect(() => {
    // Access localStorage only on the client side
    const initialPageNumber = parseInt(localStorage.getItem('lastPage'), 10) || 1;
    setSimilarRecipesCurrentPage(initialPageNumber);
  }, []);

  // const updatePageNumber = (newPageNumber) => {
  //   setSimilarRecipesCurrentPage(newPageNumber);
  //   localStorage.setItem('lastPage', newPageNumber.toString());
  // };

  const contextValue = useMemo(() => ({
    currentSimilarRecipesPage,
    setSimilarRecipesCurrentPage,
    // updatePageNumber,
  }), [currentSimilarRecipesPage]);

  return (
    <SimilarRecipesPageContext.Provider
      value={contextValue}
    >
      {children}
    </SimilarRecipesPageContext.Provider>
  );
};

export const useSimilarRecipesPageContext = () => {
  const context = useContext(SimilarRecipesPageContext);
  if (!context) {
    throw new Error('usePageNumber must only be used within a page number provider');
  }

  return context;
};
