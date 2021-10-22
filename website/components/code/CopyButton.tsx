import { SuccessStroke } from "@navikt/ds-icons";
import { useRef, useState, useEffect } from "react";
import * as S from "./code.styles";
import copy from "copy-to-clipboard";

const copyCode = (content: string) =>
  copy(content, {
    format: "text/plain",
  });

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
    <S.CopyButton
      className="navds-body-short navds-body--small"
      onClick={handleCopy}
    >
      {active ? <SuccessStroke /> : "Copy"}
    </S.CopyButton>
  );
};

export default CopyButton;
