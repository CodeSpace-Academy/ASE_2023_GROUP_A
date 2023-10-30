import "../styles/globals.css";
import { useRouter } from "next/router";
import { Fragment } from "react";
import Navigation from "@/components/LayOuts/Header/Navigation";
import { ThemeProvider } from "next-themes";
import { FavoritesContextProvider } from "@/store/Favorites-context";

function App({ Component, pageProps }) {
  const router = useRouter();

  return (
    <FavoritesContextProvider>
      {" "}
      <Fragment>
        <ThemeProvider enableSystem={true} attribute="class">
          {router.pathname !== "/" && <Navigation />}
          <Component {...pageProps} />
        </ThemeProvider>
      </Fragment>
    </FavoritesContextProvider>
  );
}

export default App;
