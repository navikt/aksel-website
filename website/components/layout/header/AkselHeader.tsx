import NextLink from "next/link";
import React /* , { useContext } */ from "react";
import { logNav, Search } from "../..";
import cl from "classnames";
import AkselLogo from "../../assets/AkselLogo";
/* import { AuthenticationContext } from "../../website-modules/utils"; */

const AkselHeader = ({
  className,
  frontPage,
}: {
  className?: string;
  frontPage?: boolean;
}): JSX.Element => {
  /* const context = useContext(AuthenticationContext);
  console.log(context); */

  return (
    <header className={cl("flex justify-center", className)}>
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
        {!frontPage && <Search inverted />}
      </div>
    </header>
  );
};

export default AkselHeader;
