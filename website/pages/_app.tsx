import {
  initAmplitude,
  logPageView,
  PagePropsContext,
  PreviewBanner,
  useScrollToHashOnPageLoad,
} from "@/components";
import Head from "next/head";
import React, { useEffect } from "react";
import { hotjar } from "react-hotjar";
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

  useEffect(() => {
    if (window.location.host === "design.nav.no") {
      window.location.replace(`http://aksel.nav.no${window.location.pathname}`);
      return;
    }
    const t = (e) => logPageView(e);
    initAmplitude();
    router.events.on("routeChangeComplete", t);
    window.onload = () => logPageView(window.location.pathname, true);
    return () => {
      router.events.off("routeChangeComplete", t);
    };
  }, []);

  useEffect(() => {
    hotjar.initialize(148751, 6);
  }, []);

  return (
    <>
      <Head>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <meta property="og:url" content={router.asPath.split("?")[0]} />
        <link rel="icon" href="/favicon.svg" sizes="any" type="image/svg+xml" />
        <link
          rel="shortcut icon"
          href="/favicon.svg"
          sizes="any"
          type="image/svg+xml"
        />
      </Head>
      {pageProps?.preview && <PreviewBanner />}
      <PagePropsContext.Provider value={{ pageProps }}>
        {/* <AuthProvider></AuthProvider> */}
        <Component {...pageProps} />
      </PagePropsContext.Provider>
    </>
  );
}

export default App;
