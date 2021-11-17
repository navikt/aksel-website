import { Close, Search as SearchIcon } from "@navikt/ds-icons";
import { Popover, TextField } from "@navikt/ds-react";
import { Header } from "@navikt/ds-react-internal";
import algoliasearch from "algoliasearch/lite";
import React, {
  createContext,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import { useClickAway, useEvent, useKey } from "react-use";
import styled, { css } from "styled-components";
import { expandKeyframes, fadeInCss } from "..";
import Hits from "./Hits";

const searchClient = algoliasearch(
  "J64I2SIG7K",
  "92d2ac76eba4eba628a34baa11743fc1"
);

const index = "vk_designsystemet";

const getCategories = (hits: any[]) => {
  const categories = {};
  const order = ["bruk", "design", "utvikling", "tilgjengelighet"];

  /* Guess it works?
   * design -> Buttona
   * tilgjengelighet -> Buttonaaa
   */
  const sorted = hits.sort((a, b) =>
    `${a.title}${"a".repeat(order.indexOf(a.page) + 1 ?? 1)}`.localeCompare(
      `${b.title}${"a".repeat(order.indexOf(b.page) + 1 ?? 1)}`
    )
  );

  sorted.forEach((hit) => {
    categories[hit.category] = Object.prototype.hasOwnProperty.call(
      categories,
      hit.category
    )
      ? [...categories[hit.category], hit]
          .sort((a, b) => a.title.localeCompare(b.title))
          .sort((a, b) => b.high_priority - a.high_priority)
      : [hit];
  });

  return categories;
};

const ScSearch = styled.div<{ $open?: boolean }>`
  display: flex;
  z-index: 1003;
  margin-left: auto;
  align-items: center;
  ${({ $open }) => $open && `width: 100%;`}
`;

const ScButtonCss = css`
  display: flex;
  border: none;
  flex-shrink: 0;
  width: var(--header-height);
  height: var(--header-height);
  justify-content: center;
  align-items: center;
`;

const ScSearchButton = styled(Header.Button)`
  ${ScButtonCss}

  :focus {
    box-shadow: inset 0 0 0 1px
        var(--navds-semantic-color-component-background-inverted),
      inset 0 0 0 3px var(--navds-global-color-blue-200);
  }
`;

const ScCloseButton = styled.button`
  ${ScButtonCss}
  margin-right: 1rem;
  width: 48px;
  height: 48px;
  border-radius: 0 4px 4px 0;
  background-color: var(--navds-semantic-color-canvas-background-default);
  z-index: auto;

  :hover {
    box-shadow: inset 0 0 0 1px white,
      inset 0 0 0 3px var(--navds-semantic-color-focus);
  }

  :focus {
    outline: none;
    box-shadow: inset 0 0 0 2px
        var(--navds-semantic-color-canvas-background-inverted),
      0 0 0 3px var(--navds-global-color-blue-200);
    z-index: 1;
  }
`;

const ScSearchIcon = styled.div`
  ${ScButtonCss}
  width: 48px;
  height: 48px;
  background-color: transparent;
  left: 0;
  position: absolute;
  z-index: 1;
`;

const ScOpenSearchWrapper = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  margin-left: auto;
  justify-content: flex-end;

  padding-left: 0.5rem;

  animation: ${expandKeyframes(false)} 0.2s cubic-bezier(0.215, 0.61, 0.355, 1);
  width: 500px;

  @media (max-width: 768px) {
    animation: ${expandKeyframes(true)} 0.2s cubic-bezier(0.215, 0.61, 0.355, 1);
    width: 100%;
  }
`;

const ScTextField = styled(TextField)`
  width: 100%;
  z-index: 0;

  > input {
    border: none;
    border-radius: 4px 0 0 4px;
    height: 48px;
    font-size: 1.25rem;
    padding: 0 1rem 0 3rem;
    background-color: var(--navds-semantic-color-canvas-background-default);
  }

  > input:hover {
    border-color: var(--navds-semantic-color-canvas-background-inverted);
  }

  > input:focus {
    box-shadow: inset 0 0 0 2px
        var(--navds-semantic-color-canvas-background-inverted),
      0 0 0 3px var(--navds-global-color-blue-200);
    z-index: 1;
  }
`;

const ScPopover = styled(Popover)`
  border: none;
  z-index: -1;
  box-shadow: 0 1px 3px 0 rgba(38, 38, 38, 0.2),
    0 2px 1px 0 rgba(38, 38, 38, 0.12), 0 1px 1px 0 rgba(38, 38, 38, 0.14);
  width: calc(100% - 1rem);
  background-color: transparent;
  ${fadeInCss}
`;

interface SearchContextProps {
  clicked: () => void;
}

export const SearchContext = createContext<SearchContextProps>(null);

const Search = ({ isOpen }: { isOpen?: (state: boolean) => void }) => {
  const searchIndex = useRef(null);
  const [open, setOpen] = useState(false);
  const anchor = useRef(null);
  const searchRef = useRef(null);

  const [query, setQuery] = useState("");
  const [result, setResult] = useState<{ [key: string]: any[] }>({});

  /* User clicks outside search elements */
  useClickAway(searchRef, () => open && setOpen(false));

  /* User presses Esc */
  const handleEsc = () => (query === "" ? setOpen(false) : setQuery(""));
  useKey("Escape", handleEsc, {}, [query]);

  /* Focus is changed */
  const onFocusChange = useCallback(() => {
    !searchRef.current.contains(document.activeElement) && setOpen(false);
  }, []);
  useEvent("focusin", onFocusChange);

  useEffect(() => {
    searchIndex.current = searchClient.initIndex(index);
  }, []);

  useEffect(() => {
    if (!query || query === "") {
      setResult({});
      return;
    }

    searchIndex.current &&
      searchIndex.current
        .search(query)
        .then((res) => setResult(getCategories(res.hits)));
  }, [query]);

  useEffect(() => {
    if (open) {
      anchor.current && anchor.current.focus();
    } else {
      setResult({});
      setQuery("");
    }
    isOpen && isOpen(open);
  }, [open]);

  return (
    <ScSearch role="search" ref={searchRef} $open={open}>
      {open && (
        <ScOpenSearchWrapper>
          <ScSearchIcon>
            <SearchIcon
              style={{ fontSize: "1.5rem", marginLeft: 3 }}
              aria-label="Søk ikon"
              aria-hidden={true}
              role="img"
            />
          </ScSearchIcon>
          <ScTextField
            placeholder="Søk"
            ref={anchor}
            hideLabel
            label="Søk"
            description="Søk etter sider i designsystemet"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            aria-expanded={Object.keys(result).length > 0 || query !== ""}
            aria-haspopup="menu"
            autoComplete="off"
            aria-autocomplete="list"
            type="text"
          />
          <ScCloseButton onClick={() => setOpen(false)}>
            <Close
              style={{ fontSize: "1.5rem" }}
              role="img"
              aria-label="Lukk søk"
            />
            <span className="navds-sr-only">Lukk Søk</span>
          </ScCloseButton>
          <ScPopover
            onClose={() => null}
            anchorEl={anchor.current}
            open={Object.keys(result).length > 0 || query !== ""}
            arrow={false}
            placement={"bottom-start"}
            offset={12}
          >
            <SearchContext.Provider value={{ clicked: () => setOpen(false) }}>
              <Hits ref={anchor} hits={result} value={query} />
            </SearchContext.Provider>
          </ScPopover>
        </ScOpenSearchWrapper>
      )}

      {!open && (
        <ScSearchButton onClick={() => setOpen(!open)}>
          <SearchIcon
            style={{ fontSize: "1.5rem", marginLeft: 3 }}
            aria-label="Åpne søk"
            role="img"
          />
          <span className="navds-sr-only">Åpne søk</span>
        </ScSearchButton>
      )}
    </ScSearch>
  );
};

export default Search;
