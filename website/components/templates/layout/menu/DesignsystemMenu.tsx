import { Close } from "@navikt/ds-icons";
import {
  BodyShort,
  SearchField,
  SearchFieldClearButton,
  SearchFieldInput,
  useClientLayoutEffect,
} from "@navikt/ds-react";
import NextLink from "next/link";
import React, { createContext, useContext, useState } from "react";
import styled from "styled-components";
import {
  DsNavigationHeadingMenuT,
  DsNavigationHeadingT,
} from "../../../../lib";
import { PagePropsContext } from "../../../../pages/_app";
import Tags from "./FilterTags";

const Nav = styled.nav`
  margin-top: var(--navds-spacing-6);
  overflow: scroll;

  ul,
  ul > li {
    list-style: none;
    margin: 0;
    padding: 0;
  }
`;

const Link = styled.a<{ active?: boolean }>`
  display: flex;
  padding: 0.75rem 1rem 0.75rem 2rem;
  text-decoration: none;
  color: var(--navds-color-gray-60);
  /* border-radius: 8px;
  margin: 0.5rem; */

  ${(props) =>
    props.active &&
    `
    box-shadow: inset 6px 0 0 0 var(--navds-color-gray-90);
    background-color: #f8f8f8;
    color: var(--navds-color-gray-90);
    font-weight: 600;
  `}

  :hover {
    background-color: #f8f8f8;
    color: var(--navds-color-gray-90);
  }

  :focus {
    outline: none;
    box-shadow: inset 0 0 0 3px var(--navds-color-blue-80);
  }
`;

const FormWrapper = styled.div`
  margin: 0 2rem;
`;

export const MenuContext = createContext(null);

const Menu = ({ heading }: { heading?: DsNavigationHeadingT }): JSX.Element => {
  const [pageProps] = useContext<any>(PagePropsContext);

  const [filterValue, setFilterValue] = useState("");
  const [filterTags, setFilterTags] = useState([
    { title: "Global", active: false, sanity: "core" },
    { title: "Ekstern", active: false, sanity: "nav" },
    { title: "Intern", active: false, sanity: "internal" },
  ]);

  const [sidebarMenu, setSidebarMenu] = useState<DsNavigationHeadingMenuT[]>(
    []
  );

  useClientLayoutEffect(() => {
    if (!heading || !heading?.menu) {
      return;
    }

    const filtered = heading.menu
      .filter(
        (item) =>
          item?.title.toLowerCase().indexOf(filterValue.toLowerCase()) !== -1
      )
      .filter((item) => {
        const active = filterTags.filter((x) => x.active).map((x) => x.sanity);
        return active.length > 0
          ? active.some((r) => item?.link.tags.includes(r))
          : true;
      });

    setSidebarMenu([...filtered]);
  }, [heading, filterValue, filterTags]);

  return (
    <>
      <MenuContext.Provider value={[filterTags, setFilterTags]}>
        <FormWrapper>
          <SearchField label="Filtrer">
            <SearchFieldInput
              value={filterValue}
              onChange={(e) => setFilterValue(e.target.value)}
            />
            {!!filterValue && (
              <SearchFieldClearButton onClick={() => setFilterValue("")}>
                <Close />
                <span className="navds-sr-only">Tøm filter input</span>
              </SearchFieldClearButton>
            )}
          </SearchField>
          <Tags />
        </FormWrapper>
        <Nav>
          <BodyShort as="ul">
            {sidebarMenu.map((item) => (
              <li key={item.title}>
                <NextLink href={`/${item.link.slug.current}`} passHref>
                  <Link active={pageProps.page.slug === item.link.slug.current}>
                    {item.title}
                  </Link>
                </NextLink>
              </li>
            ))}
            {Array(15)
              .fill(0)
              .map((_, y) => y)
              .map((x) => (
                <li key={x}>
                  <Link href="#">Placeholder {x}</Link>
                </li>
              ))}
          </BodyShort>
        </Nav>
      </MenuContext.Provider>
    </>
  );
};

export default Menu;
