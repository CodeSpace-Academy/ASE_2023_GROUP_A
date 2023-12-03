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
  const [currentPage, setCurrentPage] = useState(
    isServer ? 1 : parseInt(localStorage.getItem("lastPage") || 1, 10),
  );

  const router = useRouter();

  useEffect(() => {
    if (!isServer) {
      localStorage.setItem("lastPage", currentPage.toString());
    }
  }, [currentPage]);

  const updatePage = (newPageNumber) => {
    setCurrentPage(() => {
      localStorage.setItem("lastPage", newPageNumber.toString());
      if (!isServer) {
        localStorage.setItem("lastPage", newPageNumber.toString());
      }
      return newPageNumber;
    });
  };

  const goBack = () => {
    const pageNumber = parseInt(localStorage.getItem("lastPage"), 10);
    if (pageNumber > 1) {
      updatePage(pageNumber);
      router.back();
    }
  };
  const api = `/api/recipes?page=${currentPage}`;

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

export const usePageContext = () => {
  const context = useContext(PageContext);
  if (!context) {
    throw new Error(
      "usePageNumber must only be used within a page number provider",
    );
  }
  return context;
};
