import { Bell, Hamburger } from "@navikt/ds-icons";
import { Header as DsHeader } from "@navikt/ds-react-internal";
import * as React from "react";
import { useContext } from "react";
import { useMedia } from "react-use";
import { NavLogoWhite } from "../../..";
import { DsNavigationT } from "../../../../lib";
import { PagePropsContext } from "../../../../pages/_app";
import { LayoutContext } from "../Layout";
import HeadingDropDown from "./Dropdown";
import * as S from "./header.styles";
import HeaderSearchBar from "./Searchbar";

const DesignsystemHeader = (): JSX.Element => {
  const context = useContext(LayoutContext);
  const showLogo = useMedia("(min-width: 563px)");

  const [pageProps] = useContext<any>(PagePropsContext);
  const nav = pageProps.navigation as DsNavigationT;

  const nonMobile = (
    <>
      <HeadingDropDown />
      <S.Links>
        {nav.headings.map((heading) => (
          <S.Link key={heading._key} href={`/${heading.link_ref.slug.current}`}>
            {heading.title}
          </S.Link>
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
      <S.Link href="#">
        <Hamburger
          focusable={false}
          aria-label="Meny ikon"
          style={{ fontSize: "1.5rem" }}
        />
      </S.Link>
    </>
  );

  return <DsHeader>{context.isMobile ? mobile : nonMobile}</DsHeader>;
};
export default DesignsystemHeader;
