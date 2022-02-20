import { BgColors, SandboxComponent } from "./types";

const data = [
  { name: "Donald Smith", country: "USA", points: 38 },
  { name: "Preben Aalborg", country: "Denmark", points: 11 },
  { name: "Per Hansen", country: "Norway", points: 15 },
  {
    name: "Christina Salikova",
    country: "Czech Republic",
    points: 38,
  },
  { name: "Nina Margeaux", country: "France", points: 64 },
];

const ButtonSandbox: SandboxComponent = (props) => {
  const propZebraStripes = props?.zebraStripes ? ` zebraStripes` : "";
  const propSize = props?.size ? ` size="${props.size}"` : "";

  const comp = `<Table${propZebraStripes}${propSize}>
                  <Table.Header>
                    <Table.Row>
                      <Table.HeaderCell scope="col">Name</Table.HeaderCell>
                      <Table.HeaderCell scope="col">Country</Table.HeaderCell>
                      <Table.HeaderCell scope="col">Points</Table.HeaderCell>
                    </Table.Row>
                  </Table.Header>
                  <Table.Body>
                  ${data
                    .map(
                      ({ name, country, points }) =>
                        `<Table.Row>
                          <Table.HeaderCell scope="row">${name}</Table.HeaderCell>
                          <Table.DataCell>${country}</Table.DataCell>
                          <Table.DataCell>${points}</Table.DataCell>
                        </Table.Row>`
                    )
                    .join("")}
                  </Table.Body>
                </Table>`;

  switch (props.Komposisjon) {
    case "":
      return comp;
    case "Selectable":
      return `
      const SelectableTable = () => {
        const [selectedRows, toggleSelectedRow] = useToggleList([]);

        return (
          <Table${propZebraStripes}${propSize}>
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell scope="col">Selected</Table.HeaderCell>
                <Table.HeaderCell scope="col">Name</Table.HeaderCell>
                <Table.HeaderCell scope="col">Country</Table.HeaderCell>
                <Table.HeaderCell scope="col">Points</Table.HeaderCell>
              </Table.Row>
            </Table.Header>
            <Table.Body>
            ${data
              .map(
                ({ name, country, points }, i) =>
                  `<Table.Row selected={selectedRows.includes("${i}")}>
                    <Table.DataCell>
                      <Checkbox
                        ${propSize}
                        hideLabel
                        checked={selectedRows.includes("${i}")}
                        onChange={() => toggleSelectedRow("${i}")}
                        aria-labelledby="id${i}"
                      >
                        {" "}
                      </Checkbox>
                    </Table.DataCell>
                    <Table.HeaderCell scope="row">
                      <span id="id${i}">${name}</span>
                    </Table.HeaderCell>
                    <Table.DataCell>${country}</Table.DataCell>
                    <Table.DataCell>${points}</Table.DataCell>
                  </Table.Row>`
              )
              .join("")}
            </Table.Body>
          </Table>
        );
      }

      render(<SelectableTable />)
      const useToggleList = (initialState) => {
        const [list, setList] = React.useState(initialState);

        return [
          list,
          (value) =>
            setList((list) =>
              list.includes(value)
                ? list.filter((id) => id !== value)
                : [...list, value]
            ),
        ];
      };
      `;
    default:
      return comp;
  }
};

ButtonSandbox.args = {
  props: {
    size: ["medium", "small"],
    zebraStripes: false,
    Komposisjon: ["", "Selectable"],
  },
  background: BgColors.WHITE,
};

export default ButtonSandbox;
