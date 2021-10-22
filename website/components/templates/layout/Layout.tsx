import React, { createContext, useContext, useState } from "react";
import Head from "next/head";
import styled from "styled-components";
import Header from "./header/Header";
import Footer from "./Footer";
import { PagePropsContext } from "../../../pages/_app";
import DesignsystemSidebar from "./sidebar/DesignsystemSidebar";
import { useMedia } from "react-use";
import { Feedback, RelatedPagesLink } from "../..";
import { useClientLayoutEffect } from "@navikt/ds-react";
import DesignsystemHeader from "./header/DesignsystemHeader";
import GodPraksisHeader from "./header/GodPraksisHeader";
import Sidebar from "./sidebar/Sidebar";
import { DsNavigationHeadingT } from "../../../lib";

const ScWrapper = styled.div`
  display: flex;
  min-height: calc(100vh - var(--header-height));
  justify-content: center;
  background-color: #ffffff;
`;

const ScContentWrapper = styled.div`
  flex-direction: column;
  width: 100%;
  position: relative;
`;

const ScMain = styled.main`
  min-height: calc(100vh - var(--header-height));
  display: flex;
  flex-direction: column;
  width: 100%;

  :focus {
    outline: none;
  }
`;

const ScPlaceholderPadding = styled.div`
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

const ScGrow = styled.div`
  flex: 1 1;
  height: 100%;
  margin-bottom: auto;
`;

const ScSkipLink = styled.a`
  background: var(--navds-color-deepblue-80);
  color: white;

  left: 0;
  padding: 1rem;
  position: absolute;
  transform: translateY(-100%);
  transition: transform 0.1s;
  text-decoration: none;

  :focus-within {
    transform: translateY(0%);
    outline: none;
    box-shadow: inset 0 0 0 2px white;
  }
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
    sidebar: ScPlaceholderPadding,
  },
};

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
      <div style={{ position: "relative" }}>
        <ScSkipLink href="#hovedinnhold" tab-index={-1}>
          Hopp til innhold
        </ScSkipLink>
        <LayoutContext.Provider
          value={{ isMobile, version: pageType, activeHeading }}
        >
          <Header />
          <ScWrapper>
            <Sidebar />
            <ScContentWrapper>
              <ScMain tabIndex={-1} id="hovedinnhold">
                {children}
                <ScGrow />
                <Feedback docId={pageProps?.page?._id} />
                {LayoutParts[pageType]?.title === "Designsystemet" && (
                  <RelatedPagesLink />
                )}
              </ScMain>
              {/* {!pageProps?.preview && <Feedback docId={pageProps?.page?._id} />} */}
              <Footer />
            </ScContentWrapper>
          </ScWrapper>
        </LayoutContext.Provider>
      </div>
    </>
  );
};

export default Layout;
