import "../styles/prismjs.css";
import "../styles/theme.css";
import "@navikt/ds-css";
import useScrollToHashOnPageLoad from "../src/util";
import React, { createContext } from "react";
import styled from "styled-components";
import Layout from "../components/templating/layout/Layout";

export const PagePropsContext = createContext({});

const App = ({ Component, pageProps }) => {
  useScrollToHashOnPageLoad();

  return (
    <PagePropsContext.Provider value={pageProps}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </PagePropsContext.Provider>
  );
};

export default App;
