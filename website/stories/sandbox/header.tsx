import { Expand, System } from "@navikt/ds-icons";
import { BodyShort, BodyLong, Detail, Search } from "@navikt/ds-react";
import { Divider, Dropdown, Header } from "@navikt/ds-react-internal";
import { SandboxComponentv2 } from "./types";

Header.displayName = "Header";
Search.displayName = "Search";
Expand.displayName = "Expand";
System.displayName = "System";
Divider.displayName = "Divider";
(BodyShort as any).displayName = "BodyShort";
(BodyLong as any).displayName = "BodyLong";
(Detail as any).displayName = "Detail";
Header.User.displayName = "Header.User";
(Header.UserButton as any).displayName = "Header.UserButton";
(Header.Button as any).displayName = "Header.Button";
(Header.Title as any).displayName = "Header.Title";

Dropdown.displayName = "Dropdown";
Dropdown.Menu.displayName = "Dropdown.Menu";
Dropdown.Menu.List.displayName = "Dropdown.Menu.List";
(Dropdown.Menu.List.Item as any).displayName = "Dropdown.Menu.List.Item";
Dropdown.Menu.GroupedList.displayName = "Dropdown";
Dropdown.Menu.GroupedList.Heading.displayName =
  "Dropdown.Menu.GroupedList.Heading";
(Dropdown.Menu.GroupedList.Item as any).displayName =
  "Dropdown.Menu.GroupedList.Item";

const HeaderSandbox: SandboxComponentv2 = (props: any) => {
  const ml = {
    ...(!props?.["system-meny"] ? { style: { marginLeft: "auto" } } : {}),
  };

  let user = <Header.User name="Ola Normann" {...ml} />;

  switch (props?.user) {
    case "Med description":
      user = <Header.User name="Ola Normann" description="D123456" {...ml} />;
      break;
    case "Initialer":
      user = (
        <Dropdown>
          <Header.Button as={Dropdown.Toggle} {...ml}>
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
              <Dropdown.Menu.List.Item>Logg ut</Dropdown.Menu.List.Item>
            </Dropdown.Menu.List>
          </Dropdown.Menu>
        </Dropdown>
      );
      break;
    case "Meny":
      user = (
        <Dropdown>
          <Header.UserButton
            {...ml}
            as={Dropdown.Toggle}
            name="Ola Normann"
            description="Enhet: Skien"
          />
          <Dropdown.Menu>
            <Dropdown.Menu.List>
              <Dropdown.Menu.List.Item>Logg ut</Dropdown.Menu.List.Item>
            </Dropdown.Menu.List>
          </Dropdown.Menu>
        </Dropdown>
      );
      break;
    default:
      break;
  }

  const newProps = {
    ...(props?.title === "H-tag"
      ? { as: "h1", children: "Sykepenger" }
      : { href: "#", children: "Hjem" }),
  };

  return (
    <Header className="w-full">
      <Header.Title {...newProps} />
      {props?.search && (
        <form
          className="self-center px-5"
          onSubmit={(e) => {
            e.preventDefault();
            console.log("Search!");
          }}
        >
          <Search
            label="header søk"
            size="small"
            variant="simple"
            placeholder="Søk"
          />
        </form>
      )}
      {props?.["system-meny"] && (
        <Dropdown>
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
        </Dropdown>
      )}
      {user}
    </Header>
  );
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
