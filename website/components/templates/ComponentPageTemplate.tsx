import React, { useEffect, useState } from "react";
import { Ingress, Link, Title } from "@navikt/ds-react";
import moment from "moment";
import { useRouter } from "next/router";
import Tabs from "../tabs/Tabs";
import PageBuilder from "../Pagebuilder";

const ComponentPageTemplate = ({ data }) => {
  /* console.log(data); */

  const router = useRouter();

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

  console.log(router.query);

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

  return (
    <div>
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
      <PageBuilder sections={data.tab_1} />
    </div>
  );
};

export default ComponentPageTemplate;
