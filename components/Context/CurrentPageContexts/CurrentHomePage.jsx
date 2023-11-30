// PageContext.js
import React, { createContext, useContext, useState, useMemo } from "react";
import { useRouter } from "next/router";

const PageContext = createContext();

export const PageProvider = ({ children }) => {
  const isServer = typeof window === "undefined";
  const [currentPage, setCurrentPage] = useState(
    isServer ? 1 : parseInt(localStorage.getItem("lastPage") || 1)
  );
  const [filteredPage, setFilteredPage] = useState(
    isServer ? 1 : parseInt(localStorage.getItem("lastFilteredPage") || 1)
  );

  const router = useRouter();

  const api = `/api/recipes?page=${currentPage}`;

  const updatePage = (newPageNumber) => {
    setCurrentPage((prevPage) => {
      localStorage.setItem("lastPage", newPageNumber.toString());
      if (!isServer) {
        localStorage.setItem("lastPage", newPageNumber.toString());
      }
      return newPageNumber;
    });
  };

  const updateFilteredPage = (newPageNumber) => {
    setFilteredPage((prevPage) => {
      localStorage.setItem("lastFilteredPage", newPageNumber.toString());
      if (!isServer) {
        localStorage.setItem("lastFilteredPage", newPageNumber.toString());
      }
      return newPageNumber;
    });
  };

  const goBack = () => {
    const pageNumber = parseInt(localStorage.getItem("lastPage"));
    if (pageNumber > 1) {
      updatePage(pageNumber);
      router.push("/");
    }
  };

  const contextValue = useMemo(
    () => ({
      currentPage,
      setCurrentPage,
      updatePage,
      filteredPage,
      setFilteredPage,
      updateFilteredPage,
      goBack,
      api,
    }),
    [currentPage, filteredPage]
  );

  return (
    <PageContext.Provider value={contextValue}>{children}</PageContext.Provider>
  );
};

export const usePageContext = () => {
  const context = useContext(PageContext);
  if (!context) {
    throw new Error(
      "usePageNumber must only be used within a page number provider"
    );
  }
  return context;
};
