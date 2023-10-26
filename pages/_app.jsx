import "../styles/globals.css";
import { useRouter } from 'next/router';
import { Fragment } from "react";
import Footer from "@/components/LayOuts/footer/Footer";
import Navigation from "@/components/LayOuts/Header/Navigation";
import { ThemeProvider } from 'next-themes'

function App({ Component, pageProps }) {

  const router = useRouter();

  return (
    <Fragment>
      <ThemeProvider enableSystem={true} attribute="class">
        {router.pathname !== '/' && <Navigation />}
        <Component {...pageProps} />
      </ThemeProvider>
      <Footer/>
    </Fragment>
  );
}

export default App;
