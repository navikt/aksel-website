import React, { useContext, useState } from "react";
import { useIsomorphicLayoutEffect } from "react-use";
import { LayoutContext, PagePropsContext } from "..";
import { DsNavigationHeadingT } from "../../lib";

const LayoutProvider = ({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element => {
  const { pageProps } = useContext(PagePropsContext);
  const [activeHeading, setActiveHeading] = useState<
    DsNavigationHeadingT | undefined
  >();

  useIsomorphicLayoutEffect(() => {
    setActiveHeading(
      pageProps?.navigation?.headings.find((heading) => {
        if (heading?.menu) {
          return (
            heading.menu
              .filter((x) => x._type !== "subheading")
              .find(
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
    <LayoutContext.Provider value={{ activeHeading }}>
      {children}
    </LayoutContext.Provider>
  );
};

export default LayoutProvider;
