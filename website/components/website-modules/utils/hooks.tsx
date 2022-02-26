import { useCallback, useContext, useEffect, useMemo, useState } from "react";
import { PagePropsContext } from ".";

export const useOverflowTabsX = (elementRef, parentRef, lastItemRef) => {
  const [overflowLeft, setOverflowLeft] = useState(false);
  const [overflowRight, setOverflowRight] = useState(false);

  const checkOverflow = useCallback(() => {
    const scr = elementRef as HTMLDivElement;
    const inn = parentRef as HTMLDivElement;
    const last = lastItemRef as HTMLDivElement;
    if (scr && inn && last) {
      if (scr.offsetWidth < inn.offsetWidth) {
        if (inn.scrollLeft > 16) {
          setOverflowLeft(true);
        } else {
          setOverflowLeft(false);
        }
      }
      if (
        last?.getBoundingClientRect().right >
        (window.innerWidth || document.documentElement.clientWidth) + 16
      ) {
        setOverflowRight(true);
      } else {
        setOverflowRight(false);
      }
    }
  }, [parentRef, elementRef]);

  useEffect(() => {
    parentRef && parentRef.addEventListener("scroll", checkOverflow);
    parentRef && parentRef.addEventListener("resize", checkOverflow);
    checkOverflow();
    return () => {
      parentRef && parentRef.removeEventListener("scroll", checkOverflow);
      parentRef && parentRef.removeEventListener("resize", checkOverflow);
    };
  }, [checkOverflow]);

  return [overflowLeft, overflowRight];
};

export const useOverflowX = (elementRef, parentRef) => {
  const [overflowLeft, setOverflowLeft] = useState(false);
  const [overflowRight, setOverflowRight] = useState(false);

  const checkOverflow = useCallback(() => {
    const scr = parentRef as HTMLDivElement;
    const inn = elementRef as HTMLDivElement;
    if (scr && inn) {
      if (scr.offsetWidth < inn.offsetWidth) {
        if (scr.scrollLeft > 16) {
          setOverflowLeft(true);
        } else {
          setOverflowLeft(false);
        }
      }
      if (
        inn?.getBoundingClientRect().right >
        (window.innerWidth || document.documentElement.clientWidth) + 16
      ) {
        setOverflowRight(true);
      } else {
        setOverflowRight(false);
      }
    }
  }, [parentRef, elementRef]);

  useEffect(() => {
    parentRef && parentRef.addEventListener("scroll", checkOverflow);
    parentRef && parentRef.addEventListener("resize", checkOverflow);
    checkOverflow();
    return () => {
      parentRef && parentRef.removeEventListener("scroll", checkOverflow);
      parentRef && parentRef.removeEventListener("resize", checkOverflow);
    };
  }, [checkOverflow]);

  return [overflowLeft, overflowRight];
};

export const useDsNavigation = () => {
  const { pageProps } = useContext(PagePropsContext);

  const activeHeading = useMemo(
    () =>
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
      }),
    [pageProps]
  );

  return [pageProps?.navigation, activeHeading];
};
