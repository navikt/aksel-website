import Head from "next/head";
import "../styles/prismjs.css";
import "../styles/theme.css";
import "@navikt/ds-css";
import useScrollToHashOnPageLoad from "../src/util";
import React, { createContext } from "react";
import Heading from "../components/templating/layout/Heading";
import Sidebar from "../components/templating/layout/Sidebar";
import styled from "styled-components";
import Layout from "../components/templating/layout/Layout";

const Wrapper = styled.div`
  display: flex;
  margin-top: 56px;
  min-height: calc(100vh - 56px);

  @media (max-width: 1068px) {
    display: block;
  }
`;

const MainContent = styled.main`
  flex-direction: column;
  width: 100%;
  position: relative;
  background-color: #f7f7f7;
  background-color: #f9f9f9;
  background-color: #fafafa;
`;

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
