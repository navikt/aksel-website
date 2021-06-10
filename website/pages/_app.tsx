import Head from "next/head";

import "@navikt/ds-css";
import useScrollToHashOnPageLoad from "../src/util";

const App = ({ Component, pageProps }) => {
  useScrollToHashOnPageLoad();
  <Head>
    <meta name="viewport" content="initial-scale=1.0, width=device-width" />
    {/* <meta property="og:site_name" content="NAV IT" />
    <meta property="og:url" content="https://www.detsombetyrnoe.no/" /> */}
    <link
      href="https://www.nav.no/dekoratoren/media/favicon.ico"
      rel="icon"
      type="image/x-icon"
    />
  </Head>;
  return <Component {...pageProps} />;
};

export default App;
