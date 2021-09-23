import React from "react";
import { Alert } from "@navikt/ds-react";
import { InferHtml, InferReact } from "./InferCode";

export default {
  title: "ds-react/Alert",
  component: Alert,
};

const Template = ({ variant, label }) => {
  return (
    <>
      <InferReact>{`<Alert variant="${variant}">${label}</Alert>`}</InferReact>
      <InferHtml>
        <Alert variant={variant}>{label}</Alert>
      </InferHtml>
    </>
  );
};

export const Info = Template.bind({});
Info.args = {
  variant: "info",
  label: "Nå kan du sende inn søknaden.",
};

export const Success = Template.bind({});
Success.args = {
  variant: "success",
  label: "Du har sendt søknaden.",
};

export const Warning = Template.bind({});
Warning.args = {
  variant: "warning",
  label:
    "Det er mange som bruker nav.no nå, derfor kan det ta litt tid før søknaden din kommer fram.",
};

export const Error = Template.bind({});
Error.args = {
  variant: "error",
  label:
    "Det er ikke mulig å sende søknaden akkurat nå, vennligst prøv igjen senere. Du er velkommen til å følge med på hvordan det går.",
};
