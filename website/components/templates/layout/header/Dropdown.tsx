import { Expand, Left } from "@navikt/ds-icons";
import { BodyShort, Heading, useId } from "@navikt/ds-react";
import FocusLock from "react-focus-lock";
import * as React from "react";
import { useEffect, useRef, useState } from "react";
import { NavLogoWhite } from "../../..";

import * as S from "./header.styles";

const HeadingDropDown = ({ isMobile }: { isMobile: boolean }) => {
  const [open, setOpen] = useState(false);
  const popoverId = useId();

  const buttonRef = useRef(null);
  const lastElement = useRef(null);

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
              Designsystemet
            </Heading>
            <Expand />
          </S.DropDownButton>
          <S.Popover
            id={popoverId}
            open={open}
            anchorEl={buttonRef.current}
            onClose={() => handleClose()}
            placement="bottom-start"
            arrow={false}
            offset={0}
            tabIndex={-1}
          >
            <S.Ul role="menu">
              <li>
                <S.DropDownIconLink href="#" role="menuitem">
                  <Left />
                  <BodyShort>Tilbake til Verktøykassa</BodyShort>
                </S.DropDownIconLink>
              </li>

              <li>
                <S.DropDownLink href="#" role="menuitem">
                  <BodyShort>Designsystemet</BodyShort>
                  <BodyShort spacing size="small">
                    Informasjon omhandlende designsystemet
                  </BodyShort>
                </S.DropDownLink>
              </li>
              <li>
                <S.DropDownLink href="#" role="menuitem">
                  <BodyShort>God Praksis</BodyShort>
                  <BodyShort spacing size="small">
                    Informasjon omhandlende God Praksis
                  </BodyShort>
                </S.DropDownLink>
              </li>
              <li>
                <S.DropDownLink ref={lastElement} href="#" role="menuitem">
                  <BodyShort>Brand Guide</BodyShort>
                  <BodyShort spacing size="small">
                    Informasjon omhandlende Brand Guide
                  </BodyShort>
                </S.DropDownLink>
              </li>
            </S.Ul>
          </S.Popover>
        </div>
      </FocusLock>
    </>
  );
};
export default HeadingDropDown;
