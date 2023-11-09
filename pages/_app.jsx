import "../styles/globals.css";
import { Fragment } from "react";
import ThemeProvider from "@/components/Context/ThemeContext";
import { FavoritesContextProvider } from "@/components/Context/Favorites-context";
import Layout from "@/components/LayOuts/Layout";
function App({ Component, pageProps }) {
  return (
    <FavoritesContextProvider>
      {" "}
      <ThemeProvider>
        <title>Cooking Devs</title>
        <Fragment>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </Fragment>
      </ThemeProvider>
    </FavoritesContextProvider>
  );
}

export default App;
