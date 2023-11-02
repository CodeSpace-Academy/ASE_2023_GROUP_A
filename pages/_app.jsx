import "../styles/globals.css";
import { useRouter } from "next/router";
import { Fragment } from "react";
import Footer from "@/components/LayOuts/footer/Footer";
import Navigation from "@/components/LayOuts/Header/Navigation";
import { ThemeProvider } from "next-themes";

function App({ Component, pageProps }) {
  const router = useRouter();

  return (
    <>
      <div className="mainBody">
        <Fragment>
          <ThemeProvider enableSystem={true} attribute="class">
            {router.pathname !== "/" && <Navigation />}

            <Component className="flexpage" {...pageProps} />
          </ThemeProvider>
        </Fragment>
      </div>

      <Footer />
    </>
  );
}

export default App;
