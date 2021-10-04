import Prism from "prismjs";
import "prismjs/components/prism-bash.min";
import "prismjs/components/prism-jsx.min";
import "prismjs/components/prism-typescript.min";
import React, { useContext, useEffect, useRef, useState } from "react";
import { CodeContext, copyCode } from "./Example";
import { Popover } from "@navikt/ds-react";
import * as S from "./code.styles";

const CodeBlock = ({ index }: { index: number }): JSX.Element => {
  const { tabs, showTabs, activeTab } = useContext(CodeContext);

  const buttonRef = useRef(null);
  const [openPopover, setOpenPopover] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout>();

  useEffect(() => {
    if (openPopover) {
      timeoutRef.current = setTimeout(() => setOpenPopover(false), 1500);
      return () => timeoutRef.current && clearTimeout(timeoutRef.current);
    }
  }, [openPopover]);

  if (activeTab === -1) {
    return null;
  }

  const handleCopy = (text: string) => {
    copyCode(text);
    setOpenPopover(true);
  };

  let language = tabs[index].language ?? "jsx";
  language =
    language === "terminal" || language === "default" ? "bash" : language;

  const highlighted = Prism.highlight(
    tabs[index].content,
    Prism.languages[language],
    language
  );

  return (
    <>
      <S.PreWrapper active={activeTab === index}>
        <S.CopyButton
          ref={(node) => (buttonRef.current = node)}
          className="navds-body-short navds-body--small"
          onClick={() => handleCopy(tabs[index].content.toString())}
        >
          Copy
        </S.CopyButton>
        <S.Pre data-tabs={showTabs}>
          <S.Code dangerouslySetInnerHTML={{ __html: highlighted }} />
        </S.Pre>
      </S.PreWrapper>

      <Popover
        role="alert"
        aria-atomic="true"
        anchorEl={buttonRef.current}
        open={openPopover}
        onClose={() => setOpenPopover(false)}
        placement="right"
        arrow={false}
      >
        <Popover.Content style={{ padding: "0.75rem" }}>
          Kopierte kodesnutt
        </Popover.Content>
      </Popover>
    </>
  );
};

export default CodeBlock;
