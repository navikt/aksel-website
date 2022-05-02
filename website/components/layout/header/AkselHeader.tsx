import { Close, People } from "@navikt/ds-icons";
import { BodyShort, Heading } from "@navikt/ds-react";
import cl from "classnames";
import NextLink from "next/link";
import React, { useContext, useState /* , { useContext } */ } from "react";
import { logNav, Search } from "../..";
import AkselLogo from "../../assets/AkselLogo";
import { AuthenticationContext } from "../../website-modules/utils";
import Toggle from "./menu/Toggle";

const AkselHeader = ({
  className,
  frontPage,
}: {
  className?: string;
  frontPage?: boolean;
}): JSX.Element => {
  const [openProfile, setOpenProfile] = useState(false);
  const context = useContext(AuthenticationContext);

  const button = (
    <>
      {openProfile ? (
        <Close
          className="pointer-events-none text-2xl"
          aria-label="Lukk profil-meny"
        />
      ) : (
        <People
          className="pointer-events-none text-2xl"
          aria-label="Åpne profil-meny"
        />
      )}
    </>
  );

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
          <Toggle
            inverted
            open={openProfile}
            setOpen={setOpenProfile}
            buttonContent={button}
            menu={
              <div className="pt-4">
                <dl>
                  <Heading as="dt" size="xsmall" className="mx-4 mb-2">
                    Bruker
                  </Heading>
                  <BodyShort className="mx-4">{context?.user?.name}</BodyShort>
                  <BodyShort className="mx-4">{context?.user?.mail}</BodyShort>
                </dl>
                <hr className="mt-2 border-divider" />
                <button
                  className="flex h-full w-full rounded-b px-4 py-4 text-link hover:bg-interaction-primary-hover-subtle focus:shadow-[inset_0_0_0_2px_var(--navds-global-color-blue-800)] focus:outline-none"
                  onClick={() => context.logout()}
                >
                  Logg ut
                </button>
              </div>
            }
          />
          {!frontPage && <Search inverted />}
        </span>
      </div>
    </header>
  );
};

export default AkselHeader;
