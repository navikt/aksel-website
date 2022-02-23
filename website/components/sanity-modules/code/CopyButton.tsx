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

const ScButton = styled.button<{ inverted: boolean }>`
  ${S.ButtonCss}
  position: absolute;
  top: 4px;
  right: 4px;
  border-radius: 4px;
  color: var(--navds-semantic-color-text-inverted);
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

  ${(props) =>
    props.inverted &&
    `
    color: var(--navds-semantic-color-text);
    background-color: var(--navds-semantic-color-component-background);

    :hover {
      /* background-color: var(--navds-semantic-color-interaction-primary-hover-subtle); */
      background-color: var(--navds-semantic-color-component-background);
      color: var(--navds-semantic-color-text);
      text-decoration: underline;
    }

    :focus {
      outline: 2px solid var(--navds-semantic-color-focus);
    }
  `}
`;

const ScTabButton = styled.button<{ inverted: boolean }>`
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

    const Button = inTabs ? ScTabButton : ScButton;

    return (
      <Button
        ref={ref}
        aria-live={active ? "polite" : "off"}
        role={active ? "alert" : undefined}
        className="navds-body-short"
        onClick={handleCopy}
        inverted={inverted}
      >
        {active ? <SuccessStroke aria-label="Kopierte kodesnutt" /> : "Copy"}
      </Button>
    );
  }
);

export default CopyButton;
