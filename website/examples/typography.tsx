import React from "react";
import {
  Heading,
  BodyLong,
  BodyShort,
  Detail,
  Label,
  Ingress,
} from "@navikt/ds-react";

export const TypographyHeading = () => {
  return (
    <>
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
    </>
  );
};

export const TypographyBodyLong = () => {
  return (
    <>
      <Heading size="medium" level="3">
        Medium
      </Heading>
      <BodyLong spacing>
        Ullamco ut laboris irure excepteur velit nisi occaecat proident. Amet
        aliquip dolor eu occaecat. Elit sunt occaecat excepteur ea. Quis commodo
        adipisicing laborum minim. Culpa duis occaecat adipisicing dolor sint
        cillum. Non in consequat ex esse exercitation cillum Lorem voluptate
        officia.
      </BodyLong>

      <Heading size="medium" level="3">
        Small
      </Heading>
      <BodyLong size="small">
        Ullamco ut laboris irure excepteur velit nisi occaecat proident. Amet
        aliquip dolor eu occaecat. Elit sunt occaecat excepteur ea. Quis commodo
        adipisicing laborum minim. Culpa duis occaecat adipisicing dolor sint
        cillum. Non in consequat ex esse exercitation cillum Lorem voluptate
        officia.
      </BodyLong>
    </>
  );
};

export const TypographyBodyShort = () => {
  return (
    <>
      <Heading size="medium" level="3">
        Medium
      </Heading>
      <BodyShort spacing>Ullamco ut laboris irure</BodyShort>

      <Heading size="medium" level="3">
        Small
      </Heading>
      <BodyShort size="small">Ullamco ut laboris irure</BodyShort>
    </>
  );
};

export const TypographyIngress = () => {
  return (
    <>
      <Ingress spacing>
        Esse reprehenderit mollit sunt occaecat sit. Minim voluptate dolor
        incididunt et non quis magna consequat.
      </Ingress>
    </>
  );
};

export const TypographyLabel = () => {
  return (
    <>
      <Heading size="medium" level="3">
        Medium
      </Heading>
      <Label spacing>Ullamco ut laboris irure</Label>

      <Heading size="medium" level="3">
        Small
      </Heading>
      <Label size="small">Ullamco ut laboris irure</Label>
    </>
  );
};

export const TypographyDetail = () => {
  return (
    <>
      <Heading size="medium" level="3">
        Medium
      </Heading>
      <Detail spacing>Ullamco ut laboris irure</Detail>

      <Heading size="medium" level="3">
        Small
      </Heading>
      <Detail size="small">Ullamco ut laboris irure</Detail>
    </>
  );
};
