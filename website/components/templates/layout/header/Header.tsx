import { Expand, Hamburger, Left, Search } from "@navikt/ds-icons";
import { BodyShort, Heading, useId } from "@navikt/ds-react";
import * as React from "react";
import { useContext, useRef, useState } from "react";
import { NavLogoWhite } from "../../..";
import { LayoutContext } from "../Layout";
import * as S from "./header.styles";

const SearchHambGroup = ({ isMobile }: { isMobile: boolean }) => {
  return (
    <>
      <S.Link href="#" isMobile={isMobile}>
        <Search
          style={{ fontSize: "1.5rem", marginLeft: 3 }}
          focusable={false}
          aria-label="Søk ikon"
        />
        <span className="sr-only">Søk etter sider</span>
      </S.Link>
      {isMobile && (
        <S.Link href="#" isMobile={isMobile}>
          <Hamburger
            focusable={false}
            aria-label="Meny ikon"
            style={{ fontSize: "1.5rem", marginLeft: 3 }}
          />
        </S.Link>
      )}
    </>
  );
};

const HeadingDropDown = ({ isMobile }: { isMobile: boolean }) => {
  const [open, setOpen] = useState(false);
  const popoverId = useId();

  const buttonRef = useRef(null);
  return (
    <>
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
        onClose={() => setOpen(false)}
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
            <S.DropDownLink href="#" role="menuitem">
              <BodyShort>Brand Guide</BodyShort>
              <BodyShort spacing size="small">
                Informasjon omhandlende Brand Guide
              </BodyShort>
            </S.DropDownLink>
          </li>
        </S.Ul>
      </S.Popover>
    </>
  );
};

function Header(): JSX.Element {
  const context = useContext(LayoutContext);

  return (
    <S.Header context={context} className="navds-body-short">
      <S.Row>
        <HeadingDropDown isMobile={context.isMobile} />
        {context.isMobile && (
          <>
            <S.Grow />
            <SearchHambGroup isMobile={context.isMobile} />
          </>
        )}
      </S.Row>
      <S.LinkRow context={context}>
        {!context.isMobile && <S.Grow />}
        <S.Link href="#" isMobile={context.isMobile}>
          <span>Ressurser</span>
        </S.Link>
        <S.Link data-active href="#" isMobile={context.isMobile}>
          <span>Komponenter</span>
        </S.Link>
        <S.Link href="#" isMobile={context.isMobile}>
          <span>Mønster</span>
        </S.Link>
        <S.Link href="#" isMobile={context.isMobile}>
          <span>Kategori</span>
        </S.Link>
        <S.Link href="#" isMobile={context.isMobile}>
          <span>Kategori</span>
        </S.Link>
        <S.Link href="#" isMobile={context.isMobile}>
          <span>Kategori</span>
        </S.Link>
        {!context.isMobile && <SearchHambGroup isMobile={context.isMobile} />}
      </S.LinkRow>
    </S.Header>
  );
}

export default Header;
