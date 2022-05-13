import cl from "classnames";
import NextLink from "next/link";
import React from "react";
import { logNav, Search } from "../..";
import AkselLogo from "../../assets/AkselLogo";
import ProfileDropdown from "./ProfileDropdown";

const AkselHeader = ({ frontPage }: { frontPage?: boolean }): JSX.Element => {
  return (
    <header
      className={cl(
        "group sticky top-0 z-20 w-full shadow-header backdrop-blur transition-colors duration-200 ease-out",
        {
          "bg-deepblue-900 text-white hover:bg-deepblue-800": frontPage,
          "bg-gray-50/80 text-deepblue-800 hover:bg-gray-100/80": !frontPage,
        }
      )}
    >
      <div className="xs:w-[90%] mx-auto flex max-w-aksel justify-between">
        <a className="skiplink" href="#hovedinnhold" tab-index={-1}>
          Hopp til innhold
        </a>

        <NextLink href="/" passHref>
          <a
            className={cl("block px-4 py-3 focus:outline-none xl:-ml-4", {
              "hover:bg-gray-100/10 focus:shadow-focus-inverted-inset":
                frontPage,
              "hover:bg-gray-800/10 focus:shadow-focus-inset": !frontPage,
            })}
            onClick={(e) =>
              logNav(
                "header",
                window.location.pathname,
                e.currentTarget.getAttribute("href")
              )
            }
          >
            <AkselLogo className="h-7 w-7" aria-hidden />
            <span className="sr-only">Aksel</span>
          </a>
        </NextLink>
        <span className="flex">
          <ProfileDropdown />
          <Search variant={frontPage ? "aksel-inverted" : "aksel"} />
        </span>
      </div>
    </header>
  );
};

export default AkselHeader;
