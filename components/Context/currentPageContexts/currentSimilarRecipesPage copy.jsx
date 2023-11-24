// similarRecipesPageContext.js
import React, { createContext, useContext, useState } from "react";

const SimilarRecipesPageContext = createContext();

export const SimilarRecipesPageProvider = ({ children }) => {
  const [currentSimilarRecipesPage, setSimilarRecipesCurrentPage] = useState(1);

  return (
    <SimilarRecipesPageContext.Provider
      value={{ currentSimilarRecipesPage, setSimilarRecipesCurrentPage }}
    >
      {children}
    </SimilarRecipesPageContext.Provider>
  );
};

export const useSimilarRecipesPageContext = () => {
  return useContext(SimilarRecipesPageContext);
};
