import { Loader } from "@navikt/ds-react";
import Error from "next/error";
import React, { createContext, useEffect, useState } from "react";
import styled from "styled-components";
import {
  AmplitudeProvider,
  Layout,
  slugger,
  useScrollToHashOnPageLoad,
} from "../components";
import "../styles/index.css";

const ScLoader = styled.div`
  width: 100vw;
  height: 100vh;
  position: absolute;
  top: 0;
  left: 0;
  background-color: white;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 1rem;
`;

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

  if (
    !pageProps?.slug ||
    (!pageProps.validPath && pageProps.isDraft && !router.query.preview) ||
    (!pageProps.validPath && !pageProps.isDraft)
  ) {
    return <Error statusCode={404} />;
  }

  return (
    <AmplitudeProvider>
      <PagePropsContext.Provider value={{ pageProps: pageData, setPageData }}>
        <Layout>
          <Component {...pageProps} />
        </Layout>
        {router.query.preview && !pageData.page && (
          <ScLoader>
            <Loader title="Laster inn innhold for preview" size="2xlarge" />
            Laster inn innhold for preview...
          </ScLoader>
        )}
      </PagePropsContext.Provider>
    </AmplitudeProvider>
  );
}

export default App;
