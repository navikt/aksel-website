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
  top: 3px;
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
  }

  :focus {
    outline: 2px solid white;
  }

  > svg {
    font-size: 1.5rem;
  }
`;

const CopyButton = ({ content }: { content: string }) => {
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
    <ScButton
      className="navds-body-short navds-body--small"
      onClick={handleCopy}
    >
      {active ? (
        <SuccessStroke
          focusable="false"
          aria-label="Kopiert kodesnutt"
          role="img"
        />
      ) : (
        "Copy"
      )}
    </ScButton>
  );
};

export default CopyButton;
