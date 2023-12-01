// PageContext.js
import React, {
  createContext,
  useContext,
  useState,
  useMemo,
  useEffect,
} from "react";
import { useRouter } from "next/router";

const PageContext = createContext();

export const PageProvider = ({ children }) => {
  const isServer = typeof window === "undefined";
  // const isFiltered = isServer
  //   ? 1
  //   : parseInt(localStorage.getItem("isFiltered")) || 0;
  const [currentPage, setCurrentPage] = useState(
    isServer ? 1 : parseInt(localStorage.getItem("lastPage") || 1)
  );
  const [filteredPage, setFilteredPage] = useState(
    isServer ? 1 : parseInt(localStorage.getItem("lastFilteredPage") || 1)
  );
  const [filtered, setFiltered] = useState(false);
  const router = useRouter();

  const updateFilters = (isFiltered) => {
    setFiltered((prev) => {
      if (!isServer) {
        localStorage.setItem("isFiltered", isFiltered);
      }
      return isFiltered;
    });
  };

  useEffect(() => {
    if (!isServer) {
      localStorage.setItem("lastPage", currentPage.toString());
      localStorage.setItem("lastFilteredPage", filteredPage.toString());
    }
  }, [currentPage, filteredPage]);

  const updatePage = (newPageNumber) => {
    updateFilters(false);
    setCurrentPage((prevPage) => {
      localStorage.setItem("lastPage", newPageNumber.toString());
      if (!isServer) {
        updateFilters(false);
        localStorage.setItem("lastPage", newPageNumber.toString());
      }
      return newPageNumber;
    });
  };

  const updateFilteredPage = (newPageNumber) => {
    updateFilters(true);
    setFilteredPage((prevPage) => {
      localStorage.setItem("lastFilteredPage", newPageNumber.toString());
      updateFilters(true);
      if (!isServer) {
        localStorage.setItem("lastFilteredPage", newPageNumber.toString());
        true;
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
  const api = `/api/recipes?page=${filtered ? filteredPage : currentPage}`;

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
