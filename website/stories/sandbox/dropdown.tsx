import { Button } from "@navikt/ds-react";
import { Dropdown } from "@navikt/ds-react-internal";
import React from "react";
import { SandboxComponentT } from "./types";

const DropdownSandbox: SandboxComponentT = (props: any) => {
  return (
    <div>
      <Dropdown>
        <Button as={Dropdown.Toggle}>Toggle</Button>
        <Dropdown.Menu placement={props?.placement || undefined}>
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
          <Dropdown.Menu.Divider />
          <Dropdown.Menu.List>
            <Dropdown.Menu.List.Item>Gosys</Dropdown.Menu.List.Item>
            <Dropdown.Menu.List.Item>Infotrygd</Dropdown.Menu.List.Item>
          </Dropdown.Menu.List>
        </Dropdown.Menu>
      </Dropdown>
    </div>
  );
};

DropdownSandbox.args = {
  props: {
    placement: [
      "",
      "top",
      "bottom",
      "right",
      "left",
      "top-start",
      "top-end",
      "bottom-start",
      "bottom-end",
      "right-start",
      "right-end",
      "left-start",
      "left-end",
    ],
  },
};

DropdownSandbox.getCode = (props: any) => {
  return `<Dropdown>
  <Button as={Dropdown.Toggle}>Toggle</Button>
  <Dropdown.Menu${props?.placement ? ` placement="${props?.placement}"` : ""}>
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
    <Dropdown.Menu.Divider />
    <Dropdown.Menu.List>
      <Dropdown.Menu.List.Item>Gosys</Dropdown.Menu.List.Item>
      <Dropdown.Menu.List.Item>Infotrygd</Dropdown.Menu.List.Item>
    </Dropdown.Menu.List>
  </Dropdown.Menu>
</Dropdown>`;
};

export default DropdownSandbox;
