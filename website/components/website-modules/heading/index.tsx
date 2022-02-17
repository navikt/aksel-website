import { Popover } from "@navikt/ds-react";
import copy from "copy-to-clipboard";
import React, { useEffect, useRef, useState } from "react";
import { AmplitudeEvents, slugger, useAmplitude } from "../..";
import * as S from "./heading.styles";
import { Link as LinkIcon } from "@navikt/ds-icons";
import { useRouter } from "next/router";
import cl from "classnames";

const LevelTwoHeading = ({
  children,
  hidden,
}: {
  children: [React.ReactNode | string];
  hidden?: boolean;
}): JSX.Element => {
  const anchorRef = useRef(null);
  const [openPopover, setOpenPopover] = useState(false);
  const { logAmplitudeEvent } = useAmplitude();
  const { asPath } = useRouter();

  const timeoutRef = useRef<NodeJS.Timeout>();

  useEffect(() => {
    if (openPopover) {
      timeoutRef.current = setTimeout(() => setOpenPopover(false), 2000);
      return () => timeoutRef.current && clearTimeout(timeoutRef.current);
    }
  }, [openPopover]);

  const logAnchor = (anchor) => {
    logAmplitudeEvent(AmplitudeEvents.ankerklikk, {
      side: asPath,
      anker: anchor,
    });
  };

  if (children.toString() === "") {
    return null;
  }

  const cleanedChildren = children
    .filter((x) => typeof x === "string")
    .filter((x) => !!x);

  const slug = slugger.slug(cleanedChildren.toString());

  const copyAnchor = (id: string): void => {
    setOpenPopover(true);
    const anchor = window.location.href.split("#")[0];
    copy(`${anchor}#${id}`, {
      format: "text/plain",
    });
  };

  if (cleanedChildren.length == 0) {
    return null;
  }

  return (
    <>
      {hidden && <div id={slug} className="scroll-m-20" />}
      <S.HeadingWrapper
        className={cl({ hidden: hidden, "inline-flex": !hidden })}
      >
        <S.TitleWithScrollMargin
          tabIndex={-1}
          id={slug}
          spacing
          level={2}
          size="large"
          className="index-lvl2"
        >
          {cleanedChildren}
        </S.TitleWithScrollMargin>
        <S.Anchor
          aria-label={`Kopier lenke til ${cleanedChildren.toString()}`}
          onClick={() => {
            copyAnchor(slug);
            logAnchor(slug);
          }}
          ref={anchorRef}
        >
          <span>
            <LinkIcon aria-label="Ankerlenke" />
          </span>
        </S.Anchor>
      </S.HeadingWrapper>

      <Popover
        anchorEl={anchorRef.current}
        open={openPopover}
        onClose={() => setOpenPopover(false)}
        placement="auto"
        arrow={false}
        offset={8}
        aria-live="polite"
        role="alert"
      >
        <Popover.Content style={{ padding: "0.25rem" }}>
          {`Kopierte lenke til ${cleanedChildren.toString()}`}
        </Popover.Content>
      </Popover>
    </>
  );
};

export default LevelTwoHeading;
