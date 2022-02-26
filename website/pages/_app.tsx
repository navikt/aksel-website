import Head from "next/head";
import React, { useEffect, useState } from "react";
import {
  AmplitudeProvider,
  PagePropsContext,
  useScrollToHashOnPageLoad,
} from "../components";
import "../styles/index.css";

function App({
  Component,
  pageProps,
  router,
}: {
  Component: any;
  pageProps: any;
  router: any;
}): JSX.Element {
  const [pageData, setPageData] = useState(null);

  useScrollToHashOnPageLoad();

  useEffect(() => {
    setPageData(pageProps);
  }, [pageProps]);

  const getLayout = Component.getLayout ?? ((page) => page);

  return (
    <>
      <Head>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <meta property="og:url" content={router.asPath.split("?")[0]} />
        <link rel="icon" type="image/x-icon" href="/favicon.ico" />
        <link rel="shortcut icon" type="image/x-icon" href="/favicon.ico" />
      </Head>
      <PagePropsContext.Provider value={{ pageProps: pageData }}>
        <AmplitudeProvider>
          {getLayout(<Component {...pageProps} />)}
        </AmplitudeProvider>
      </PagePropsContext.Provider>
    </>
  );
}

export default App;
