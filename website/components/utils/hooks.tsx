import { useCallback, useEffect, useState } from "react";

export const useOverflowX = (elementRef, parentRef) => {
  const [overflowLeft, setOverflowLeft] = useState(false);
  const [overflowRight, setOverflowRight] = useState(false);

  const checkOverflow = useCallback(() => {
    const scr = elementRef as HTMLDivElement;
    const inn = parentRef as HTMLDivElement;

    if (scr && inn) {
      if (scr.offsetWidth < inn.offsetWidth) {
        if (scr.scrollLeft !== 0) {
          setOverflowLeft(true);
        } else {
          setOverflowLeft(false);
        }
        if (scr.scrollLeft + scr.offsetWidth < inn.offsetWidth) {
          setOverflowRight(true);
        } else {
          setOverflowRight(false);
        }
      }
    }
  }, [parentRef, elementRef]);

  useEffect(() => {
    elementRef && elementRef.addEventListener("scroll", checkOverflow);
    checkOverflow();
    return () => {
      elementRef && elementRef.removeEventListener("scroll", checkOverflow);
    };
  }, [checkOverflow]);

  return [overflowLeft, overflowRight];
};
