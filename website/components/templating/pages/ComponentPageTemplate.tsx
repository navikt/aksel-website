import React from "react";
import { Ingress, Title } from "@navikt/ds-react";
import moment from "moment";
import { useRouter } from "next/router";
import PageBuilder from "../Pagebuilder";
import styled from "styled-components";
import Link from "next/link";
import { Tab, Tabs } from "../../Tabs";
import { SanityBlockContent } from "../SanityBlockContent";

const Div = styled.div`
  max-width: 700px;
`;

const ComponentPageTemplate = ({ data }) => {
  const { query } = useRouter();
  console.log(data);

  const basePath = `/designsystem/${(query.slug as string[])
    .slice(0, 2)
    .join("/")}`;

  const tabs = {
    bruk: "usage",
    utvikling: "development",
    design: "design",
    tilgjengelighet: "accessibility",
  };

  const activeTab = query.slug[2] ?? "bruk";

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
      <Tabs>
        {Object.entries(tabs).map(
          ([key, value]) =>
            data[value] && (
              <Tab
                key={key}
                path={`${basePath}${key === "bruk" ? "" : "/" + key}`}
              >
                {key}
              </Tab>
            )
        )}
      </Tabs>
      <SanityBlockContent blocks={data[tabs[activeTab]]} />
    </Div>
  );
};

export default ComponentPageTemplate;
