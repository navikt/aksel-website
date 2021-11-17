import React from "react";
import {
  Heading,
  BodyLong,
  BodyShort,
  Detail,
  Label,
  Ingress,
} from "@navikt/ds-react";
import styled from "styled-components";
import { ScColumn } from "./styles";

const ScMutedHeading = styled(Heading)`
  color: var(--navds-semantic-color-text-muted);
`;

export const TypographyHeading = () => {
  return (
    <ScColumn>
      <Heading spacing size="2xlarge" level="1">
        Heading 2xlarge
      </Heading>
      <Heading spacing size="xlarge" level="2">
        Heading xlarge
      </Heading>
      <Heading spacing size="large" level="3">
        Heading large
      </Heading>
      <Heading spacing size="medium" level="4">
        Heading medium
      </Heading>
      <Heading spacing size="small" level="5">
        Heading small
      </Heading>
      <Heading size="xsmall" level="6">
        Heading xsmall
      </Heading>
    </ScColumn>
  );
};

TypographyHeading.react = `<Heading spacing size="2xlarge" level="1">
Heading 2xlarge
</Heading>
<Heading spacing size="xlarge" level="2">
Heading xlarge
</Heading>
<Heading spacing size="large" level="3">
Heading large
</Heading>
<Heading spacing size="medium" level="4">
Heading medium
</Heading>
<Heading spacing size="small" level="5">
Heading small
</Heading>
<Heading size="xsmall" level="6">
Heading xsmall
</Heading>`;

export const TypographyBodyLong = () => {
  return (
    <ScColumn>
      <ScMutedHeading size="medium" level="3">
        Medium
      </ScMutedHeading>
      <BodyLong spacing>
        Ullamco ut laboris irure excepteur velit nisi occaecat proident. Amet
        aliquip dolor eu occaecat. Elit sunt occaecat excepteur ea. Quis commodo
        adipisicing laborum minim. Culpa duis occaecat adipisicing dolor sint
        cillum. Non in consequat ex esse exercitation cillum Lorem voluptate
        officia.
      </BodyLong>

      <ScMutedHeading size="medium" level="3">
        Small
      </ScMutedHeading>
      <BodyLong size="small">
        Ullamco ut laboris irure excepteur velit nisi occaecat proident. Amet
        aliquip dolor eu occaecat. Elit sunt occaecat excepteur ea. Quis commodo
        adipisicing laborum minim. Culpa duis occaecat adipisicing dolor sint
        cillum. Non in consequat ex esse exercitation cillum Lorem voluptate
        officia.
      </BodyLong>
    </ScColumn>
  );
};

TypographyBodyLong.react = `
      <BodyLong spacing>
        Ullamco ut laboris irure excepteur velit nisi occaecat proident. Amet
        aliquip dolor eu occaecat. Elit sunt occaecat excepteur ea. Quis commodo
        adipisicing laborum minim. Culpa duis occaecat adipisicing dolor sint
        cillum. Non in consequat ex esse exercitation cillum Lorem voluptate
        officia.
      </BodyLong>

      <BodyLong size="small">
        Ullamco ut laboris irure excepteur velit nisi occaecat proident. Amet
        aliquip dolor eu occaecat. Elit sunt occaecat excepteur ea. Quis commodo
        adipisicing laborum minim. Culpa duis occaecat adipisicing dolor sint
        cillum. Non in consequat ex esse exercitation cillum Lorem voluptate
        officia.
      </BodyLong>
`;

export const TypographyBodyShort = () => {
  return (
    <ScColumn>
      <ScMutedHeading size="medium" level="3">
        Medium
      </ScMutedHeading>
      <BodyShort spacing>Ullamco ut laboris irure</BodyShort>

      <ScMutedHeading size="medium" level="3">
        Small
      </ScMutedHeading>
      <BodyShort size="small">Ullamco ut laboris irure</BodyShort>
    </ScColumn>
  );
};

TypographyBodyShort.react = `
<BodyShort spacing>Ullamco ut laboris irure</BodyShort>
<BodyShort size="small">Ullamco ut laboris irure</BodyShort>`;

export const TypographyIngress = () => {
  return (
    <>
      <Ingress>
        Esse reprehenderit mollit sunt occaecat sit. Minim voluptate dolor
        incididunt et non quis magna consequat.
      </Ingress>
    </>
  );
};

TypographyIngress.react = `<Ingress>
Esse reprehenderit mollit sunt occaecat sit. Minim voluptate dolor
incididunt et non quis magna consequat.
</Ingress>`;

export const TypographyLabel = () => {
  return (
    <ScColumn>
      <ScMutedHeading size="medium" level="3">
        Medium
      </ScMutedHeading>
      <Label spacing>Ullamco ut laboris irure</Label>

      <ScMutedHeading size="medium" level="3">
        Small
      </ScMutedHeading>
      <Label size="small">Ullamco ut laboris irure</Label>
    </ScColumn>
  );
};

TypographyLabel.react = `
<Label spacing>Ullamco ut laboris irure</Label>
<Label size="small">Ullamco ut laboris irure</Label>`;

export const TypographyDetail = () => {
  return (
    <ScColumn>
      <ScMutedHeading size="medium" level="3">
        Medium
      </ScMutedHeading>
      <Detail spacing>Ullamco ut laboris irure</Detail>

      <ScMutedHeading size="medium" level="3">
        Small
      </ScMutedHeading>
      <Detail size="small">Ullamco ut laboris irure</Detail>
    </ScColumn>
  );
};

TypographyDetail.react = `
<Detail spacing>Ullamco ut laboris irure</Detail>
<Detail size="small">Ullamco ut laboris irure</Detail>
`;
