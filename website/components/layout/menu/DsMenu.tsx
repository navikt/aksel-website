import { Expand } from "@navikt/ds-icons";
import { Label } from "@navikt/ds-react";
import cl from "classnames";
import NextLink from "next/link";
import React, { useContext, useMemo, useState } from "react";
import { useIsomorphicLayoutEffect } from "react-use";
import { logNav, PagePropsContext } from "../..";
import { DsNavigationHeadingMenuT, DsNavigationHeadingT } from "../../../lib";
import style from "./index.module.css";

const Menu = ({
  heading,
  onClick,
}: {
  heading?: DsNavigationHeadingT;
  onClick?: () => void;
}): JSX.Element => {
  const { pageProps } = useContext<any>(PagePropsContext);

  const groups = () => {
    if (!heading.menu || heading.menu.length === 0) return;

    const list = [];
    let last = 0;
    heading.menu.forEach((x, y) => {
      if (x._type === "subheading") {
        list.push(heading.menu.slice(last, y));
        last = y;
      } else if (y === heading.menu.length - 1) {
        list.push(heading.menu.slice(last, heading.menu.length));
      }
    });

    return list;
  };

  const NavItem = ({
    item,
    inDropdown = false,
  }: {
    item: DsNavigationHeadingMenuT;
    inDropdown?: boolean;
  }) => (
    <li
      className={cl(
        style.item,
        "peer relative before:absolute before:left-0 before:z-[-1] before:transition-colors focus-within:shadow-focus-inset",
        {
          "before:top-1/2 before:h-6 before:-translate-y-1/2 before:border-l-[8px] before:border-l-deepblue-300":
            pageProps?.page?.slug === item?.link?.slug?.current,
          "before:h-full before:border-l  before:border-l-gray-200 hover:before:border-l-gray-500":
            pageProps?.page?.slug !== item?.link?.slug?.current && inDropdown,
          "px-2": inDropdown,
          "px-0": !inDropdown,
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
            "relative flex px-2 py-3 no-underline hover:text-deepblue-800 focus:outline-none",
            {
              "font-semibold text-deepblue-800":
                pageProps?.page?.slug === item?.link?.slug?.current,
              "text-text-muted": !(
                pageProps?.page?.slug === item?.link?.slug?.current
              ),
              "pl-4":
                !inDropdown &&
                pageProps?.page?.slug === item?.link?.slug?.current,
            }
          )}
        >
          {item.title}
        </a>
      </NextLink>
    </li>
  );

  const Dropdown = ({ items }: { items: DsNavigationHeadingMenuT[] }) => {
    const [heading, ...rest] = items;
    const [open, setOpen] = useState(false);

    useIsomorphicLayoutEffect(() => {
      if (items.find((x) => x?.link?.slug?.current === pageProps?.page?.slug)) {
        setOpen(true);
      }
    }, []);

    return (
      <li
        key={heading.title}
        data-open={open}
        className={cl(style.dropdown, "w-full")}
      >
        <button
          onClick={() => setOpen(!open)}
          className="group z-10 flex w-full cursor-pointer items-center justify-between px-2 text-text-muted hover:text-deepblue-800 focus:outline-none"
          aria-expanded={open}
        >
          <Label size="small" className="mt-6 py-2 first:mt-0">
            {heading.title}
          </Label>
          <span className="flex h-6 w-6 items-center justify-center rounded group-hover:bg-gray-200 group-focus:shadow-focus">
            <Expand
              className="text-base"
              title={!open ? `åpne ${heading.title}` : `lukk ${heading.title}`}
            />
          </span>
        </button>

        <ul hidden={!open} className="px-2">
          {rest.map((z) => (
            <NavItem item={z} key={z._key} inDropdown />
          ))}
        </ul>
      </li>
    );
  };

  const lists = useMemo(() => {
    const menulist = groups();
    return (
      <ul>
        {menulist
          ? menulist.map((x: DsNavigationHeadingMenuT[], y) => {
              return x[0]._type === "item" ? (
                // eslint-disable-next-line react/prop-types
                x.map((item) => <NavItem item={item} key={item._key} />)
              ) : (
                <Dropdown items={x} key={y} />
              );
            })
          : null}
      </ul>
    );
  }, [heading.menu]);

  return (
    <nav aria-label={heading.title} className={cl("overflow-x-auto")}>
      {lists}
    </nav>
  );
};

export default Menu;
