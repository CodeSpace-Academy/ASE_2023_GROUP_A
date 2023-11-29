// PageContext.js
import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useMemo,
} from "react";
import { useRouter } from "next/router";
const PageContext = createContext();

export const PageProvider = ({ children }) => {
  const isServer = typeof window === "undefined";
  const [currentPage, setCurrentPage] = useState(
    isServer ? 1 : parseInt(localStorage.getItem("lastPage") || 1)
  );
  // const [currentApiRout, setCurrentApiRout] = useState(
  //   `/api/recipes?page=${currentPage}`
  // );
  const router = useRouter();

  const api = `/api/recipes?page=${currentPage}`;

const updatePage = (newPageNumber) => {
  setCurrentPage((prevPage) => {
    console.log("Updating page number:", newPageNumber);
    console.log("PREVIOUS PAGE Number:", prevPage);
    console.log("API:", `/api/recipes?page=${newPageNumber}`);
    localStorage.setItem("lastPage", newPageNumber.toString());
    if (!isServer) {
      localStorage.setItem("lastPage", newPageNumber.toString());
    }
    return newPageNumber;
  });
};

  // useEffect(() => {
  //   // console.log("CURRENT PAGE API:", currentApiRout);
  //   const initialPage = parseInt(localStorage.getItem("lastPage"));
  //   updatePage(initialPage);
  // }, []);

  // useEffect(() => {
  //   setCurrentApiRout(`/api/recipes?page=${currentPage}`);
  //   console.log("CURRENT PAGE API:", currentApiRout);
  // }, [currentPage, setCurrentApiRout]);

  // useEffect(() => {
  //   updatePage(currentPage)
  // }, [currentPage])

  const goBack = () => {
    const pageNumber = parseInt(localStorage.getItem("lastPage"));
    if (pageNumber > 1) {
      console.log("CURRENT PAGE Number FROM CONTEXT:", pageNumber);
      console.log("CURRENT ROUTER FROM CONTEXT:", router);
      updatePage(pageNumber);
      router.push("/");
    }
  };

  const contextValue = useMemo(
    () => ({
      currentPage,
      setCurrentPage,
      updatePage,
      goBack,
      api,
    }),
    [currentPage]
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
