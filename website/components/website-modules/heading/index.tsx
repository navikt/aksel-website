import { BodyShort, Heading, Popover } from "@navikt/ds-react";
import copy from "copy-to-clipboard";
import React, { useEffect, useRef, useState } from "react";
import { AmplitudeEvents, slugger, useAmplitude } from "../..";
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
      <Heading
        tabIndex={-1}
        id={slug}
        level="2"
        size="large"
        className={cl(
          "index-lvl2 mb-4 mt-8 scroll-mt-20 items-center justify-start focus:outline-none",
          {
            hidden: hidden,
            "inline-flex": !hidden,
          }
        )}
      >
        {cleanedChildren}
        <button
          aria-label={`Kopier permalenke til ${cleanedChildren.toString()}`}
          onClick={() => {
            copyAnchor(slug);
            logAnchor(slug);
          }}
          ref={anchorRef}
          className="ml-0 mt-[2px] flex aspect-square self-start rounded-full p-2 text-xlarge opacity-50 transition-opacity hover:bg-gray-100 hover:opacity-100 focus:opacity-100 focus:shadow-focus focus:outline-none sm:ml-2"
        >
          <span>
            <LinkIcon aria-label="Ankerlenke" />
          </span>
        </button>
        <Popover
          anchorEl={anchorRef.current}
          open={openPopover}
          onClose={() => setOpenPopover(false)}
          placement="auto"
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
