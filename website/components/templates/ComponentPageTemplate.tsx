import React from "react";
import { Ingress, Link, Title } from "@navikt/ds-react";
import moment from "moment";

const ComponentPageTemplate = ({ data }) => {
  console.log(data);
  return (
    <div>
      <Title size="2xl" level={1}>
        {data.heading}
      </Title>
      {data.ingress && <Ingress>{data.ingress}</Ingress>}
      {data.npm_link && <Link href={data.npm_link}>NPM</Link>}
      {data.github_link && <Link href={data.github_link}>Github</Link>}
      {data.figma_link && <Link href={data.figma_link}>FIGMA</Link>}
      {data.status && <div>{data.status}</div>}
      <div>{`Siste oppdatering: ${moment(
        moment(data._updatedAt)
      ).fromNow()}`}</div>
    </div>
  );
};

export default ComponentPageTemplate;
