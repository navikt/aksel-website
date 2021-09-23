import React from "react";
import { Accordion } from "@navikt/ds-react";
import { InferHtml, InferReact } from "./InferCode";

export default {
  title: "ds-react/Accordion",
  component: Accordion,
};

export const AccordionExample = ({ variant, label }) => {
  return (
    <div style={{ width: "100%" }}>
      <InferReact>{`<Accordion>
          <Accordion.Item>
            <Accordion.Header>Accordion header text</Accordion.Header>
            <Accordion.Content>
              Magna aliquip aliquip fugiat nostrud nostrud velit pariatur veniam
              officia laboris voluptate officia pariatur.Lorem est ex anim velit
              occaecat nisi qui nostrud sit.
            </Accordion.Content>
          </Accordion.Item>
        </Accordion>`}</InferReact>
      <InferHtml>
        <Accordion>
          <Accordion.Item>
            <Accordion.Header>Accordion header text</Accordion.Header>
            <Accordion.Content>
              Magna aliquip aliquip fugiat nostrud nostrud velit pariatur veniam
              officia laboris voluptate officia pariatur.Lorem est ex anim velit
              occaecat nisi qui nostrud sit.
            </Accordion.Content>
          </Accordion.Item>
        </Accordion>
      </InferHtml>
    </div>
  );
};
