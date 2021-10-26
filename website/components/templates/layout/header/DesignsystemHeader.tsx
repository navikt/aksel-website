import NextLink from "next/link";
import * as React from "react";
import { useContext } from "react";
import { Search } from "../../..";
import { DsNavigationHeadingT } from "../../../../lib";
import { PagePropsContext } from "../../../../pages/_app";
import { LayoutContext, LayoutParts } from "../Layout";
import * as S from "./header.styles";
import MobileNavigation from "./MobileNavigation";
import PortalNavigation from "./PortalNavigation";

const DesignsystemHeader = (): JSX.Element => {
  const context = useContext(LayoutContext);

  const [pageProps] = useContext<any>(PagePropsContext);

  const nonMobile = (
    <>
      <PortalNavigation title={LayoutParts[context.version].title ?? ""} />
      <S.Links>
        {pageProps?.navigation.headings.map((heading: DsNavigationHeadingT) => (
          <NextLink
            key={heading.title + heading.link_ref}
            href={`/${
              (heading.link_ref as { slug?: { current: string } })?.slug
                ?.current
            }`}
            passHref
          >
            <S.Link $active={context?.activeHeading?.title === heading.title}>
              {heading.title}
            </S.Link>
          </NextLink>
        ))}
      </S.Links>
      <Search />
      {/* <S.Link href="#">
        <Bells
          focusable={false}
          aria-label="Notifikasjons ikon"
          style={{ fontSize: "1.5rem" }}
        />
      </S.Link> */}
    </>
  );

  const mobile = (
    <>
      <PortalNavigation title={LayoutParts[context.version].title ?? ""} />
      <Search />
      <MobileNavigation />
    </>
  );

  return <S.Header>{context.isMobile ? mobile : nonMobile}</S.Header>;
};
export default DesignsystemHeader;
