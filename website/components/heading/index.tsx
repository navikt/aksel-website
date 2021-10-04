import { Popover } from "@navikt/ds-react";
import copy from "copy-to-clipboard";
import { useEffect, useRef, useState } from "react";
import { slugger } from "..";
import * as S from "./heading.styles";
import { Link as LinkIcon } from "@navikt/ds-icons";

const LevelTwoHeading = ({ children, divider = false }) => {
  const anchorRef = useRef(null);
  const [openPopover, setOpenPopover] = useState(false);

  const timeoutRef = useRef<NodeJS.Timeout>();

  useEffect(() => {
    if (openPopover) {
      timeoutRef.current = setTimeout(() => setOpenPopover(false), 2000);
      return () => timeoutRef.current && clearTimeout(timeoutRef.current);
    }
  }, [openPopover]);

  const slug = slugger.slug(encodeURI(children.toString()));
  const copyAnchor = (id: string): void => {
    setOpenPopover(true);
    const anchor = window.location.href.split("#")[0];
    copy(`${anchor}#${id}`, {
      format: "text/plain",
    });
  };

  return (
    <>
      {children && (
        <S.Divider divider={divider}>
          <S.Hr />
        </S.Divider>
      )}
      <S.TitleWithScrollMargin id={slug} spacing level={2} size="large">
        {children}
        <S.Anchor
          aria-label={`Kopier lenke til ${children.toString()}`}
          onClick={() => copyAnchor(slug)}
          ref={anchorRef}
        >
          <span>
            <LinkIcon aria-label="ankerlenke ikon" focusable={false} />
          </span>
        </S.Anchor>
      </S.TitleWithScrollMargin>

      <Popover
        role="alert"
        aria-atomic="true"
        anchorEl={anchorRef.current}
        open={openPopover}
        onClose={() => setOpenPopover(false)}
        placement="right"
        arrow={false}
        offset={8}
      >
        <Popover.Content style={{ padding: "0.25rem" }}>
          Kopierte lenke
        </Popover.Content>
      </Popover>
    </>
  );
};
export default LevelTwoHeading;
