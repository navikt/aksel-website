import { Close, Search as SearchIcon } from "@navikt/ds-icons";
import { BodyShort, Detail, Popover, TextField } from "@navikt/ds-react";
import algoliasearch from "algoliasearch/lite";
import React, { useContext, useEffect, useRef, useState } from "react";
import NextLink from "next/link";
import styled from "styled-components";
import { Header } from "@navikt/ds-react-internal";
import { motion } from "framer-motion";
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
`;

const ScSearchButton = styled(Header.Button)`
  border: none;
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
  background-color: white;
  flex-shrink: 0;
  /* border: 1px solid var(--navds-color-gray-60); */

  :focus {
    outline: none;
    box-shadow: inset 0 0 0 1px white,
      inset 0 0 0 3px var(--navds-color-blue-80);
  }
`;

const ScInputWrapper = styled.div`
  display: flex;
  justify-content: center;
  /* float: right; */

  margin-left: auto;
  width: 100%;
  justify-content: flex-end;

  > button:first-of-type {
    border-right: none;
    pointer-events: none;
  }

  > button:last-of-type {
    border-left: none;
  }
`;

const ScTextField = styled(TextField)<{ $tablet: boolean }>`
  width: 100%;
  ${(props) => !props.$tablet && `max-width: 400px;`}
  flex-grow: 1;

  > input {
    border: none;
    border-radius: 0;
    height: var(--header-height);
    font-size: 1.25rem;
  }
  > input:focus {
    box-shadow: inset 0 0 0 1px white,
      inset 0 0 0 3px var(--navds-color-blue-80);
  }
`;

const ScPopover = styled(Popover)`
  border: none;
  box-shadow: 0 0 10px 0 rgba(24, 39, 75, 0.1), 0 0 6px 0 rgba(24, 39, 75, 0.12);
`;

const Search = ({ isOpen }: { isOpen?: (state: boolean) => void }) => {
  const context = useContext(LayoutContext);
  const searchIndex = useRef(null);
  const [open, setOpen] = useState(false);
  const anchor = useRef(null);

  const [query, setQuery] = useState("");
  const [result, setResult] = useState<{ [key: string]: any[] }>({});

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
    open && anchor.current && anchor.current.focus();
    isOpen && isOpen(open);
  }, [open]);

  return (
    <ScWrapper $open={open}>
      {open ? (
        <ScInputWrapper
          as={motion.div}
          key="MainMenuKey"
          initial={{ y: 0, width: "75%", opacity: 0 }}
          animate={{ y: 0, width: "100%", opacity: 1 }}
          transition={{ type: "tween", duration: 0.2 }}
        >
          <ScInputButton tabIndex={-1}>
            <SearchIcon
              style={{ fontSize: "1.5rem", marginLeft: 3 }}
              aria-label="Søk ikon"
            />
          </ScInputButton>
          <ScTextField
            $tablet={context.isTablet}
            ref={anchor}
            hideLabel
            label="Søk"
            onChange={(e) => setQuery(e.target.value)}
          />
          <ScInputButton onClick={() => setOpen(false)}>
            <Close style={{ fontSize: "1.5rem" }} aria-label="Lukk søk ikon" />
          </ScInputButton>
          <ScPopover
            onClose={() => null}
            anchorEl={anchor.current}
            open={Object.keys(result).length > 0}
            arrow={false}
            placement={"bottom-start"}
            offset={0}
          >
            <Hits hits={result} />
          </ScPopover>
        </ScInputWrapper>
      ) : (
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
  width: 400px;
  max-height: 400px;
  overflow-y: scroll;
`;

const ScHeading = styled(Detail)`
  background-color: #f7f7f7;
  padding: 0.5rem 0.5rem;
  text-transform: uppercase;
`;

const Hits = ({ hits }: { hits: { [key: string]: any[] } }) => {
  if (Object.keys(hits).length === 0) return null;

  return (
    <ScHits>
      {Object.keys(hits).map((category) => (
        <div key={category}>
          <ScHeading forwardedAs="div" size="small">
            {category}
          </ScHeading>

          {hits[category].map((hit) => (
            <Hit key={hit.objectID} hit={hit} />
          ))}
        </div>
      ))}
    </ScHits>
  );
};

const capitalize = (s) => (s && s[0].toUpperCase() + s.slice(1)) || "";

const ScHit = styled.a`
  display: flex;
  padding: 0.75rem 0.5rem 0.75rem 0.75rem;
  text-decoration: none;
  color: var(--navds-color-gray-90);

  :hover {
    background-color: var(--navds-color-gray-10);
  }
`;

const Hit = ({ hit }: { hit: any }) => {
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
        <ScHit>
          {`${hit.title}${isComponent ? ` - ${capitalize(hit.page)}` : ""}`}
        </ScHit>
      </NextLink>
    </BodyShort>
  );
};

export default Search;
