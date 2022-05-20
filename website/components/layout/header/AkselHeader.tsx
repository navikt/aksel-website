import cl from "classnames";
import NextLink from "next/link";
import React from "react";
import { logNav, Search } from "../..";
import AkselLogo from "../../assets/AkselLogo";
import ProfileDropdown from "./ProfileDropdown";

const AkselHeader = ({
  variant,
}: {
  variant?: "forside" | "tema" | "artikkel";
}): JSX.Element => {
  return (
    <header
      className={cl(
        "group sticky top-0 z-20 w-full shadow-header backdrop-blur transition-colors duration-200 ease-out",
        {
          "bg-deepblue-900/90 text-white hover:bg-deepblue-900":
            variant === "forside",
          "bg-gray-50/80 text-deepblue-800 hover:bg-gray-100/80":
            variant === "artikkel",
          "bg-white text-deepblue-800 hover:bg-gray-200": variant === "tema",
        }
      )}
    >
      <div className="mx-auto flex max-w-aksel justify-between xs:w-[90%]">
        <a className="skiplink" href="#hovedinnhold" tab-index={-1}>
          Hopp til innhold
        </a>

        <NextLink href="/" passHref>
          <a
            className={cl("flex gap-3 px-4 py-3 focus:outline-none", {
              "hover:bg-gray-100/10 focus:shadow-focus-inverted-inset":
                variant === "forside",
              "hover:bg-gray-900/10 focus:shadow-focus-inset":
                variant === "artikkel" || variant === "tema",
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
            <span className="text-2xl">Aksel</span>
          </a>
        </NextLink>
        <span className="flex">
          <ProfileDropdown />
          <Search
            variant={variant === "forside" ? "aksel-inverted" : "aksel"}
          />
        </span>
      </div>
    </header>
  );
};

export default AkselHeader;
