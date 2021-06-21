import React, { useEffect, useState } from "react";
import { Ingress, Link, Title } from "@navikt/ds-react";
import moment from "moment";
import { useRouter } from "next/router";
import Tabs from "../tabs/Tabs";
import PageBuilder from "../Pagebuilder";
import styled from "styled-components";

const Div = styled.div`
  max-width: 700px;
`;

const ComponentPageTemplate = ({ data }) => {
  const router = useRouter();
  console.log(router.query);

  const tabRegex = `[^/]+(?=/$|$)`;
  const allTabs = [
    { name: "Bruk", url: `/designsystem/komponent/${router.query.slug[1]}` },
    {
      name: "Design",
      url: `/designsystem/komponent/${router.query.slug[1]}/design`,
    },
    {
      name: "Kode",
      url: `/designsystem/komponent/${router.query.slug[1]}/kode`,
    },
    {
      name: "Tilgjengelighet",
      url: `/designsystem/komponent/${router.query.slug[1]}/tilgjengelighet`,
    },
  ];

  const [activeTab, setActiveTab] = useState(() => {
    const end = router.asPath.match(tabRegex)[0];
    switch (end) {
      case "design":
        return 1;
      case "kode":
        return 2;
      case "tilgjengelighet":
        return 3;
      default:
        return 0;
    }
  });

  // TODO: Optimize this..
  useEffect(() => {
    setActiveTab(() => {
      const end = router.asPath.match(tabRegex)[0];
      switch (end) {
        case "design":
          return 1;
        case "kode":
          return 2;
        case "tilgjengelighet":
          return 3;
        default:
          return 0;
      }
    });
  });

  const getTabContent = () => {
    switch (activeTab) {
      case 0:
        return <PageBuilder sections={data.tab_1} />;
      case 1:
        return <PageBuilder sections={data.tab_2} />;
      case 2:
        return <PageBuilder sections={data.tab_3} />;
      case 3:
        return <PageBuilder sections={data.tab_4} />;
      default:
        return null;
    }
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
      <Tabs tabs={allTabs} tab={activeTab} />
      {getTabContent()}
    </Div>
  );
};

export default ComponentPageTemplate;
