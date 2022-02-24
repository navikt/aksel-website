import { Back, Close, Hamburger, Next } from "@navikt/ds-icons";
import { Detail, Heading } from "@navikt/ds-react";
import cl from "classnames";
import NextLink from "next/link";
import React, { useContext, useEffect, useState } from "react";
import { LayoutContext, PagePropsContext } from "../../..";
import { DsNavigationHeadingT } from "../../../../lib";
import Menu from "../../menu/DesignsystemMenu";
import Toggle from "./Toggle";

const MobileNavigation = () => {
  const context = useContext(LayoutContext);
  const { pageProps } = useContext<any>(PagePropsContext);
  const [open, setOpen] = useState(false);
  const [heading, setHeading] = useState(context?.activeHeading);
  const [level, setLevel] = useState(0);

  useEffect(() => {
    context?.activeHeading && setHeading(context.activeHeading);
  }, [context?.activeHeading]);

  const button = (
    <>
      {open ? (
        <Close
          className="pointer-events-none text-2xl"
          aria-label="Lukk meny"
        />
      ) : (
        <Hamburger
          className="pointer-events-none text-2xl"
          aria-label="Åpne meny"
        />
      )}
    </>
  );

  const headingMenu = pageProps?.navigation?.headings && (
    <>
      {
        <ul className="hidden animate-fadeIn lg:block xl:hidden">
          {pageProps?.navigation.headings.map(
            (heading: DsNavigationHeadingT) => (
              <li
                key={heading._key}
                className={cl(
                  "first-of-type:rounded-t last-of-type:rounded-b focus-within:shadow-focus-inset hover:bg-canvas-background",
                  {
                    "border-l-[6px] border-l-canvas-background-inverted bg-canvas-background":
                      context?.activeHeading?.title === heading.title,
                  }
                )}
              >
                <NextLink href={`/${heading.link_ref.slug.current}`} passHref>
                  <a
                    className={cl(
                      "flex min-h-[48px] w-full items-center justify-between bg-none py-3 pr-4 pl-8 text-text no-underline focus:outline-none",
                      {
                        "pl-[26px] font-semibold":
                          context?.activeHeading?.title === heading.title,
                      }
                    )}
                    onClick={() => {
                      setHeading(heading);
                      setOpen(false);
                    }}
                  >
                    {heading?.title}
                  </a>
                </NextLink>
              </li>
            )
          )}
        </ul>
      }
      <ul
        className={cl({
          "block animate-fadeIn lg:hidden xl:block": !heading || level === 0,
          hidden: level === 1,
        })}
      >
        {pageProps?.navigation.headings.map((heading: DsNavigationHeadingT) => (
          <li
            key={heading._key}
            className={cl(
              "first-of-type:rounded-t last-of-type:rounded-b focus-within:shadow-focus-inset hover:bg-canvas-background",
              {
                "border-l-[6px] border-l-canvas-background-inverted bg-canvas-background":
                  context?.activeHeading?.title === heading.title,
              }
            )}
          >
            <button
              className={cl(
                "flex min-h-[48px] w-full items-center justify-between bg-none py-3 pr-4 pl-8 text-text no-underline focus:outline-none",
                {
                  "pl-[26px] font-semibold":
                    context?.activeHeading?.title === heading.title,
                }
              )}
              onClick={() => {
                setHeading(heading);
                setLevel(1);
              }}
            >
              {heading?.title}
              <Next aria-hidden aria-label={`åpne ${heading?.title} menyen`} />
            </button>
          </li>
        ))}
      </ul>
    </>
  );

  const menu = (
    <>
      {heading && (
        <div className={cl("animate-fadeIn", { hidden: level === 0 })}>
          <Heading
            onClick={() => setLevel(0)}
            as="button"
            size="xsmall"
            className="flex w-full items-center gap-2 rounded-t-[4px] border-none bg-none px-2 py-4 text-text hover:bg-canvas-background hover:underline focus:shadow-focus-inset focus:outline-none"
          >
            <Back aria-hidden aria-label="tilbake til hovedmeny" />
            Tilbake
          </Heading>
          <Detail
            size="small"
            className="heading--active bg-component-background-alternate p-2 uppercase"
          >
            {heading.title}
          </Detail>
          <Menu
            inCategory={level === 0}
            heading={heading}
            onClick={() => setOpen(false)}
            mobileNavigation
            className="mt-0 max-h-[512px] animate-fadeIn overflow-y-auto"
          />
        </div>
      )}
    </>
  );

  return (
    <Toggle
      isHamburger
      open={open}
      setOpen={setOpen}
      buttonContent={button}
      menu={
        <>
          {headingMenu}
          {menu}
        </>
      }
    />
  );
};

export default MobileNavigation;
