import { motion } from "framer-motion";
import NextLink from "next/link";
import * as React from "react";
import { useContext, useState } from "react";
import { useMedia } from "react-use";
import { AmplitudeEvents, Search, useAmplitude } from "../..";
import { DsNavigationHeadingT } from "../../../lib";
import { PagePropsContext } from "../../../pages/_app";
import { LayoutContext } from "../..";
import * as S from "./header.styles";
import MobileNavigation from "./MobileNavigation";
import PortalNavigation from "./PortalNavigation";
import { useRouter } from "next/router";

const DesignsystemHeader = (): JSX.Element => {
  const { pageProps } = useContext(PagePropsContext);
  const context = useContext(LayoutContext);
  const useMobileHeader = useMedia("(max-width: 1023px)");
  const { logAmplitudeEvent } = useAmplitude();
  const { asPath } = useRouter();

  const [searchisOpen, setSearchisOpen] = useState(false);

  const logNavigation = (e) => {
    logAmplitudeEvent(AmplitudeEvents.navigasjon, {
      kilde: "header",
      fra: asPath,
      til: e.currentTarget.getAttribute("href"),
    });
  };

  const nonMobile = (
    <>
      <PortalNavigation title={"Designsystemet"} />

      {!searchisOpen && (
        <S.Links
          as={motion.div}
          key="Links"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ type: "tween", duration: 0.2 }}
          exit={{ opacity: 0 }}
        >
          {pageProps?.navigation?.headings.map(
            (heading: DsNavigationHeadingT) => (
              <NextLink
                key={heading.title + heading.link_ref}
                href={`/${
                  (heading.link_ref as { slug?: { current: string } })?.slug
                    ?.current
                }`}
                as={`/${
                  (heading.link_ref as { slug?: { current: string } })?.slug
                    ?.current
                }`}
                passHref
              >
                <S.Link
                  data-active={
                    context
                      ? context?.activeHeading?.title === heading.title
                      : false
                  }
                  onClick={(e) => logNavigation(e)}
                >
                  {heading.title}
                </S.Link>
              </NextLink>
            )
          )}
        </S.Links>
      )}
      <Search isOpen={(v: boolean) => setSearchisOpen(v)} />
      {/* <S.Link href="#">
        <Bell
          focusable={false}
          aria-label="Notifikasjons ikon"
          style={{ fontSize: "1.5rem" }}
        />
      </S.Link> */}
    </>
  );

  const mobile = (
    <>
      {!searchisOpen && <PortalNavigation title={"Designsystemet"} />}
      <Search isOpen={(v: boolean) => setSearchisOpen(v)} />
      <MobileNavigation />
    </>
  );

  return (
    <S.Header>
      {useMobileHeader || context.isTablet ? mobile : nonMobile}
    </S.Header>
  );
};
export default DesignsystemHeader;
