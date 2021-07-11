import React, { useContext } from "react";
import Head from "next/head";
import styled from "styled-components";
import Heading from "./Heading";
import Sidebar from "./Sidebar";
import { PagePropsContext } from "../../../pages/_app";

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

const Layout = ({ children }: { children: React.ReactNode }): JSX.Element => {
  const [pageProps] = useContext<any>(PagePropsContext);
  if (!pageProps) {
    return null;
  }

  // TODO: Move metadata to SEO component
  return (
    <>
      <Head>
        <title>Verktøkassen</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        {/* <meta property="og:site_name" content="NAV IT" />
  <meta property="og:url" content="https://www.design.nav.no/" /> */}
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <>
        <Heading />
        <Wrapper>
          {pageProps.sidebar && <Sidebar sidebar={pageProps.sidebar} />}
          <MainContent>{children}</MainContent>
        </Wrapper>
      </>
    </>
  );
};

export default Layout;
