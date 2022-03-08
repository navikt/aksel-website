import React from "react";
import { createPortal } from "react-dom";
import { DocSearchModal, useDocSearchKeyboardEvents } from "@docsearch/react";
import { Search as SearchIcon } from "@navikt/ds-icons";
import { DocSearchHit } from "@docsearch/react/dist/esm/types";
import cl from "classnames";
import { BodyShort } from "@navikt/ds-react";

function Search({ inverted, full }: { inverted?: boolean; full?: boolean }) {
  const [isOpen, setIsOpen] = React.useState(false);
  const searchButtonRef = React.useRef(null);

  const onOpen = React.useCallback(() => {
    setIsOpen(true);
  }, [setIsOpen]);

  const onClose = React.useCallback(() => {
    setIsOpen(false);
  }, [setIsOpen]);

  const onInput = React.useCallback(() => {
    setIsOpen(true);
  }, [setIsOpen]);

  useDocSearchKeyboardEvents({
    isOpen,
    onOpen,
    onClose,
    onInput,
    searchButtonRef,
  });

  const sortItems = (i: DocSearchHit[]): DocSearchHit[] => {
    const getIndex = (x: string) => {
      return ["lvl1", "lvl2", "lvl3", "lvl4"].indexOf(x);
    };

    return i.sort((a, b) => {
      return getIndex(a.type) - getIndex(b.type);
    });
  };

  return (
    <>
      {full ? (
        <BodyShort
          ref={searchButtonRef}
          onClick={onOpen}
          as="button"
          className="relative w-full max-w-[28rem] rounded border border-border bg-white py-4 pr-4 pl-16 text-left hover:border-link focus:shadow-focus focus:outline-none"
        >
          <SearchIcon
            aria-hidden
            className="absolute left-6 top-1/2 -translate-y-1/2 text-[1.5rem]"
          />
          CMD + K / CTRL + K for å søke
        </BodyShort>
      ) : (
        <button
          ref={searchButtonRef}
          onClick={onOpen}
          className={cl(
            "z-[1050] ml-auto flex w-header shrink-0 items-center justify-center focus:outline-none",
            {
              " text-text hover:bg-gray-800/10 focus:shadow-focus-inset":
                inverted,
              "text-text-inverted hover:bg-gray-800 focus:shadow-[inset_0_0_0_1px_var(--navds-global-color-gray-900),inset_0_0_0_3px_var(--navds-global-color-blue-200)]":
                !inverted,
            }
          )}
        >
          <span className="navds-sr-only">Åpne søk</span>
          <SearchIcon className="ml-[3px] h-6 w-6" aria-hidden />
        </button>
      )}

      {isOpen &&
        createPortal(
          <DocSearchModal
            translations={{
              searchBox: {
                resetButtonTitle: "Slett søketekst",
                resetButtonAriaLabel: "Slett søketekst",
                cancelButtonText: "avbryt",
                cancelButtonAriaLabel: "avbryt",
              },
              startScreen: {
                recentSearchesTitle: "Nylige",
                noRecentSearchesText: "Ingen nylige søk",
                saveRecentSearchButtonTitle: "Lagre søk",
                removeRecentSearchButtonTitle: "Fjern søket fra historien",
                favoriteSearchesTitle: "Favoritter",
                removeFavoriteSearchButtonTitle: "Fjern søket fra favoritter",
              },
              errorScreen: {
                titleText: "Klarer ikke hente resultater..",
                helpText: "Det kan hende du ikke er koblet til internett.",
              },
              footer: {
                selectText: "Velg",
                navigateText: "Navigere søk",
                closeText: "Lukk søk",
                searchByText: "Søk fra",
              },
              noResultsScreen: {
                noResultsText: "Ingen resultater for",
                suggestedQueryText: "Prøv disse søkene",
                openIssueText: "Bør søket gi et resultat?",
                openIssueLinkText: "Send oss en melding, så fikser vi",
              },
            }}
            appId="J64I2SIG7K"
            indexName="aksel_docsearch"
            apiKey="92d2ac76eba4eba628a34baa11743fc1"
            onClose={onClose}
            initialScrollY={window.scrollY}
            placeholder="Søk i dokumentasjon"
            transformItems={(i) => sortItems(i)}
          />,
          document.body
        )}
    </>
  );
}

export default Search;
