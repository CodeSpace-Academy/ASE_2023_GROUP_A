import "../styles/globals.css";
import { Fragment } from "react";
import Navigation from "@/components/LayOuts/Header/Navigation";
import { ThemeProvider } from 'next-themes'


 function App({ Component, pageProps }) {
  return (
    <Fragment>
      <ThemeProvider enableSystem={true} attribute="class" >
      <Navigation/>
        <Component {...pageProps} />
      </ThemeProvider>
    </Fragment>
  );
}
export default App;