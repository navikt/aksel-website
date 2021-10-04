import React, { createContext, useContext } from "react";
import Head from "next/head";
import styled from "styled-components";
import Header from "./header/Header";
import Footer from "./Footer";
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
`;

const ContentWrapper = styled.div`
  flex-direction: column;
  width: 100%;
  position: relative;
`;

const Main = styled.main`
  min-height: calc(100vh - 48px);
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
        <title>Verktøykassen</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        {/* <meta property="og:site_name" content="NAV IT" />
  <meta property="og:url" content="https://www.design.nav.no/" /> */}
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <>
        <LayoutContext.Provider value={{ isMobile }}>
          <Header />
          <Wrapper>
            <Sidebar sidebar={pageProps.sidebar} />
            <ContentWrapper>
              <Main>{children}</Main>
              <Footer />
            </ContentWrapper>
          </Wrapper>
        </LayoutContext.Provider>
      </>
    </>
  );
};

export default Layout;
