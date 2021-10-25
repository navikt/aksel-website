import { Search as SearchIcon } from "@navikt/ds-icons";
import {
  BodyShort,
  Detail,
  Heading,
  Popover,
  TextField,
} from "@navikt/ds-react";
import algoliasearch from "algoliasearch/lite";
import React, { useEffect, useRef, useState } from "react";
import NextLink from "next/link";
import styled from "styled-components";
import { SearchButton } from "../templates/layout/header/header.styles";

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

  sorted.forEach((hit, x) => {
    if (x > 5) return;
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

const ScWrapper = styled.div`
  display: flex;
  padding: 0.5rem 0.5rem;
  z-index: 1003;
`;

const Search = () => {
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

  return (
    <ScWrapper>
      <button onClick={() => setOpen(!open)}>
        <SearchIcon />
      </button>
      {open && (
        <>
          <TextField
            ref={anchor}
            hideLabel
            label="Søk"
            onChange={(e) => setQuery(e.target.value)}
          />
          <Popover
            onClose={() => setOpen(false)}
            anchorEl={anchor.current}
            open={Object.keys(result).length > 0}
            arrow={false}
            placement={"bottom"}
          >
            <Hits hits={result} />
          </Popover>
        </>
      )}
    </ScWrapper>
  );
};

const ScHits = styled.div`
  display: flex;
  flex-direction: column;
  width: 375px;
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
