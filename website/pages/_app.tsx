import Head from "next/head";
import React, { useEffect, useState } from "react";
import {
  AmplitudeProvider,
  PagePropsContext,
  useScrollToHashOnPageLoad,
} from "../components";
import LayoutProvider from "../components/layout/LayoutProvider";
import "../styles/index.css";
import NotFound from "./404";
import { hotjar } from "react-hotjar";

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

  useEffect(() => {
    process.env.NODE_ENV === "production" && hotjar.initialize(148751, 6);
  }, []);

  if (
    Component &&
    ["/examples", "/sandboxes"].some((path) => router?.asPath.startsWith(path))
  ) {
    return <Component {...pageProps} />;
  }

  const getLayout = Component.getLayout ?? ((page) => page);

  const notFound =
    !pageProps?.slug ||
    (!pageProps.validPath && pageProps.isDraft && !pageProps.preview) ||
    (!pageProps.validPath && !pageProps.isDraft);

  return (
    <>
      <Head>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <meta property="og:url" content={router.asPath.split("?")[0]} />
        <link rel="icon" type="image/x-icon" href="/favicon.ico" />
        <link rel="shortcut icon" type="image/x-icon" href="/favicon.ico" />
      </Head>
      <PagePropsContext.Provider value={{ pageProps: pageData, setPageData }}>
        <AmplitudeProvider>
          <LayoutProvider>
            {notFound ? (
              <NotFound />
            ) : (
              getLayout(
                <>
                  <Component {...pageProps} />
                </>
              )
            )}
          </LayoutProvider>
        </AmplitudeProvider>
      </PagePropsContext.Provider>
    </>
  );
}

export default App;
