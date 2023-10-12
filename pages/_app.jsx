import "../styles/globals.css";
import HeaderLayout from "../components/LayOuts/Header/HeaderLayout";
import { Fragment } from "react";
export default function App({ Component, pageProps }) {
  return (
    <Fragment>
      <HeaderLayout>
        <Component {...pageProps} />
      </HeaderLayout>
    </Fragment>
  );
}
