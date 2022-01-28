import React from "react";
import { Menu } from "@navikt/ds-react";
import { ExampleComponent } from "../../lib";

export const MenuExample: ExampleComponent = () => (
  <>
    <Menu>
      <Menu.Item href="#leo">Satser</Menu.Item>
      <Menu.Item href="#leo">Regelverk</Menu.Item>
      <Menu.Collapse title="Medlemskap i folketrygden">
        <Menu.Item href="#nulla" active>
          Nulla
        </Menu.Item>
        <Menu.Item href="#luctus">Luctus</Menu.Item>
      </Menu.Collapse>
      <Menu.Collapse title="Skjema og søknad">
        <Menu.Item href="#justo" aria-current="page">
          Se hva som er endret
        </Menu.Item>
        <Menu.Collapse title="Relatert innhold">
          <Menu.Item href="#nulla">Saksbehandlingstider</Menu.Item>
          <Menu.Item href="#luctus">Meld fra om endringer</Menu.Item>
        </Menu.Collapse>
      </Menu.Collapse>
    </Menu>
  </>
);

MenuExample.react = `
<Menu>
<Menu.Item href="#leo">Leo</Menu.Item>
<Menu.Collapse title="Proin">
  <Menu.Item href="#nulla" active>
    Nulla
  </Menu.Item>
  <Menu.Item href="#luctus">Luctus</Menu.Item>
</Menu.Collapse>
<Menu.Collapse title="Accumsan">
  <Menu.Item href="#justo" aria-current="page">
    Justo
  </Menu.Item>
  <Menu.Collapse title="Proin">
    <Menu.Item href="#nulla">Nulla</Menu.Item>
    <Menu.Item href="#luctus">Luctus</Menu.Item>
  </Menu.Collapse>
</Menu.Collapse>
</Menu>
`;
