import { SandboxComponent } from "./types";

const HeaderSandbox: SandboxComponent = (props) => {
  let user = `<Header.User name="Ola Normann" ${
    !props["system-meny"] && `style={{ marginLeft: "auto" }}`
  } />`;

  switch (props.user) {
    case "Med description":
      user = `<Header.User name="Ola Normann" description="D123456" ${
        !props["system-meny"] && `style={{ marginLeft: "auto" }}`
      } />`;
      break;
    case "Initialer":
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
    case "Meny":
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

  return `<Header className="w-full">
  <Header.Title ${props.title === "H-tag" ? `as="h1"` : `href="#"`}>${
    props.title === "H-tag" ? "Sykepenger" : "Hjem"
  }</Header.Title>
  ${
    props.search
      ? `<form className="self-center px-5" onSubmit={(e) => {e.preventDefault();console.log("Search!");}}><Search size="small" variant="simple" placeholder="Søk" /></form>`
      : ""
  }
    ${system}${user}
  </Header>`;
};

HeaderSandbox.args = {
  props: {
    title: ["H-tag", "Lenke"],
    user: ["", "Med description", "Meny", "Initialer"],
    "system-meny": false,
    search: false,
  },
};

export default HeaderSandbox;
