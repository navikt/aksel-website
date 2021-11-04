import { Popover } from "@navikt/ds-react";
import copy from "copy-to-clipboard";
import React, { useEffect, useRef, useState } from "react";
import { slugger } from "..";
import * as S from "./heading.styles";
import { Link as LinkIcon } from "@navikt/ds-icons";

const LevelTwoHeading = ({
  children,
}: {
  children: [React.ReactNode | string];
}): JSX.Element => {
  const anchorRef = useRef(null);
  const [openPopover, setOpenPopover] = useState(false);

  const timeoutRef = useRef<NodeJS.Timeout>();

  useEffect(() => {
    if (openPopover) {
      timeoutRef.current = setTimeout(() => setOpenPopover(false), 2000);
      return () => timeoutRef.current && clearTimeout(timeoutRef.current);
    }
  }, [openPopover]);

  if (children.toString() === "") {
    return null;
  }

  const slug = slugger.slug(children.toString());

  const copyAnchor = (id: string): void => {
    setOpenPopover(true);
    const anchor = window.location.href.split("#")[0];
    copy(`${anchor}#${id}`, {
      format: "text/plain",
    });
  };

  const cleanedChildren = children
    .filter((x) => typeof x === "string")
    .filter((x) => !!x);

  return (
    <>
      <S.TitleWithScrollMargin id={slug} spacing level={2} size="large">
        {cleanedChildren}
        <S.Anchor
          aria-label={`Kopier lenke til ${cleanedChildren.toString()}`}
          onClick={() => copyAnchor(slug)}
          ref={anchorRef}
        >
          <span>
            <LinkIcon aria-label="ankerlenke ikon" focusable={false} />
          </span>
        </S.Anchor>
      </S.TitleWithScrollMargin>

      <Popover
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
