import { SandboxComponent } from "./types";

const AlertSandbox: SandboxComponent = (props) => {
  let user = `<Header.User name="Ola Normann" ${
    !props["system-meny"] && `style={{ marginLeft: "auto" }}`
  } />`;

  switch (props.user) {
    case "description":
      user = `<Header.User name="Ola Normann" description="D123456" ${
        !props["system-meny"] && `style={{ marginLeft: "auto" }}`
      } />`;
      break;
    case "initialer":
      user = `<Dropdown>
      <Header.Button as={Dropdown.Toggle} ${
        !props["system-meny"] && `style={{ marginLeft: "auto" }}`
      }>
        <BodyShort size="small" title="Kong Harald">
          ON
        </BodyShort>
        <Expand />
      </Header.Button>
      <Dropdown.Menu>
        <div>
          <BodyLong size="small" as="div">
            Ola Normann
          </BodyLong>
          <Detail size="small" as="div">
            <div>Ident D123456</div>
            <div>Enhet: Skien</div>
          </Detail>
        </div>
        <Divider />
        <Dropdown.Menu.List>
          <Dropdown.Menu.List.Item as="a" href="#">
            Innstillinger
          </Dropdown.Menu.List.Item>
          <Dropdown.Menu.List.Item>
            Logg ut
          </Dropdown.Menu.List.Item>
        </Dropdown.Menu.List>
      </Dropdown.Menu>
    </Dropdown>`;
      break;
    case "Menu":
      user = `<Dropdown>
      <Header.UserButton
        ${!props["system-meny"] && `style={{ marginLeft: "auto" }}`}
        as={Dropdown.Toggle}
        name="Ola Normann"
        description="Enhet: Skien"
      />
      <Dropdown.Menu>
        <Dropdown.Menu.List>
          <Dropdown.Menu.List.Item>
            Logg ut
          </Dropdown.Menu.List.Item>
        </Dropdown.Menu.List>
      </Dropdown.Menu>
    </Dropdown>`;
      break;
    default:
      break;
  }

  const system = props["system-meny"]
    ? `<Dropdown>
  <Header.Button as={Dropdown.Toggle} style={{ marginLeft: "auto" }}>
    <System
      style={{ fontSize: "1.5rem" }}
      title="Systemer og oppslagsverk"
    />
  </Header.Button>

  <Dropdown.Menu>
    <Dropdown.Menu.GroupedList>
      <Dropdown.Menu.GroupedList.Heading>
        Systemer og oppslagsverk
      </Dropdown.Menu.GroupedList.Heading>
      <Dropdown.Menu.GroupedList.Item>
        A.Inntekt
      </Dropdown.Menu.GroupedList.Item>
    </Dropdown.Menu.GroupedList>
  </Dropdown.Menu>
</Dropdown>`
    : "";

  return `<Header className="sandbox-header">
    <Header.Title ${props.title === "Heading" ? `as="h1"` : `href="#"`}>${
    props.title === "Heading" ? "NAV Sykepenger" : "Hjem"
  }</Header.Title>
    ${system}
    ${user}
  </Header>`;
};

AlertSandbox.args = {
  props: {
    title: ["Heading", "Lenke"],
    user: ["", "description", "Menu", "initialer"],
    "system-meny": false,
  },
};

export default AlertSandbox;
