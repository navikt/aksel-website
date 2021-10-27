import { Close, Search as SearchIcon } from "@navikt/ds-icons";
import {
  BodyLong,
  BodyShort,
  Detail,
  Popover,
  TextField,
} from "@navikt/ds-react";
import { Header } from "@navikt/ds-react-internal";
import algoliasearch from "algoliasearch/lite";
import { motion } from "framer-motion";
import NextLink from "next/link";
import React, {
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { useClickAway, useEvent, useKey, useUpdateEffect } from "react-use";
import styled from "styled-components";
import { AlgoliaIcon } from "..";
import { LayoutContext } from "../templates/layout/Layout";

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
      ? [...categories[hit.category], hit].sort((a, b) =>
          a.title.localeCompare(b.title)
        )
      : [hit];
  });

  return categories;
};

const ScWrapper = styled.div<{ $open?: boolean }>`
  display: flex;
  z-index: 1003;
  margin-left: auto;
  align-items: center;
  ${({ $open }) => $open && `width: 100%;`}
  padding-left: 1rem;
`;

const ScSearchButton = styled(Header.Button)`
  border: none;
  flex-shrink: 0;
  width: var(--header-height);
  height: var(--header-height);
  justify-content: center;
`;

const ScInputButton = styled.button`
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
  width: var(--header-height);
  height: var(--header-height);
  margin-right: 1rem;
  width: 48px;
  height: 48px;
  border-radius: 0 4px 4px 0;
  background-color: var(--navds-color-gray-10);
  flex-shrink: 0;
  /* border: 1px solid var(--navds-color-gray-60); */

  :hover {
    box-shadow: inset 0 0 0 1px white,
      inset 0 0 0 3px var(--navds-color-blue-80);
  }

  :focus {
    outline: none;
    box-shadow: inset 0 0 0 1px white,
      inset 0 0 0 3px var(--navds-color-blue-80);
  }
`;

const ScSearchIcon = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 48px;
  height: var(--header-height);
  height: 48px;
  background-color: transparent;
  flex-shrink: 0;
  left: 0;
  /* border: 1px solid var(--navds-color-gray-60); */
  position: absolute;
  :focus {
    outline: none;
    box-shadow: inset 0 0 0 1px white,
      inset 0 0 0 3px var(--navds-color-blue-80);
  }
`;

const ScInputWrapper = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  margin-left: auto;
  width: 100%;
  justify-content: flex-end;
`;

const ScTextField = styled(TextField)<{ $tablet: boolean }>`
  width: 100%;
  /* ${(props) => !props.$tablet && `max-width: 400px;`} */
  flex-grow: 1;

  > input {
    border: none;
    border-radius: 4px 0 0 4px;
    height: var(--header-height);
    height: 48px;
    font-size: 1.25rem;
    padding: 0 1rem 0 3rem;
    background-color: var(--navds-color-gray-10);
  }
  > input:focus {
    box-shadow: inset 0 0 0 1px white,
      inset 0 0 0 3px var(--navds-color-blue-80);
  }

  > input:hover {
    border-color: var(--navds-color-gray-90);
  }
`;

const ScPopover = styled(Popover)`
  border: none;
  z-index: -1;
  border-radius: 0 0 4px 4px;
  box-shadow: 0 0 8px 0 rgba(0, 36, 58, 0.08), 0 0 6px 0 rgba(0, 36, 58, 0.12);
  width: calc(100% - 1rem);
  background-color: var(--navds-color-gray-10);
`;

const Search = ({ isOpen }: { isOpen?: (state: boolean) => void }) => {
  const context = useContext(LayoutContext);
  const searchIndex = useRef(null);
  const [open, setOpen] = useState(false);
  const anchor = useRef(null);
  const searchRef = useRef(null);

  const [query, setQuery] = useState("");
  const [result, setResult] = useState<{ [key: string]: any[] }>({});

  const handleEsc = () => (query === "" ? setOpen(false) : setQuery(""));
  useKey("Escape", handleEsc, {}, [query]);

  useClickAway(searchRef, () => open && setOpen(false));

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
    !open && setResult({});
    !open && setQuery("");
    open && anchor.current && anchor.current.focus();
    isOpen && isOpen(open);
  }, [open]);

  const inputVariants = (isTablet) => {
    return isTablet
      ? {
          initial: { y: 0, width: "0", opacity: 0 },
          animate: { y: 0, width: "100%", opacity: 1 },
        }
      : {
          animate: { y: 0, width: "500px", opacity: 1 },
          initial: { y: 0, width: "0", opacity: 0 },
        };
  };

  return (
    <ScWrapper ref={searchRef} $open={open}>
      {open && (
        <ScInputWrapper
          as={motion.div}
          key="MainMenuKey"
          transition={{ type: "tween", duration: 0.25 }}
          {...inputVariants(context.isTablet)}
        >
          <ScSearchIcon tabIndex={-1}>
            <SearchIcon
              style={{ fontSize: "1.5rem", marginLeft: 3 }}
              aria-label="Søk ikon"
            />
          </ScSearchIcon>
          <ScTextField
            placeholder="Søk..."
            $tablet={context.isTablet}
            ref={anchor}
            hideLabel
            label="Søk"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <ScInputButton onClick={() => setOpen(false)}>
            <Close style={{ fontSize: "1.5rem" }} aria-label="Lukk søk ikon" />
          </ScInputButton>
          <ScPopover
            onClose={() => null}
            anchorEl={anchor.current}
            open={Object.keys(result).length > 0 || query !== ""}
            arrow={false}
            placement={"bottom-start"}
            offset={8}
          >
            <Hits ref={anchor} hits={result} value={query} />
          </ScPopover>
        </ScInputWrapper>
      )}

      {!open && (
        <ScSearchButton onClick={() => setOpen(!open)}>
          <SearchIcon
            style={{ fontSize: "1.5rem", marginLeft: 3 }}
            aria-label="Søk ikon"
          />
        </ScSearchButton>
      )}
    </ScWrapper>
  );
};

const ScHits = styled.div`
  display: flex;
  flex-direction: column;
  max-height: 600px;
  overflow-y: scroll;
  background-color: white;
`;

const ScHeading = styled(Detail)`
  background-color: #f7f7f7;
  padding: 0.5rem;
  text-transform: uppercase;
`;

const ScIcon = styled.div`
  display: flex;
  justify-content: flex-end;
  padding: 0.5rem;
  width: 100%;
  height: 100%;
`;

interface HitsProps {
  hits: { [key: string]: any[] };
  value: string;
}

const Hits = React.forwardRef<HTMLInputElement, HitsProps>(
  ({ hits, value }: HitsProps, ref) => {
    const itemsRef = useRef<any>([ref]);
    const [activeN, setActiveN] = useState(0);
    const hitsRef = useRef<HTMLDivElement>(null);

    const handleUp = (e) => {
      e.preventDefault();
      setActiveN((n) => (n - 1 < 0 ? itemsRef.current.length - 1 : n - 1));
    };

    const handleDown = (e) => {
      e.preventDefault();
      setActiveN((n) => (n + 1 === itemsRef.current.length ? 0 : n + 1));
    };

    const handleTab = (e) => {
      setActiveN(0);
      !e.shiftKey &&
        hitsRef.current.contains(document.activeElement) &&
        itemsRef.current[0]?.current?.focus();
    };

    useKey("ArrowUp", (e) => handleUp(e));
    useKey("ArrowDown", (e) => handleDown(e));
    useKey("Tab", (e) => handleTab(e));

    useEffect(() => {
      setActiveN(0);
      itemsRef.current = [ref];
    }, [value]);

    useUpdateEffect(() => {
      const el: any = itemsRef.current?.[activeN];
      el && el?.current ? el.current?.focus() : el?.focus();
    }, [activeN]);

    return (
      <ScHits ref={hitsRef}>
        {Object.keys(hits).length === 0 && (
          <ScHit>
            <BodyLong> Ingen treff for: {value}...</BodyLong>
          </ScHit>
        )}
        {Object.keys(hits).map((category) => (
          <div key={category}>
            <ScHeading forwardedAs="div" size="small">
              {category}
            </ScHeading>

            {hits[category].map((hit, i) => (
              <Hit
                ref={(el) => (itemsRef.current[i + 1] = el)}
                key={hit.objectID}
                hit={hit}
                onFocus={() => setActiveN(i + 1)}
              />
            ))}
          </div>
        ))}
        {Object.keys(hits).length > 0 && (
          <ScIcon>
            <AlgoliaIcon />
          </ScIcon>
        )}
      </ScHits>
    );
  }
);

const capitalize = (s) => (s && s[0].toUpperCase() + s.slice(1)) || "";

const ScHit = styled.a`
  display: flex;
  padding: 0.75rem 0.5rem 0.75rem 0.75rem;
  text-decoration: none;
  color: var(--navds-color-gray-90);

  :hover {
    background-color: var(--navds-color-gray-10);
  }

  :focus {
    outline: none;
    box-shadow: inset 0 0 0 3px var(--navds-color-blue-80);
  }
`;

interface HitProps {
  hit: any;
  onFocus: () => void;
}

const Hit = React.forwardRef<HTMLAnchorElement, HitProps>(
  ({ hit, ...props }: HitProps, ref) => {
    const isComponent = [
      "bruk",
      "design",
      "utvikling",
      "tilgjengelighet",
      "props",
    ].includes(hit.page);

    return (
      <BodyShort>
        <NextLink href={`/${hit.path}`} passHref>
          <ScHit {...props} tabIndex={-1} ref={ref}>
            {`${hit.title}${isComponent ? ` - ${capitalize(hit.page)}` : ""}`}
          </ScHit>
        </NextLink>
      </BodyShort>
    );
  }
);

export default Search;
