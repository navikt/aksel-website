import React, { createContext, useContext } from "react";
import Head from "next/head";
import styled from "styled-components";
import Heading from "./Heading";
import { PagePropsContext } from "../../../pages/_app";
import Sidebar from "./Sidebar";
import { useMedia } from "react-use";

const Wrapper = styled.div`
  display: flex;
  min-height: calc(100vh - 56px);
  justify-content: center;
  background-color: #f7f7f7;
  background-color: #f9f9f9;
  background-color: #fafafa;

  /* @media (max-width: 1068px) {
    display: block;
  } */
`;

const MainContent = styled.main`
  flex-direction: column;
  width: 100%;
  position: relative;
`;

export type LayoutContextProps = {
  isMobile: boolean;
};

export const LayoutContext = createContext<LayoutContextProps | null>(null);

// TODO: Move metadata to SEO component
const Layout = ({ children }: { children: React.ReactNode }): JSX.Element => {
  const [pageProps] = useContext<any>(PagePropsContext);
  if (!pageProps) {
    return null;
  }

  const isMobile = useMedia("(max-width: 970px)");

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
        <LayoutContext.Provider value={{ isMobile }}>
          <Heading />
          <Wrapper>
            <Sidebar sidebar={pageProps.sidebar} />
            <MainContent>{children}</MainContent>
          </Wrapper>
        </LayoutContext.Provider>
      </>
    </>
  );
};

export default Layout;
