import React from "react";
import { createPortal } from "react-dom";
import { DocSearchModal, useDocSearchKeyboardEvents } from "@docsearch/react";
import { Search as SearchIcon } from "@navikt/ds-icons";

function Search() {
  const searchButtonRef = React.useRef(null);
  const [isOpen, setIsOpen] = React.useState(false);
  const [initialQuery, setInitialQuery] = React.useState(null);

  const onOpen = React.useCallback(() => {
    setIsOpen(true);
  }, [setIsOpen]);

  const onClose = React.useCallback(() => {
    setIsOpen(false);
  }, [setIsOpen]);

  const onInput = React.useCallback(
    (event) => {
      setIsOpen(true);
      setInitialQuery(event.key);
    },
    [setIsOpen, setInitialQuery]
  );

  useDocSearchKeyboardEvents({
    isOpen,
    onOpen,
    onClose,
    onInput,
    searchButtonRef,
  });

  return (
    <>
      <button
        ref={searchButtonRef}
        onClick={onOpen}
        className="z-[1050] text-text-inverted w-[var(--header-height)] shrink-0 flex justify-center items-center ml-auto hover:bg-gray-800"
      >
        <SearchIcon className="h-6 w-6 ml-[3px]" aria-label="åpne søk" />
      </button>
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
                navigateText: "Naviger",
                closeText: "lukk",
                searchByText: "Søk fra",
              },
              noResultsScreen: {
                noResultsText: "Ingen resultater for",
                suggestedQueryText: "Prøv disse søkene",
                openIssueText: "Tenker du dette søket bør gi et resultat?",
                openIssueLinkText: "Send oss en melding, så fikser vi!",
              },
            }}
            appId="J64I2SIG7K"
            indexName="aksel_docsearch"
            apiKey="92d2ac76eba4eba628a34baa11743fc1"
            onClose={onClose}
            initialScrollY={window.scrollY}
            initialQuery={initialQuery}
            placeholder="Søk i dokumentasjon"
          />,
          document.body
        )}
    </>
  );
}

export default Search;
