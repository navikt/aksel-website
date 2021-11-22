import { useCallback, useEffect, useState } from "react";

export const useOverflowX = (elementRef, parentRef, lastItemRef) => {
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
