import Error from "next/error";
import Head from "next/head";
import React, { createContext, useEffect, useState } from "react";
import { AmplitudeProvider, useScrollToHashOnPageLoad } from "../components";
import LayoutProvider from "../components/layout/LayoutProvider";
import "../styles/index.css";

type PagePropsContextT = {
  pageProps: any;
  setPageData: React.Dispatch<any>;
};

export const PagePropsContext = createContext<PagePropsContextT>(null);

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

  if (Component && router?.asPath.startsWith("/examples")) {
    return <Component {...pageProps} />;
  }

  if (
    !pageProps?.slug ||
    (!pageProps.validPath && pageProps.isDraft && !pageProps.preview) ||
    (!pageProps.validPath && !pageProps.isDraft)
  ) {
    return <Error statusCode={404} />;
  }

  const getLayout = Component.getLayout ?? ((page) => page);

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
            {getLayout(
              <>
                <Component {...pageProps} />
              </>
            )}
          </LayoutProvider>
        </AmplitudeProvider>
      </PagePropsContext.Provider>
    </>
  );
}

export default App;
