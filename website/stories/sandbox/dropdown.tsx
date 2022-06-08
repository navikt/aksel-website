import { Button } from "@navikt/ds-react";
import { Divider, Dropdown } from "@navikt/ds-react-internal";
import React from "react";
import { SandboxComponentT } from "./types";

Divider.displayName = "Divider";
(Button as any).displayName = "Button";
Dropdown.displayName = "Dropdown";
Dropdown.Toggle.displayName = "Dropdown.Toggle";
Dropdown.Menu.displayName = "Dropdown.Menu";
Dropdown.Menu.GroupedList.displayName = "Dropdown.Menu.GroupedList";
Dropdown.Menu.GroupedList.Heading.displayName =
  "Dropdown.Menu.GroupedList.Heading";
(Dropdown.Menu.GroupedList.Item as any).displayName =
  "Dropdown.Menu.GroupedList.Item";
Dropdown.Menu.List.displayName = "Dropdown.Menu.List";
(Dropdown.Menu.List.Item as any).displayName = "Dropdown.Menu.List.Item";

const DropdownSandbox: SandboxComponentT = () => {
  return (
    <div className="h-60">
      <Dropdown>
        <Button as={Dropdown.Toggle}>Toggle</Button>
        <Dropdown.Menu className="relative z-10">
          <Dropdown.Menu.GroupedList>
            <Dropdown.Menu.GroupedList.Heading>
              Systemer og oppslagsverk
            </Dropdown.Menu.GroupedList.Heading>
            <Dropdown.Menu.GroupedList.Item>
              Gosys
            </Dropdown.Menu.GroupedList.Item>
            <Dropdown.Menu.GroupedList.Item>
              Infotrygd
            </Dropdown.Menu.GroupedList.Item>
          </Dropdown.Menu.GroupedList>
          <Divider />
          <Dropdown.Menu.List>
            <Dropdown.Menu.List.Item>Gosys</Dropdown.Menu.List.Item>
            <Dropdown.Menu.List.Item>Infotrygd</Dropdown.Menu.List.Item>
          </Dropdown.Menu.List>
        </Dropdown.Menu>
      </Dropdown>
    </div>
  );
};

export default DropdownSandbox;
