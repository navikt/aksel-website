import { SuccessStroke } from "@navikt/ds-icons";
import { useRef, useState, useEffect } from "react";
import * as S from "./code.styles";
import copy from "copy-to-clipboard";
import styled from "styled-components";

const copyCode = (content: string) =>
  copy(content, {
    format: "text/plain",
  });

const ScButton = styled.button`
  ${S.ButtonCss}
  color: white;
  position: absolute;
  top: 4px;
  right: 8px;
  border-radius: 4px;
  background-color: var(--navds-color-darkgray);
  height: 48px;
  width: 4rem;
  display: flex;
  align-items: center;
  justify-content: center;

  :hover {
    background-color: var(--navds-color-gray-80);
    text-decoration: none;
    color: white;

    ::before {
      content: none;
    }
  }

  :focus {
    outline: 2px solid white;
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
    outline: 2px solid var(--navds-color-gray-90);
    ::before {
      content: none;
    }
  }

  :active {
    background-color: var(--navds-color-blue-20);
  }
  > svg {
    font-size: 1.5rem;
  }
`;

const CopyButton = ({
  content,
  inTabs,
}: {
  content: string;
  inTabs?: boolean;
}) => {
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
      aria-live={active ? "polite" : "off"}
      role={active ? "alert" : undefined}
      className="navds-body-short"
      onClick={handleCopy}
    >
      {active ? <SuccessStroke aria-label="Kopierte kodesnutt" /> : "Copy"}
    </Button>
  );
};

export default CopyButton;
