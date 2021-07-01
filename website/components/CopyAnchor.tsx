import { Link } from "@navikt/ds-icons";
import * as React from "react";
import styled from "styled-components";
import copy from "copy-to-clipboard";
import { Popover } from "@navikt/ds-react";
import { useEffect, useRef, useState } from "react";

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

function CopyAnchor({ anchor }) {
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
      >
        <Link /> Kopier lenke
      </A>
      <StyledPopover
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
