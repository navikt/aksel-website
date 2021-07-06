import Head from "next/head";
import "../styles/prismjs.css";
import "../styles/theme.css";
import "@navikt/ds-css";
import useScrollToHashOnPageLoad from "../src/util";

const App = ({ Component, pageProps }) => {
  useScrollToHashOnPageLoad();

  // TODO: Move metadata to SEO component
  return (
    <>
      <Head>
        <title>Verktøkassen</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        {/* <meta property="og:site_name" content="NAV IT" />
  <meta property="og:url" content="https://www.design.nav.no/" /> */}
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Component {...pageProps} />
    </>
  );
};

export default App;
