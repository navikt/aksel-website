import cl from "classnames";
import NextLink from "next/link";
import React from "react";
import { logNav, Search } from "../..";
import AkselLogo from "../../assets/AkselLogo";
import ProfileDropdown from "./ProfileDropdown";

const AkselHeader = ({
  className,
  frontPage,
}: {
  className?: string;
  frontPage?: boolean;
}): JSX.Element => {
  return (
    <header className={cl("z-[1050] flex justify-center ", className)}>
      <div className="flex w-full max-w-aksel-max-w justify-between">
        {!frontPage && (
          <a className="skiplink" href="#hovedinnhold" tab-index={-1}>
            Hopp til innhold
          </a>
        )}
        <NextLink href="/" passHref>
          <a
            className="flex h-full items-center gap-2 px-4 py-3 hover:bg-gray-800/10 focus:shadow-focus-inset focus:outline-none"
            onClick={(e) =>
              logNav(
                "header",
                window.location.pathname,
                e.currentTarget.getAttribute("href")
              )
            }
          >
            <AkselLogo className="h-10 w-10 text-deepblue-800" aria-hidden />
            <span className="text-2xl">Aksel</span>
          </a>
        </NextLink>
        <span className="flex">
          <ProfileDropdown />
          {!frontPage && <Search inverted />}
        </span>
      </div>
    </header>
  );
};

export default AkselHeader;
