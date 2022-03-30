import { Expand } from "@navikt/ds-icons";
import { BodyShort, Label } from "@navikt/ds-react";
import cl from "classnames";
import NextLink from "next/link";
import React, { useContext, useState } from "react";
import { useIsomorphicLayoutEffect } from "react-use";
import { logNav, PagePropsContext } from "../..";
import { DsNavigationHeadingMenuT, DsNavigationHeadingT } from "../../../lib";

const Menu = ({
  heading,
  onClick,
}: {
  heading?: DsNavigationHeadingT;
  onClick?: () => void;
}): JSX.Element => {
  const { pageProps } = useContext<any>(PagePropsContext);

  const [sidebarMenu, setSidebarMenu] = useState<DsNavigationHeadingMenuT[]>(
    []
  );

  useIsomorphicLayoutEffect(() => {
    if (!heading || !heading?.menu) return;
    setSidebarMenu([...heading.menu]);
  }, [heading]);

  return (
    <nav aria-label={heading.title} className={cl("overflow-x-auto")}>
      <BodyShort as="ul">
        {sidebarMenu.map((item, x) => {
          if (item._type === "subheading") {
            return (
              <button className="group z-10 flex w-full cursor-pointer items-center justify-between pr-[3px] text-text-muted hover:text-deepblue-800 focus:outline-none">
                <Label
                  size="small"
                  key={item.title + x}
                  className="mt-6 py-2  first:mt-0 "
                >
                  {item.title}
                </Label>
                <span className="flex  h-6 w-6  items-center justify-center rounded group-hover:bg-gray-200 group-focus:shadow-focus">
                  <Expand className="text-base" />
                </span>
              </button>
            );
          }
          return (
            <li
              key={item.title + x}
              className={cl(
                "relative before:absolute before:left-0 before:z-[-1] before:transition-colors focus-within:shadow-focus-inset",
                {
                  "before:top-1/2 before:h-6 before:-translate-y-1/2 before:border-l-[8px]  before:border-l-deepblue-300":
                    pageProps?.page?.slug === item?.link?.slug?.current,
                  "before:h-full before:border-l  before:border-l-gray-200 hover:before:border-l-gray-500":
                    pageProps?.page?.slug !== item?.link?.slug?.current,
                }
              )}
            >
              <NextLink href={`/${item.link.slug.current}`} passHref>
                <a
                  onClick={(e) => {
                    onClick && onClick();
                    logNav(
                      "meny",
                      window.location.pathname,
                      e.currentTarget.getAttribute("href")
                    );
                  }}
                  className={cl(
                    "relative flex py-3 no-underline hover:text-deepblue-800 focus:outline-none",
                    {
                      "pl-4  font-semibold text-deepblue-800":
                        pageProps?.page?.slug === item?.link?.slug?.current,
                      "pl-4 text-text-muted": !(
                        pageProps?.page?.slug === item?.link?.slug?.current
                      ),
                    }
                  )}
                >
                  {item.title}
                </a>
              </NextLink>
            </li>
          );
        })}
      </BodyShort>
    </nav>
  );
};

export default Menu;
