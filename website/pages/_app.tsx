import Head from "next/head";
import React, { useEffect } from "react";
import {
  initAmplitude,
  logPageView,
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
  useScrollToHashOnPageLoad();

  const getLayout = Component.getLayout ?? ((page) => page);

  useEffect(() => {
    const t = (e) => logPageView(e);
    initAmplitude();
    router.events.on("routeChangeComplete", t);
    window.onload = () => logPageView(window.location.pathname, true);
    return () => {
      router.events.off("routeChangeComplete", t);
    };
  }, []);

  return (
    <>
      <Head>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <meta property="og:url" content={router.asPath.split("?")[0]} />
        <link rel="icon" type="image/x-icon" href="/favicon.ico" />
        <link rel="shortcut icon" type="image/x-icon" href="/favicon.ico" />
      </Head>
      <PagePropsContext.Provider value={{ pageProps }}>
        {getLayout(<Component {...pageProps} />)}
      </PagePropsContext.Provider>
    </>
  );
}

export default App;
