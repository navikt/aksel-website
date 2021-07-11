import "../styles/prismjs.css";
import "../styles/theme.css";
import "@navikt/ds-css";
import useScrollToHashOnPageLoad from "../src/util";
import React, { createContext, useLayoutEffect, useState } from "react";
import Layout from "../components/templating/layout/Layout";
import slugger from "../components/slugger";
import { useRouter } from "next/router";
import Error from "next/error";
export const PagePropsContext = createContext<any[]>([]);

function App({
  Component,
  pageProps,
}: {
  Component: any;
  pageProps: any;
}): JSX.Element {
  useScrollToHashOnPageLoad();
  const router = useRouter();
  const [pageData, setPageData] = useState(null);

  useLayoutEffect(() => {
    setPageData(pageProps);
  }, []);

  slugger.reset();

  if (!router.isFallback && !pageProps?.slug) {
    return <Error statusCode={404} />;
  }

  if (router.isFallback) {
    return <div>Laster...</div>;
  }

  return (
    <PagePropsContext.Provider value={[pageData, setPageData]}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </PagePropsContext.Provider>
  );
}

export default App;
