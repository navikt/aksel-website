import React, { createContext, useContext, useState } from "react";
import { useIsomorphicLayoutEffect, useMedia } from "react-use";
import { DsNavigationHeadingT } from "../../lib";
import { PagePropsContext } from "../../pages/_app";

export type LayoutContextProps = {
  isMobile: boolean;
  isTablet: boolean;
  activeHeading?: DsNavigationHeadingT;
};

export const LayoutContext = createContext<LayoutContextProps | null>(null);

const LayoutProvider = ({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element => {
  const { pageProps } = useContext(PagePropsContext);
  const [activeHeading, setActiveHeading] = useState<
    DsNavigationHeadingT | undefined
  >();

  const isTablet = useMedia("(max-width: 768px)");
  const isMobile = useMedia("(max-width: 480px)");

  useIsomorphicLayoutEffect(() => {
    setActiveHeading(
      pageProps?.navigation?.headings.find((heading) => {
        if (heading?.menu) {
          return (
            heading.menu.find(
              (item) => item.link.slug.current === pageProps?.page?.slug
            ) ?? heading.link_ref.slug.current === pageProps?.page?.slug
          );
        } else {
          return heading.link_ref.slug.current === pageProps?.page?.slug;
        }
      })
    );
  }, [pageProps?.page]);

  // Breaks page if removed
  if (!pageProps) {
    return null;
  }

  return (
    <LayoutContext.Provider value={{ isMobile, isTablet, activeHeading }}>
      {children}
    </LayoutContext.Provider>
  );
};

export default LayoutProvider;
