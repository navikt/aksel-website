import { Bell, Close, Hamburger } from "@navikt/ds-icons";
import { Header as DsHeader } from "@navikt/ds-react-internal";
import NextLink from "next/link";
import * as React from "react";
import { useContext, useState } from "react";
import { useMedia } from "react-use";
import { NavLogoWhite } from "../../..";
import { DsNavigationHeadingT } from "../../../../lib";
import { PagePropsContext } from "../../../../pages/_app";
import { LayoutContext } from "../Layout";
import Sidebar from "../sidebar/Sidebar";
import HeadingDropDown from "./Dropdown";
import * as S from "./header.styles";
import HeaderSearchBar from "./Searchbar";

const DesignsystemHeader = (): JSX.Element => {
  const context = useContext(LayoutContext);
  const showLogo = useMedia("(min-width: 563px)");
  const [hambRef, setHambRef] = useState(null);
  const [openHamb, setOpenHamb] = useState(false);

  const [pageProps] = useContext<any>(PagePropsContext);

  const nonMobile = (
    <>
      <HeadingDropDown />
      <S.Links>
        {pageProps?.navigation.headings.map((heading: DsNavigationHeadingT) => (
          <NextLink
            key={heading._key}
            href={`/${heading.link_ref?.slug?.current}`}
            passHref
          >
            <S.Link $active={context?.activeHeading?.title === heading.title}>
              {heading.title}
            </S.Link>
          </NextLink>
        ))}
        {/* <S.Link href="#">Kom i gang</S.Link>
        <S.Link href="#">Guider</S.Link>
        <S.Link href="#">Produktbrief</S.Link>
        <S.Link href="#">Styling</S.Link>
        <S.Link href="#">Komponenter</S.Link>
        <S.Link href="#">Mønster</S.Link>
        <S.Link href="#">Ressurser</S.Link>
        <S.Link href="#">Hjelp</S.Link> */}
      </S.Links>
      <HeaderSearchBar />
      <S.Link href="#">
        <Bell
          focusable={false}
          aria-label="Notifikasjons ikon"
          style={{ fontSize: "1.5rem" }}
        />
      </S.Link>
    </>
  );

  const mobile = (
    <>
      <HeaderSearchBar />
      <S.Link style={{ marginLeft: "auto", marginRight: "auto" }} href="#">
        {showLogo && <NavLogoWhite focusable={false} aria-label="NAV logo" />}
        Designsystemet
      </S.Link>

      <S.DropdownButton
        className="navdsi-header__dropdown-button"
        onClick={() => setOpenHamb(!openHamb)}
        ref={setHambRef}
      >
        {openHamb ? (
          <Close
            focusable={false}
            aria-label="Steng meny ikon"
            style={{ fontSize: "1.5rem" }}
          />
        ) : (
          <Hamburger
            focusable={false}
            aria-label="Meny ikon"
            style={{ fontSize: "1.5rem" }}
          />
        )}
      </S.DropdownButton>
      <S.MenuOverlay $open={openHamb} className="navds-modal__overlay">
        <S.MobileMenu
          open={openHamb}
          anchorEl={hambRef}
          onClose={() => setOpenHamb(false)}
          placement="bottom"
          arrow={false}
          offset={0}
        >
          <Sidebar fromHeader />
        </S.MobileMenu>
      </S.MenuOverlay>
    </>
  );

  return <DsHeader>{context.isMobile ? mobile : nonMobile}</DsHeader>;
};
export default DesignsystemHeader;
