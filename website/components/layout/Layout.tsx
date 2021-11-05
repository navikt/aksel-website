import React, { createContext, useContext, useState } from "react";
import styled from "styled-components";
import Header from "./header/Header";
import { PagePropsContext } from "../../pages/_app";
import DesignsystemSidebar from "./sidebar/DesignsystemSidebar";
import { useIsomorphicLayoutEffect, useMedia } from "react-use";
import Footer from "./Footer";
import { Feedback, RelatedPagesLink } from "..";
import DesignsystemHeader from "./header/DesignsystemHeader";
import GodPraksisHeader from "./header/GodPraksisHeader";
import Sidebar from "./sidebar/Sidebar";
import { DsNavigationHeadingT } from "../../lib";

const ScWrapper = styled.div`
  display: flex;
  min-height: calc(100vh - var(--header-height));
  background-color: #ffffff;

  p {
    max-width: var(--text-max-width);
  }
`;

const ScContentWrapper = styled.div<{ isTablet: boolean }>`
  flex-direction: column;
  width: 100%;
  position: relative;
`;

const ScMain = styled.main<{ $tablet: boolean; $hasSidebar: boolean }>`
  min-height: calc(100vh - var(--header-height));
  width: ${(props) =>
    props.$hasSidebar ? `calc(100vw - var(--sidebar-max-width))` : "100%"};
  display: flex;
  flex-direction: column;
  position: relative;

  ${(props) => props.$tablet && `width: 100%;`}
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

  @media (max-width: 964px) {
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
  z-index: 1;

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
  isTablet: boolean;
  version: "ds" | "gp";
  activeHeading?: DsNavigationHeadingT;
};

export const LayoutContext = createContext<LayoutContextProps | null>(null);

const Layout = ({ children }: { children: React.ReactNode }): JSX.Element => {
  const { pageProps } = useContext(PagePropsContext);
  const [activeHeading, setActiveHeading] = useState<
    DsNavigationHeadingT | undefined
  >();

  const isTablet = useMedia("(max-width: 768px)");
  const isMobile = useMedia("(max-width: 480px)");
  const pageType = pageProps?.page?._type?.split("_")[0];

  useIsomorphicLayoutEffect(() => {
    setActiveHeading(
      pageProps?.navigation?.headings.find((heading) =>
        heading.menu.find(
          (item) => item.link.slug.current === pageProps?.page?.slug
        )
      )
    );
  }, [pageProps?.page]);

  if (!pageProps) {
    return null;
  }

  return (
    <>
      <ScSkipLink href="#hovedinnhold" tab-index={-1}>
        Hopp til innhold
      </ScSkipLink>
      <LayoutContext.Provider
        value={{ isMobile, isTablet, version: pageType, activeHeading }}
      >
        <Header />
        <ScWrapper>
          <Sidebar />
          <ScContentWrapper isTablet={isTablet}>
            <ScMain
              $tablet={isTablet}
              $hasSidebar={!!LayoutParts[pageType]?.sidebar}
              tabIndex={-1}
              id="hovedinnhold"
            >
              {children}
              <ScGrow />
              <Feedback docId={pageProps?.page?._id} />
              {/* {LayoutParts[pageType]?.title === "Designsystemet" && (
                  <RelatedPagesLink />
                )} */}
            </ScMain>
            {/* {!pageProps?.preview && <Feedback docId={pageProps?.page?._id} />} */}
            {/* <Footer /> */}
          </ScContentWrapper>
        </ScWrapper>
      </LayoutContext.Provider>
    </>
  );
};

export default Layout;
