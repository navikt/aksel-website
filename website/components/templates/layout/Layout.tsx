import React, { createContext, useContext, useState } from "react";
import Head from "next/head";
import styled from "styled-components";
import Header from "./header/Header";
import Footer from "./Footer";
import { PagePropsContext } from "../../../pages/_app";
import DesignsystemSidebar from "./sidebar/DesignsystemSidebar";
import { useMedia } from "react-use";
import { Feedback } from "../..";
import { useClientLayoutEffect } from "@navikt/ds-react";
import DesignsystemHeader from "./header/DesignsystemHeader";
import GodPraksisHeader from "./header/GodPraksisHeader";
import Sidebar from "./sidebar/Sidebar";
import { DsNavigationHeadingT } from "../../../lib";
import RelatedPagesLink from "../../related-pages-link";

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
  min-height: calc(100vh - 64px);
  display: flex;
  flex-direction: column;
  width: 100%;
`;

export type LayoutContextProps = {
  isMobile: boolean;
  version: "ds" | "gp";
  activeHeading?: DsNavigationHeadingT;
};

const PlaceholderPadding = styled.div`
  width: 288px;
  padding: var(--navds-spacing-8) 0;
  position: relative;
  flex-shrink: 0;
  background-color: white;
  position: sticky;
  top: 0;
  align-self: flex-start;
  overflow-y: auto;
  height: 100vh;

  @media (max-width: 1064px) {
    display: none;
  }
`;

const Grow = styled.div`
  flex: 1 1;
  height: 100%;
  margin-bottom: auto;
`;

export const LayoutParts = {
  ds: {
    title: "Designsystemet",
    header: DesignsystemHeader,
    sidebar: DesignsystemSidebar,
  },
  gp: {
    title: "God Praksis",
    header: GodPraksisHeader,
    sidebar: PlaceholderPadding,
  },
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
      <div style={{ position: "relative" }}>
        <LayoutContext.Provider
          value={{ isMobile, version: pageType, activeHeading }}
        >
          <Header />
          <Wrapper>
            <Sidebar />
            <ContentWrapper>
              <Main>
                {children}
                <Grow />
                <Feedback docId={pageProps?.page?._id} />
                {LayoutParts[pageType]?.title === "Designsystemet" && (
                  <RelatedPagesLink />
                )}
              </Main>
              {/* {!pageProps?.preview && <Feedback docId={pageProps?.page?._id} />} */}

              <Footer />
            </ContentWrapper>
          </Wrapper>
        </LayoutContext.Provider>
      </div>
    </>
  );
};

export default Layout;
