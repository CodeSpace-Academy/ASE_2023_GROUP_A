import "../styles/globals.css";
import "react-toastify/dist/ReactToastify.css";
import { PageProvider } from "../components/Context/CurrentPageContexts/CurrentHomePage";
import { SimilarRecipesPageProvider } from "../components/Context/CurrentPageContexts/CurrentSimilarRecipesPage";
import { Fragment } from "react";

import { ToastContainer } from "react-toastify";

import { FavoritesContextProvider } from "../components/Context/Favorites-context";
import ThemeProvider from "../components/Context/ThemeContext";
import Layout from "../components/LayOuts/Layout";

function App({ Component, pageProps }) {
  return (
    <FavoritesContextProvider>
      {" "}
      <ThemeProvider>
        <title>Cooking Devs</title>
        <Fragment>
          <PageProvider>
            <SimilarRecipesPageProvider>
              <Layout>
                <Component {...pageProps} />
                <ToastContainer
                  position="bottom-right"
                  autoClose={3000}
                  hideProgressBar={false}
                />
              </Layout>
            </SimilarRecipesPageProvider>
          </PageProvider>
        </Fragment>
      </ThemeProvider>
    </FavoritesContextProvider>
  );
}

export default App;
