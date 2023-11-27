// PageContext.js
import React, {
  createContext, useContext, useState, useEffect, useMemo,
} from "react";

const PageContext = createContext();

export const PageProvider = ({ children }) => {
  const [currentPage, setCurrentPage] = useState(1);
  useEffect(() => {
    const initialPage = parseInt(localStorage.getItem("lastPage"), 10) || 1;
    setCurrentPage(initialPage);
  }, []);
  // const updatePage = (newPageNumber) => {
  //   setCurrentPage(newPageNumber);
  //   localStorage.setItem('lasPage', newPageNumber.toString());
  // };
  const contextValue = useMemo(() => ({
    currentPage,
    setCurrentPage,
  }), [currentPage]);

  return (
    <PageContext.Provider value={contextValue}>
      {children}
    </PageContext.Provider>
  );
};

export const usePageContext = () => {
  const context = useContext(PageContext);
  if (!context) {
    throw new Error('usePageNumber must only be used within a page number provider');
  }
  return context;
};
