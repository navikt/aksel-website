import React from "react";
import {
  Heading,
  BodyLong,
  BodyShort,
  Detail,
  Label,
  Ingress,
} from "@navikt/ds-react";
import { ExampleComponent } from "../../lib";

export const TypographyHeading: ExampleComponent = () => {
  return (
    <div className="stories-sandbox-column">
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
    </div>
  );
};

TypographyHeading.react = `
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

export const TypographyBodyLong: ExampleComponent = () => {
  return (
    <div className="stories-sandbox-column">
      <Heading size="medium" level="3" className="text-text-muted">
        Medium
      </Heading>
      <BodyLong spacing>
        Ullamco ut laboris irure excepteur velit nisi occaecat proident. Amet
        aliquip dolor eu occaecat. Elit sunt occaecat excepteur ea. Quis commodo
        adipisicing laborum minim. Culpa duis occaecat adipisicing dolor sint
        cillum. Non in consequat ex esse exercitation cillum Lorem voluptate
        officia.
      </BodyLong>

      <Heading className="text-text-muted" size="medium" level="3">
        Small
      </Heading>
      <BodyLong size="small">
        Ullamco ut laboris irure excepteur velit nisi occaecat proident. Amet
        aliquip dolor eu occaecat. Elit sunt occaecat excepteur ea. Quis commodo
        adipisicing laborum minim. Culpa duis occaecat adipisicing dolor sint
        cillum. Non in consequat ex esse exercitation cillum Lorem voluptate
        officia.
      </BodyLong>
    </div>
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

export const TypographyBodyShort: ExampleComponent = () => {
  return (
    <div className="stories-sandbox-column">
      <Heading className="text-text-muted" size="medium" level="3">
        Medium
      </Heading>
      <BodyShort spacing>Ullamco ut laboris irure</BodyShort>

      <Heading className="text-text-muted" size="medium" level="3">
        Small
      </Heading>
      <BodyShort size="small">Ullamco ut laboris irure</BodyShort>
    </div>
  );
};

TypographyBodyShort.react = `
<BodyShort spacing>Ullamco ut laboris irure</BodyShort>
<BodyShort size="small">Ullamco ut laboris irure</BodyShort>`;

export const TypographyIngress: ExampleComponent = () => {
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

export const TypographyLabel: ExampleComponent = () => {
  return (
    <div className="stories-sandbox-column">
      <Heading className="text-text-muted" size="medium" level="3">
        Medium
      </Heading>
      <Label spacing>Ullamco ut laboris irure</Label>

      <Heading className="text-text-muted" size="medium" level="3">
        Small
      </Heading>
      <Label size="small">Ullamco ut laboris irure</Label>
    </div>
  );
};

TypographyLabel.react = `
<Label spacing>Ullamco ut laboris irure</Label>
<Label size="small">Ullamco ut laboris irure</Label>`;

export const TypographyDetail: ExampleComponent = () => {
  return (
    <div className="stories-sandbox-column">
      <Heading className="text-text-muted" size="medium" level="3">
        Medium
      </Heading>
      <Detail spacing>Ullamco ut laboris irure</Detail>

      <Heading className="text-text-muted" size="medium" level="3">
        Small
      </Heading>
      <Detail size="small">Ullamco ut laboris irure</Detail>
    </div>
  );
};

TypographyDetail.react = `
<Detail  spacing>Ullamco ut laboris irure</Detail>
<Detail size="small">Ullamco ut laboris irure</Detail>
`;
