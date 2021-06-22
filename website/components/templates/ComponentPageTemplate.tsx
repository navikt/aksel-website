import React, { useEffect, useState } from "react";
import { Ingress, Title } from "@navikt/ds-react";
import moment from "moment";
import { useRouter } from "next/router";
import Tabs from "../tabs/Tabs";
import PageBuilder from "../Pagebuilder";
import styled from "styled-components";
import Link from "next/link";

const Div = styled.div`
  max-width: 700px;
`;

const Nav = styled.nav`
  margin: var(--navds-spacing-12) 0;
`;

const Ul = styled.ul`
  padding: 0;
  margin: 0;
  display: flex;

  li {
    list-style: none;
  }
`;

const A = styled.a`
  color: var(--navds-color-darkgray);
  background: none;
  padding: 0.5rem 1.5rem 0.5rem 1.5rem;
  font-weight: var(--navds-font-weight-bold);
  border-bottom: 4px solid transparent;
  cursor: pointer;
  text-decoration: none;

  ::hover {
    border-bottom: 4px solid var(--navds-color-darkgray);
    color: var(--navds-color-darkgray);
  }

  ::focus {
    outline: 2px solid var(--navds-color-blue-80);
    outline-offset: 2px;
  }
`;

const ActiveA = styled(A)`
  border-bottom: 4px solid var(--navds-color-blue-50);
  color: var(--navds-color-blue-50);
`;

const ComponentPageTemplate = ({ data }) => {
  const { query, asPath, push } = useRouter();
  const r = useRouter();

  console.log(r);

  const preview = query?.preview && query.preview ? "&preview=true" : "";

  const [activeTab, setActiveTab] = useState(0);

  // TODO: Optimize this..
  useEffect(() => {
    setActiveTab(() => {
      const end = query.tab;
      switch (end) {
        case "design":
          return 1;
        case "utvikling":
          return 2;
        case "tilgjengelighet":
          return 3;
        case "bruk":
          return 0;
        default:
          return 0;
      }
    });
  }, [query]);

  const getTab = (x, text) => {
    let newQuery = `/?tab=${text.toLowerCase()}${preview}`;
    newQuery =
      text.toLowerCase() === "bruk" ? preview.replace("&", "?") : newQuery;

    const path = `/designsystem/komponent/${query.slug[1]}`;
    return (
      <li>
        <Link href={path + newQuery} passHref>
          {activeTab === x ? (
            <ActiveA aria-selected={true}>{text}</ActiveA>
          ) : (
            <A aria-selected={false}>{text}</A>
          )}
        </Link>
      </li>
    );
  };

  return (
    <Div>
      <Title size="2xl" level={1}>
        {data.heading}
      </Title>
      <Ingress>{data.ingress}</Ingress>
      {data.npm_link && <Link href={data.npm_link}>NPM</Link>}
      <Link href={data.github_link}>Github</Link>
      <Link href={data.figma_link}>FIGMA</Link>
      <div>{data.status}</div>
      <div>{`Siste oppdatering: ${moment(
        moment(data._updatedAt)
      ).fromNow()}`}</div>
      <Nav aria-label="Komponent navigasjontabs">
        <Ul>
          {getTab(0, "Bruk")}
          {getTab(1, "Design")}
          {getTab(2, "Utvikling")}
          {getTab(3, "Tilgjengelighet")}
        </Ul>
      </Nav>
      {<PageBuilder sections={data[`tab_${activeTab + 1}`]} />}
    </Div>
  );
};

export default ComponentPageTemplate;
