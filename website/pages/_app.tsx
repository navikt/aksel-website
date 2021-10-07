import "nav-frontend-tabell-style/dist/main.css";
import "@navikt/ds-css";
import "@navikt/ds-css-internal";
import "../styles/prismjs.css";
import "../styles/theme.css";
import { AmplitudeProvider, useScrollToHashOnPageLoad } from "../components";
import React, { createContext, useEffect, useState } from "react";
import Layout from "../components/templates/layout/Layout";
import { slugger } from "../components";
import { useRouter } from "next/router";
import Error from "next/error";
import styled from "styled-components";
import { Label, Loader } from "@navikt/ds-react";

export const PagePropsContext = createContext<any[]>([]);

const StyledLoader = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  justify-content: center;
  align-items: center;
`;

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

  useEffect(() => {
    setPageData(pageProps);
  }, []);

  slugger.reset();

  if (!router.isFallback && !pageProps?.slug) {
    return <Error statusCode={404} />;
  }

  if (router.isFallback) {
    return (
      <StyledLoader>
        <Loader size="2xlarge" aria-label="Laster inn preview-side" />
        <Label>Laster inn preview innhold...</Label>
      </StyledLoader>
    );
  }

  return (
    <AmplitudeProvider>
      <PagePropsContext.Provider value={[pageData, setPageData]}>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </PagePropsContext.Provider>
    </AmplitudeProvider>
  );
}

export default App;
