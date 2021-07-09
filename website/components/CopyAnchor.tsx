import { Link } from "@navikt/ds-icons";
import { Popover } from "@navikt/ds-react";
import copy from "copy-to-clipboard";
import * as React from "react";
import { useEffect, useRef, useState } from "react";
import styled from "styled-components";

const Div = styled.div`
  display: inline-flex;
`;

const A = styled.a`
  display: flex;
  text-decoration: none;
  align-items: center;
  margin-bottom: var(--navds-spacing-8);

  :hover {
    text-decoration: underline;
  }

  svg {
    margin-right: var(--navds-spacing-2);
  }
`;

const StyledPopover = styled(Popover)`
  padding: var(--navds-spacing-1);
  border-radius: 4px;
`;

function CopyAnchor({
  anchor,
  ...props
}: {
  anchor: string;
  props: any;
}): JSX.Element {
  const [openPopover, setOpenPopover] = useState(false);
  const popoverRef = useRef(null);
  const timeoutRef = useRef<NodeJS.Timeout>();

  useEffect(() => {
    if (openPopover) {
      timeoutRef.current = setTimeout(() => setOpenPopover(false), 1500);
      return () => timeoutRef.current && clearTimeout(timeoutRef.current);
    }
  }, [openPopover]);

  const getLink = () => {
    const { href, hash } = window.location;
    const urlWithoutHash = href.replace(hash, "");
    return `${urlWithoutHash}${anchor}`;
  };

  const handleClick = (e) => {
    e.preventDefault();
    copy(getLink(), {
      format: "text/plain",
    });
    setOpenPopover(true);
  };

  return (
    <Div>
      <A
        className="navds-body-short navds-body--s"
        ref={popoverRef}
        onClick={(e) => handleClick(e)}
        href={anchor}
        {...props}
      >
        <Link focusable="false" role="presentation" /> Kopier lenke
      </A>
      <StyledPopover
        aria-atomic="true"
        role="alert"
        anchorEl={popoverRef.current}
        open={openPopover}
        onClose={() => setOpenPopover(false)}
        placement="right"
        arrow={false}
      >
        Lenken er kopiert
      </StyledPopover>
    </Div>
  );
}

export default CopyAnchor;
