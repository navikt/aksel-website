import { Link as LinkIcon } from "@navikt/ds-icons";
import { BodyShort, Heading, Popover } from "@navikt/ds-react";
import cl from "classnames";
import copy from "copy-to-clipboard";
import React, { useEffect, useMemo, useRef, useState } from "react";
import { AmplitudeEvents, slugger, useAmplitude } from "../..";

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
  const [slug, setSlug] = useState<null | string>(null);
  const timeoutRef = useRef<NodeJS.Timeout>();

  useEffect(() => {
    if (openPopover) {
      timeoutRef.current = setTimeout(() => setOpenPopover(false), 2000);
      return () => timeoutRef.current && clearTimeout(timeoutRef.current);
    }
  }, [openPopover]);

  const logAnchor = (anchor) => {
    logAmplitudeEvent(AmplitudeEvents.ankerklikk, {
      side: decodeURI(window.location.href),
      anker: anchor,
    });
  };

  if (children.toString() === "") {
    return null;
  }

  const cleanedChildren = useMemo(
    () => children.filter((x) => typeof x === "string").filter((x) => !!x),
    [children]
  );

  useEffect(() => {
    setSlug(slugger.slug(cleanedChildren.toString()));
  }, [cleanedChildren]);

  const copyAnchor = (id: string): void => {
    setOpenPopover(true);
    const anchor = decodeURI(window.location.href).split("#")[0];
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
      <Heading
        ref={anchorRef}
        tabIndex={-1}
        id={slug}
        level="2"
        size="large"
        className={cl(
          "index-lvl2 group mb-4 max-w-text scroll-mt-20 hover:underline focus:outline-none",
          {
            hidden: hidden,
            "inline-flex": !hidden,
          }
        )}
      >
        <a
          className="group flex items-center gap-2 focus:underline focus:outline-none"
          href={`#${slug}`}
          onClick={() => {
            copyAnchor(slug);
            logAnchor(slug);
          }}
        >
          {cleanedChildren}{" "}
          <LinkIcon
            aria-hidden
            className="invisible flex-shrink-0 text-[1.25rem] text-text-muted group-hover:visible group-focus:visible"
          />
        </a>
        <Popover
          anchorEl={anchorRef.current}
          open={openPopover}
          onClose={() => setOpenPopover(false)}
          placement="bottom-start"
          arrow={false}
          offset={8}
        >
          {openPopover && (
            <Popover.Content style={{ padding: "0.25rem" }}>
              <BodyShort size="small">{`Kopierte permalenke til "${cleanedChildren.toString()}"`}</BodyShort>
            </Popover.Content>
          )}
        </Popover>
      </Heading>
    </>
  );
};

export default LevelTwoHeading;
