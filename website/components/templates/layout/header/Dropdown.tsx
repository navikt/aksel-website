import { Expand, Left } from "@navikt/ds-icons";
import { BodyShort, Heading, useId } from "@navikt/ds-react";
import FocusLock from "react-focus-lock";
import * as React from "react";
import { useContext, useEffect, useRef, useState } from "react";
import { NavLogoWhite } from "../../..";
import NextLink from "next/link";

import * as S from "./header.styles";
import { LayoutContext } from "../Layout";

const HeadingDropDown = ({ isMobile }: { isMobile: boolean }): JSX.Element => {
  const [open, setOpen] = useState(false);
  const popoverId = useId();
  const context = useContext(LayoutContext);

  const buttonRef = useRef(null);
  const lastElement = useRef(null);

  const titles = {
    ds: "Designsystemet",
    gp: "God Praksis",
  };

  const handleClose = () => {
    document.activeElement !== buttonRef.current &&
      document.activeElement !== lastElement.current &&
      setOpen(false);
  };

  useEffect(() => {
    const handleKeyPress = (e) => {
      e.key === "Escape" && open && setOpen(false);
    };

    window.addEventListener("keydown", handleKeyPress);
    return () => {
      window.removeEventListener("keydown", handleKeyPress);
    };
  }, []);

  return (
    <>
      <FocusLock disabled={!open}>
        <div>
          <S.DropDownButton
            isMobile={isMobile}
            aria-expanded={open}
            aria-controls={popoverId}
            aria-haspopup="menu"
            onClick={() => setOpen((x) => !x)}
            ref={buttonRef}
          >
            <NavLogoWhite focusable={false} aria-label="NAV logo" />
            <Heading as="span" size="small">
              {titles[context.version] ?? ""}
            </Heading>
            <Expand />
          </S.DropDownButton>
          <S.Popover
            id={popoverId}
            open={open}
            anchorEl={buttonRef.current}
            onClose={() => handleClose()}
            placement="bottom"
            arrow={false}
            offset={-8}
            tabIndex={-1}
          >
            <S.Ul role="menu">
              <li>
                <NextLink href="/" passHref>
                  <S.DropDownIconLink role="menuitem">
                    <Left />
                    <BodyShort>Tilbake til Verktøykassa</BodyShort>
                  </S.DropDownIconLink>
                </NextLink>
              </li>

              <li>
                <NextLink href="/designsystem" passHref>
                  <S.DropDownLink role="menuitem">
                    <BodyShort>Designsystemet</BodyShort>
                    <BodyShort spacing size="small">
                      Informasjon omhandlende designsystemet
                    </BodyShort>
                  </S.DropDownLink>
                </NextLink>
              </li>
              <li>
                <NextLink href="/god-praksis" passHref>
                  <S.DropDownLink href="/god-praksis" role="menuitem">
                    <BodyShort>God Praksis</BodyShort>
                    <BodyShort spacing size="small">
                      Informasjon omhandlende God Praksis
                    </BodyShort>
                  </S.DropDownLink>
                </NextLink>
              </li>
              <li>
                <NextLink href="#" passHref>
                  <S.DropDownLink ref={lastElement} role="menuitem">
                    <BodyShort>Brand Guide</BodyShort>
                    <BodyShort spacing size="small">
                      Informasjon omhandlende Brand Guide
                    </BodyShort>
                  </S.DropDownLink>
                </NextLink>
              </li>
            </S.Ul>
          </S.Popover>
        </div>
      </FocusLock>
    </>
  );
};
export default HeadingDropDown;
