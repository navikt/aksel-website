import { SuccessStroke } from "@navikt/ds-icons";
import { useRef, useState, useEffect } from "react";
import copy from "copy-to-clipboard";
import React from "react";
import cl from "classnames";
import style from "./index.module.css";

const copyCode = (content: string) =>
  copy(content, {
    format: "text/plain",
  });

interface CopyButtonProps {
  content: string;
  inTabs?: boolean;
  inverted?: boolean;
}

const CopyButton = React.forwardRef<HTMLButtonElement, CopyButtonProps>(
  ({ content, inTabs, inverted = false }, ref) => {
    const [active, setActive] = useState(false);

    const timeoutRef = useRef<NodeJS.Timeout>();

    useEffect(() => {
      if (active) {
        timeoutRef.current = setTimeout(() => setActive(false), 3000);
        return () => timeoutRef.current && clearTimeout(timeoutRef.current);
      }
    }, [active]);

    const handleCopy = () => {
      copyCode(content);
      setActive(true);
    };

    return (
      <button
        ref={ref}
        aria-live={active ? "polite" : "off"}
        role={active ? "alert" : undefined}
        className={cl(style.copybutton, "navds-body-short", {
          "flex w-16 items-center justify-center hover:bg-blue-50 focus:shadow-[inset_0_0_0_2px_theme(colors.focus)] focus:outline-none":
            inTabs,
          "absolute top-4 right-4 bg-gray-50 text-text hover:bg-gray-100 hover:underline focus:outline-2 focus:outline-focus":
            !inTabs && inverted,
          "absolute top-4 right-4 flex h-[48px] w-16 items-center justify-center rounded bg-gray-900 text-text-inverted hover:bg-gray-800 focus:outline-2 focus:outline-focus-inverted":
            !inTabs && !inverted,
        })}
        onClick={handleCopy}
      >
        {active ? (
          <SuccessStroke
            className="text-[1.5rem]"
            aria-label="Kopierte kodesnutt"
          />
        ) : (
          "Copy"
        )}
      </button>
    );
  }
);

export default CopyButton;
