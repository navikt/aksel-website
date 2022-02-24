import { useState } from "react";
import { useOverflowX } from "../..";
import cl from "classnames";

const OverflowDetector = ({ children }: { children: React.ReactNode }) => {
  const [outerRef, setOuterRef] = useState<HTMLDivElement>(null);
  const [innerRef, setInnerRef] = useState<HTMLDivElement>(null);

  const [left, right] = useOverflowX(innerRef, outerRef);

  return (
    <div
      data-left={left}
      data-right={right}
      className={cl("relative -mx-4 md:mx-0", {
        "before:absolute before:bottom-0 before:left-0 before:top-0 before:h-full before:w-8 before:bg-gradient-to-r before:from-gray-900/25 before:to-transparent":
          left,
        "after:absolute after:bottom-0 after:right-0 after:top-0 after:h-full after:w-8 after:bg-gradient-to-l after:from-gray-900/25 after:to-transparent":
          right,
      })}
    >
      <div ref={setOuterRef} className="overflow-x-auto">
        <div className="inline-block min-w-full" ref={setInnerRef}>
          {children}
        </div>
      </div>
    </div>
  );
};

export default OverflowDetector;
