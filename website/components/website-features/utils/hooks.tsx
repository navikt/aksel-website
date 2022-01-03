import { useCallback, useContext, useEffect, useState } from "react";
import { LayoutContext } from "../..";
import { RelatedLinkT } from "../../../lib";

export const useRelatedCategory = (link: RelatedLinkT) => {
  console.log(link);

  /* const context = useContext(LayoutContext); */

  return link.internal ? "RELATERT INNHOLD" : null;
};

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
