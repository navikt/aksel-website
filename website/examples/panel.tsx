import React from "react";
import { Panel } from "@navikt/ds-react";
import { ExampleComponent } from "../lib";

export const PanelExample: ExampleComponent = () => (
  <>
    <Panel>
      Eu quis exercitation voluptate ex. Aute irure esse occaecat minim
      cupidatat velit minim duis sint culpa anim laboris. Consectetur nulla eu
      commodo ea culpa velit commodo incididunt sunt ipsum.
    </Panel>
  </>
);

PanelExample.react = `<Panel>
Eu quis exercitation voluptate ex. Aute irure esse occaecat minim
cupidatat velit minim duis sint culpa anim laboris. Consectetur nulla eu
commodo ea culpa velit commodo incididunt sunt ipsum.
</Panel>`;

export const PanelMedBorder: ExampleComponent = () => (
  <>
    <Panel border>
      Eu quis exercitation voluptate ex. Aute irure esse occaecat minim
      cupidatat velit minim duis sint culpa anim laboris. Consectetur nulla eu
      commodo ea culpa velit commodo incididunt sunt ipsum.
    </Panel>
  </>
);

PanelMedBorder.react = `<Panel border>
Eu quis exercitation voluptate ex. Aute irure esse occaecat minim
cupidatat velit minim duis sint culpa anim laboris. Consectetur nulla eu
commodo ea culpa velit commodo incididunt sunt ipsum.
</Panel>`;
