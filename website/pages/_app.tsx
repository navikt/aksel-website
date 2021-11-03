import Error from "next/error";
import React, { createContext, useEffect, useState } from "react";
import {
  AmplitudeProvider,
  Layout,
  slugger,
  useScrollToHashOnPageLoad,
} from "../components";
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
  }, []);

  useEffect(() => {
    slugger.reset();
  });

  /* Is example */
  if (Component && router?.asPath.startsWith("/examples")) {
    return (
      <AmplitudeProvider>
        <Component {...pageProps} />
      </AmplitudeProvider>
    );
  }

  if (Component && router?.asPath.startsWith("/admin")) {
    return <Component {...pageProps} />;
  }

  if (!pageProps?.slug) {
    return <Error statusCode={404} />;
  }

  return (
    <AmplitudeProvider>
      <PagePropsContext.Provider value={{ pageProps: pageData, setPageData }}>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </PagePropsContext.Provider>
    </AmplitudeProvider>
  );
}

export default App;
