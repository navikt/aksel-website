import React, { createContext, useContext, useState } from "react";
import { useIsomorphicLayoutEffect, useMedia } from "react-use";
import { DsNavigationHeadingT } from "../../lib";
import { PagePropsContext } from "../../pages/_app";

export type LayoutContextProps = {
  isMobile: boolean;
  isTablet: boolean;
  version: "ds" | "gp";
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

  if (pageProps.noLayout) {
    return <>{children}</>;
  }

  return (
    <LayoutContext.Provider
      value={{ isMobile, isTablet, version: pageType, activeHeading }}
    >
      {children}
    </LayoutContext.Provider>
  );
};

export default LayoutProvider;
