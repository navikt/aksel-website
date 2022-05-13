import { DocSearchModal, useDocSearchKeyboardEvents } from "@docsearch/react";
import { DocSearchHit } from "@docsearch/react/dist/esm/types";
import { Search as SearchIcon } from "@navikt/ds-icons";
import { BodyShort /* , Button, Search as DsSearch */ } from "@navikt/ds-react";
/* import algoliasearch from "algoliasearch/lite"; */
import cl from "classnames";
import React /* , { useEffect, useRef, useState } */ from "react";
import { createPortal } from "react-dom";
/* import Modal from "react-modal";
import style from "./index.module.css"; */

/* const searchClient = algoliasearch(
  "J64I2SIG7K",
  "92d2ac76eba4eba628a34baa11743fc1"
);

const index = "aksel_docsearch"; */

/* const SearchNew = ({ inverted }: { inverted?: boolean }) => {
  const [open, setOpen] = useState(true);
  const [query, setQuery] = useState("");
  const [result, setResult] = useState<any>({});
  const searchIndex = useRef(null);

  useEffect(() => {
    Modal.setAppElement("#__next");
    searchIndex.current = searchClient.initIndex(index);
  }, []);

  useEffect(() => {
    if (!query || query === "") {
      setResult({});
      return;
    }

    searchIndex.current &&
      searchIndex.current
        .search(query, { typoTolerance: false, hitsPerPage: 200 })
        .then((res) => setResult(res));
  }, [query]);

  console.log(result);
  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className={cl(
          "ml-auto flex w-header shrink-0 items-center justify-center focus:outline-none",
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
      <Modal
        className="flex h-full w-full justify-center overflow-x-auto bg-gray-50 focus:outline-none"
        isOpen={open}
        onRequestClose={() => setOpen(false)}
      >
        <div className="relative flex w-full max-w-6xl justify-center py-36 px-4 sm:px-6 lg:px-12">
          <Button
            onClick={() => setOpen(false)}
            variant="tertiary"
            className="absolute top-4 right-4 sm:top-6 sm:right-6 lg:top-12 lg:right-12"
          >
            Lukk
          </Button>
          <div className="w-full max-w-5xl">
            <div className={cl(style.wrapper)} role="search">
              <DsSearch
                label="Søk i alle sider på nettsiden"
                value={query}
                onChange={(e) => setQuery(e)}
              />
            </div>
            {result?.hits?.map((x, y) => (
              <li key={y}>{x.url}</li>
            ))}
          </div>
        </div>
      </Modal>
    </>
  );
}; */

/* const HitComp = ({
  hit,
  children,
}: {
  hit: DocSearchHit;
  children: React.ReactNode;
}) => {
  hit.hierarchy.lvl0 && console.log(hit);
  return (
    <div className="ais-result">
      {hit.hierarchy.lvl0 && (
        <div className="ais-lvl0">
          <a href="{{{url}}}">
            <h4>{hit?.hierarchy?.lvl0}</h4>
          </a>
        </div>
      )}

      <div class="ais-lvl1 breadcrumbs">
      {{#hierarchy.lvl1}} {{{_highlightResult.hierarchy.lvl1.value}}} {{/hierarchy.lvl1}} {{#hierarchy.lvl2}} > {{{_highlightResult.hierarchy.lvl2.value}}} {{/hierarchy.lvl2}} {{#hierarchy.lvl3}} > {{{_highlightResult.hierarchy.lvl3.value}}} {{/hierarchy.lvl3}}
      {{#hierarchy.lvl4}} > {{{_highlightResult.hierarchy.lvl4.value}}} {{/hierarchy.lvl4}}
    </div>

    <div class="ais-content">
      {{{#content}}} {{{_highlightResult.content.value}}} {{{/content}}}
    </div>
    </div>
  );
}; */

function Search({
  variant = "ds",
  full,
}: {
  variant?: "ds" | "aksel-inverted" | "aksel";
  full?: boolean;
}) {
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

  const cleanUrl = (url: string) => {
    const newUrl = new URL(url);
    newUrl.search = "";
    return newUrl.toString();
  };

  const sortItems = (i: DocSearchHit[]): DocSearchHit[] => {
    const cleaned = i.map((x) => ({ ...x, url: cleanUrl(x.url) }));

    const uniqueHits = Array.from(new Set(cleaned.map((a) => a.url))).map(
      (url) => {
        return cleaned.find((a) => a.url === url);
      }
    );

    return [uniqueHits[0]];
  };

  return (
    <>
      {full ? (
        <BodyShort
          ref={searchButtonRef}
          onClick={onOpen}
          as="button"
          className="group relative w-full max-w-[28rem] rounded border border-border bg-white py-4 pr-4 pl-16 text-left hover:border-link focus:shadow-focus focus:outline-none"
        >
          <SearchIcon
            aria-hidden
            className="absolute left-6 top-1/2 -translate-y-1/2 text-[1.5rem]"
          />
          <span aria-hidden>Åpne søk</span>
        </BodyShort>
      ) : (
        <button
          ref={searchButtonRef}
          onClick={onOpen}
          className={cl(
            "z-[1050] ml-auto flex w-header shrink-0 items-center justify-center focus:outline-none",
            {
              " text-text-inverted hover:bg-gray-100/10 focus:shadow-focus-inverted-inset":
                variant === "aksel-inverted",
              "hover:bg-gray-800/10 focus:shadow-focus-inset":
                variant === "aksel",
              "text-text-inverted hover:bg-gray-800 focus:shadow-[inset_0_0_0_1px_var(--navds-global-color-gray-900),inset_0_0_0_3px_var(--navds-global-color-blue-200)]":
                variant === "ds",
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
            transformItems={sortItems}
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
            searchParameters={{ typoTolerance: false, distinct: true }}
            /* hitComponent={HitComp} */
          />,
          document.body
        )}
    </>
  );
}

export default Search;
