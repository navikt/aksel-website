import { Search as SearchIcon } from "@navikt/ds-icons";
import { BodyShort, Heading, Label, Search } from "@navikt/ds-react";
import cl from "classnames";
import React, {
  useEffect /* , { useEffect, useRef, useState } */,
  useState,
} from "react";
import algoliasearch from "algoliasearch/lite";
import {
  InstantSearch,
  useHits,
  useSearchBox,
  Configure,
  HierarchicalMenu,
  RefinementList,
} from "react-instantsearch-hooks-web";

import Modal from "react-modal";
import { useDebounce } from "@/utils";

const searchClient = algoliasearch(
  "J64I2SIG7K",
  "92d2ac76eba4eba628a34baa11743fc1"
);

const SearchBox = () => {
  const { query, refine, clear } = useSearchBox();
  const [value, setValue] = useState(query);
  const debouncedValue = useDebounce(value, 200);

  useEffect(() => {
    /* debouncedValue && */ refine(debouncedValue);
    /* !debouncedValue && clear(); */
  }, [debouncedValue]);

  useEffect(() => {
    setValue(query);
  }, [query]);

  return (
    <div className="mx-auto max-w-lg" data-theme="dark">
      <Search
        label="Søk i alle aksel-sider"
        variant="simple"
        value={value}
        onChange={(e) => setValue(e)}
        onClear={() => clear()}
      />
    </div>
  );
};

const Hit = ({ hit }: { hit: any }) => {
  const Tema = () => (
    <div>
      <Label>Tema</Label>
      {hit?.tema?.map?.((x) => (
        <BodyShort key={x}>{x}</BodyShort>
      ))}
    </div>
  );

  const type = () => {
    const types = {
      aksel_artikkel: "Aksel artikkel",
      aksel_prinsipp: "Aksel prinsipp",
      aksel_blogg: "Aksel blogg",
      ds_artikkel: "Designsystem artikkel",
      ds_component_page: "Komponent",
      komponent_artikkel: "Komponent",
    };
    return types[hit._type];
  };

  return (
    <div className="py-4">
      <a
        href={`/${hit.url}`}
        className="group hover:underline  focus:no-underline focus:outline-none"
      >
        <Heading level="2" size="small">
          {hit.heading}
        </Heading>
      </a>
      <div className="flex gap-2">
        {/* <BodyShort>{type()}</BodyShort> */}
        {/* {hit.tema && <Tema />} */}
      </div>
    </div>
  );
};

const Hits = () => {
  const { hits, results, ...rest } = useHits();

  const [showedResults, setShowedResults] = useState<number>(20);

  /* console.log({ hits, results, rest: rest }); */

  if (/* !results?.query || results?.query === "" */ false) {
    return (
      <div className="mx-auto w-full max-w-lg text-white sm:w-[90%]">
        <ul className="mt-10 divide-y divide-gray-300 text-3xl text-text-inverted md:mt-24">
          <li>
            <a className="inline-block py-3" href="/topic">
              Tema
            </a>
          </li>
          <li>
            <a className="inline-block py-3" href="#">
              Prinsipper
            </a>
          </li>
          <li>
            <a className="inline-block py-3" href="#">
              Blogg
            </a>
          </li>
        </ul>
      </div>
    );
  }

  return (
    <div className="mx-auto w-full max-w-xl divide-y divide-gray-300/60 py-10 text-white sm:w-[90%] md:py-24">
      <Heading level="2" size="large">
        Søketreff: {hits.length}
      </Heading>
      <ul className="mt-3 divide-y divide-gray-300/30 overflow-auto  text-3xl text-text-inverted ">
        {hits.map((x, i) => (
          <Hit key={i} hit={x} />
        ))}
      </ul>
    </div>
  );
};

const SearchNew = ({
  variant = "ds",
}: {
  variant?: "ds" | "aksel-inverted" | "aksel";
}) => {
  const [open, setOpen] = useState<boolean>(false);

  useEffect(() => {
    Modal.setAppElement("#__next");
  }, []);

  useEffect(() => {
    open
      ? document.body?.parentElement?.classList.add(
          ...["overflow-hidden", "search-open"]
        )
      : document.body?.parentElement?.removeAttribute("class");
  }, [open]);

  return (
    <>
      <button
        onClick={() => setOpen((x) => !x)}
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
      <Modal
        isOpen={open}
        className={cl(
          "relative min-h-full w-full px-4 backdrop-blur focus:outline-none",
          {
            "bg-gray-900": variant === "ds",
            "bg-deepblue-900": variant !== "ds",
          }
        )}
        overlayClassName="z-[9999] inset-0 fixed top-14 overflow-auto"
        onRequestClose={() => setOpen(false)}
        contentLabel="Søk"
      >
        <InstantSearch
          searchClient={searchClient}
          indexName="aksel_search"
          /* searchFunction={(h) => {
            h.state.query && h.search();
            console.log(h);
          }} */
        >
          <div className="mx-auto w-full max-w-2xl pt-32 text-white sm:w-[90%]">
            <Configure typoTolerance={true} distinct={true} hitsPerPage={200} />
            <SearchBox />
            <Hits />
          </div>
        </InstantSearch>
      </Modal>
    </>
  );
};

export default SearchNew;

/* function Search({
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
            hitComponent={HitComp}
          />,
          document.body
        )}
    </>
  );
} */

/* export default Search; */
