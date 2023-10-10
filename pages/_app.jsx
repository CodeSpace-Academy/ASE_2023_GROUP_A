import "../styles/globals.css";
import HeaderLayout from "../components/LayOuts/Header/HeaderLayout";
export default function App({ Component, pageProps }) {
  return (
    <>
      <HeaderLayout>
        <Component {...pageProps} />
      </HeaderLayout>
    </>
  );
}
