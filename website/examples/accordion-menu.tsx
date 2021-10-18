import React from "react";
import { AccordionMenu } from "@navikt/ds-react";

export const AccordionMenuExample = () => (
  <>
    <AccordionMenu>
      <AccordionMenu.Item href="#leo">Leo</AccordionMenu.Item>
      <AccordionMenu.Collapsable title="Proin">
        <AccordionMenu.Item href="#nulla" active>
          Nulla
        </AccordionMenu.Item>
        <AccordionMenu.Item href="#luctus">Luctus</AccordionMenu.Item>
      </AccordionMenu.Collapsable>
      <AccordionMenu.Collapsable title="Accumsan">
        <AccordionMenu.Item href="#justo" aria-current="page">
          Justo
        </AccordionMenu.Item>
        <AccordionMenu.Collapsable title="Proin">
          <AccordionMenu.Item href="#nulla">Nulla</AccordionMenu.Item>
          <AccordionMenu.Item href="#luctus">Luctus</AccordionMenu.Item>
        </AccordionMenu.Collapsable>
      </AccordionMenu.Collapsable>
    </AccordionMenu>
  </>
);

AccordionMenuExample.react = `
<AccordionMenu>
<AccordionMenu.Item href="#leo">Leo</AccordionMenu.Item>
<AccordionMenu.Collapsable title="Proin">
  <AccordionMenu.Item href="#nulla" active>
    Nulla
  </AccordionMenu.Item>
  <AccordionMenu.Item href="#luctus">Luctus</AccordionMenu.Item>
</AccordionMenu.Collapsable>
<AccordionMenu.Collapsable title="Accumsan">
  <AccordionMenu.Item href="#justo" aria-current="page">
    Justo
  </AccordionMenu.Item>
  <AccordionMenu.Collapsable title="Proin">
    <AccordionMenu.Item href="#nulla">Nulla</AccordionMenu.Item>
    <AccordionMenu.Item href="#luctus">Luctus</AccordionMenu.Item>
  </AccordionMenu.Collapsable>
</AccordionMenu.Collapsable>
</AccordionMenu>
`;
