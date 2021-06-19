import React, { useState } from "react";
import { Ingress, Link, Title } from "@navikt/ds-react";
import moment from "moment";
import { useRouter } from "next/router";
import Tabs from "../tabs/Tabs";

const ComponentPageTemplate = ({ data }) => {
  /* console.log(data); */

  const router = useRouter();

  const tabRegex = `[^/]+(?=/$|$)`;
  const allTabs = ["Bruk", "Design", "Kode", "Tilgjengelighet"];

  const [activeTab] = useState(() => {
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

  const handleChange = (x: number) => {
    console.log(router);
    /*  const end = router.asPath.match(tabRegex)[0];
    router.push(allTabs.map(x => x.toLowerCase()).includes(end) ? router.asPath.replace(end, allTabs[x]): `${router.asPath}`) */
  };

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
      <Tabs
        tabs={["Bruk", "Design", "Kode", "Tilgjengelighet"]}
        tab={activeTab}
        onChange={(x) => handleChange(x)}
      />
    </div>
  );
};

export default ComponentPageTemplate;
