import { SuccessStroke } from "@navikt/ds-icons";
import { useRef, useState, useEffect } from "react";
import * as S from "./code.styles";
import copy from "copy-to-clipboard";
import styled from "styled-components";
import React from "react";

const copyCode = (content: string) =>
  copy(content, {
    format: "text/plain",
  });

const ScButton = styled.button`
  ${S.ButtonCss}
  color: var(--navds-semantic-color-text-inverted);
  position: absolute;
  top: 4px;
  right: 8px;
  border-radius: 4px;
  background-color: var(--navds-semantic-color-component-background-inverted);
  height: 48px;
  width: 4rem;
  display: flex;
  align-items: center;
  justify-content: center;

  :hover {
    background-color: var(--navds-global-color-gray-800);
    text-decoration: none;
    color: var(--navds-semantic-color-text-inverted);

    ::before {
      content: none;
    }
  }

  :focus {
    outline: 2px solid var(--navds-semantic-color-canvas-background-light);
  }

  > svg {
    font-size: 1.5rem;
  }
`;

const ScTabButton = styled.button`
  ${S.ButtonCss}
  display: flex;
  align-items: center;
  justify-content: center;
  width: 4rem;

  ::before {
    content: none;
  }

  :hover {
    ::before {
      content: none;
    }
  }

  :active {
    background-color: var(--navds-global-color-blue-50);
  }
  > svg {
    font-size: 1.5rem;
  }
`;

interface CopyButtonProps {
  content: string;
  inTabs?: boolean;
}

const CopyButton = React.forwardRef<HTMLButtonElement, CopyButtonProps>(
  ({ content, inTabs }, ref) => {
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

    const Button = inTabs ? ScTabButton : ScButton;

    return (
      <Button
        ref={ref}
        aria-live={active ? "polite" : "off"}
        role={active ? "alert" : undefined}
        className="navds-body-short"
        onClick={handleCopy}
      >
        {active ? <SuccessStroke aria-label="Kopierte kodesnutt" /> : "Copy"}
      </Button>
    );
  }
);

/* const CopyButton = ({
  content,
  inTabs,
}: {
  content: string;
  inTabs?: boolean;
}) => {

}; */

export default CopyButton;