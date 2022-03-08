import { Header } from "@navikt/ds-react-internal";
import cl from "classnames";
import NextLink from "next/link";
import * as React from "react";
import { logNav, Search, useDsNavigation } from "../..";
import { DsNavigationHeadingT } from "../../../lib";
import MobileNavigation from "./menu/MobileNav";
import PortalNavigation from "./menu/PortalNav";

const DesignsystemHeader = (): JSX.Element => {
  const [nav, activeHeading] = useDsNavigation();

  const nonMobile = (
    <>
      <PortalNavigation title={"Designsystemet"} />
      <div className="z-[1050] mr-auto flex">
        {nav?.headings.map((heading: DsNavigationHeadingT) => (
          <NextLink
            href={`/${
              (heading.link_ref as { slug?: { current: string } })?.slug
                ?.current
            }`}
            passHref
            key={heading.title + heading.link_ref}
          >
            <a
              onClick={(e) =>
                logNav(
                  "header",
                  window.location.pathname,
                  e.currentTarget.getAttribute("href")
                )
              }
              className={cl(
                "index-heading flex min-w-header cursor-pointer items-center justify-center whitespace-nowrap py-0 px-2 pt-1 focus:outline-none 2xl:px-4",
                {
                  "text-text-inverted focus:shadow-[inset_0_0_0_1px_var(--navds-global-color-gray-900),inset_0_0_0_3px_var(--navds-global-color-blue-200)]":
                    !(activeHeading?.title === heading.title),
                  "index-heading--active bg-white text-text shadow-[inset_0_0_0_1px_var(--navds-global-color-gray-900)] hover:bg-canvas-background-light focus:shadow-[inset_0_0_0_1px_var(--navds-global-color-gray-900),inset_0_0_0_2px_var(--navds-global-color-white)_,inset_0_0_0_4px_var(--navds-global-color-gray-900)]":
                    activeHeading?.title === heading.title,
                }
              )}
            >
              {heading.title}
            </a>
          </NextLink>
        ))}
      </div>
      <Search />
    </>
  );

  const mobile = (
    <>
      <PortalNavigation title={"Designsystemet"} />
      <Search />
      <MobileNavigation />
    </>
  );

  return (
    <>
      <a className="skiplink" href="#hovedinnhold" tab-index={-1}>
        Hopp til innhold
      </a>
      <Header className="z-[1050] hidden h-header xl:flex">{nonMobile}</Header>
      <Header className="z-[1050] flex h-header xl:hidden">{mobile}</Header>
    </>
  );
};
export default DesignsystemHeader;
