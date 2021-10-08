import React, { createContext, useContext, useState } from "react";
import Head from "next/head";
import styled from "styled-components";
import Header from "./header/Header";
import Footer from "./Footer";
import { PagePropsContext } from "../../../pages/_app";
import Sidebar from "./sidebar/Sidebar";
import { useMedia } from "react-use";
import { Feedback } from "../..";
import { DsNavigationHeadingT } from "../../../lib";
import { useClientLayoutEffect } from "@navikt/ds-react";

const Wrapper = styled.div`
  display: flex;
  min-height: calc(100vh - 56px);
  justify-content: center;
  background-color: #ffffff;
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
  version: "ds" | "gp";
  activeHeading?: DsNavigationHeadingT;
};

export const LayoutContext = createContext<LayoutContextProps | null>(null);

// TODO: Move metadata to SEO component
const Layout = ({ children }: { children: React.ReactNode }): JSX.Element => {
  const [pageProps] = useContext<any>(PagePropsContext);
  const [activeHeading, setActiveHeading] = useState<
    DsNavigationHeadingT | undefined
  >();

  const isMobile = useMedia("(max-width: 1064px)");
  const pageType = pageProps?.page?._type?.split("_")[0];

  useClientLayoutEffect(() => {
    setActiveHeading(
      pageProps?.navigation?.headings.find((heading) =>
        heading.menu.find(
          (item) => item.link.slug.current === pageProps?.page?.slug
        )
      )
    );
  }, [pageProps?.navigation]);

  if (!pageProps) {
    return null;
  }
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
        <LayoutContext.Provider
          value={{ isMobile, version: pageType, activeHeading }}
        >
          <Header />
          <Wrapper>
            <Sidebar />
            <ContentWrapper>
              <Main>{children}</Main>
              <Feedback docId={pageProps?.page?._id} />
              <Footer />
            </ContentWrapper>
          </Wrapper>
        </LayoutContext.Provider>
      </>
    </>
  );
};

export default Layout;
