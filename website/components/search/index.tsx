import { Close, Search as SearchIcon } from "@navikt/ds-icons";
import { BodyShort, Detail, Popover, TextField } from "@navikt/ds-react";
import algoliasearch from "algoliasearch/lite";
import React, { useEffect, useRef, useState } from "react";
import NextLink from "next/link";
import styled from "styled-components";
import { Header } from "@navikt/ds-react-internal";

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

const ScWrapper = styled.div`
  display: flex;
  z-index: 1003;
  margin-left: auto;
  align-items: center;
`;

const ScSearchButton = styled(Header.Button)`
  border: none;
  width: var(--header-height);
  height: var(--header-height);
  justify-content: center;
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

  useEffect(() => {
    !open && setResult({});
  }, [open]);

  return (
    <ScWrapper>
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
            offset={0}
          >
            <Hits hits={result} />
          </Popover>
        </>
      )}
      <ScSearchButton onClick={() => setOpen(!open)}>
        {!open && (
          <SearchIcon
            style={{ fontSize: "1.5rem", marginLeft: 3 }}
            aria-label="Søk ikon"
          />
        )}
        {open && (
          <Close style={{ fontSize: "1.5rem" }} aria-label="Lukk søk ikon" />
        )}
      </ScSearchButton>
    </ScWrapper>
  );
};

const ScHits = styled.div`
  display: flex;
  flex-direction: column;
  width: 475px;
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
