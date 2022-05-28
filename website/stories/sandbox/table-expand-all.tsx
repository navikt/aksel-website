import { Expand, ExpandFilled } from "@navikt/ds-icons";
import { Table } from "@navikt/ds-react";
import { format } from "date-fns";
import { useState } from "react";
import { BgColors } from "../../lib/types/types";
import { SandboxComponentv2 } from "./types";

const data = [
  {
    name: "Jakobsen, Markus",
    fnr: "03129265463",
    start: "2021-04-28T19:12:14.358Z",
  },
  {
    name: "Halvorsen, Mari",
    fnr: "16063634134",
    start: "2022-01-29T09:51:19.833Z",
  },
  {
    name: "Christiansen, Mathias",
    fnr: "18124441438",
    start: "2021-06-04T20:57:29.159Z",
  },
];

Expand.displayName = "Expand";
ExpandFilled.displayName = "ExpandFilled";
Table.displayName = "Table";
Table.HeaderCell.displayName = "Table.HeaderCell";
Table.Row.displayName = "Table.Row";
Table.Header.displayName = "Table.Header";
Table.Body.displayName = "Table.Body";
Table.ExpandableRow.displayName = "Table.ExpandableRow";
Table.DataCell.displayName = "Table.DataCell";

const TableExpandAllSandbox: SandboxComponentv2 = () => {
  const [expandedRows, setExpandedRows] = useState([]);
  const toggleExpandedRow = (value) =>
    setExpandedRows((list) =>
      list.includes(value)
        ? list.filter((id) => id !== value)
        : [...list, value]
    );

  const allOpen = expandedRows.length === data.length;

  return (
    <div className="flex w-full flex-col gap-4">
      <Table>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell
              className={[
                "navds-table__toggle-expand-cell",
                allOpen ? "navds-table__toggle-expand-cell--open" : "",
              ].join(" ")}
            >
              <button
                className="navds-table__toggle-expand-button"
                aria-expanded={allOpen}
                onClick={() =>
                  setExpandedRows(allOpen ? [] : data.map(({ name }) => name))
                }
              >
                <Expand
                  className="navds-table__expandable-icon"
                  title={
                    allOpen ? "Kollaps alle rader" : "Ekspander alle rader"
                  }
                />
                <ExpandFilled
                  className="navds-table__expandable-icon navds-table__expandable-icon--filled"
                  title={
                    allOpen ? "Kollaps alle rader" : "Ekspander alle rader"
                  }
                />
              </button>
            </Table.HeaderCell>
            <Table.HeaderCell scope="col">Navn</Table.HeaderCell>
            <Table.HeaderCell scope="col">Fødseslnr.</Table.HeaderCell>
            <Table.HeaderCell scope="col">Start</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {data.map(({ name, fnr, start }) => (
            <Table.ExpandableRow
              content="Innhold i ekspanderbar rad"
              key={fnr}
              open={expandedRows.includes(name)}
              onOpenChange={() => toggleExpandedRow(name)}
            >
              <Table.HeaderCell scope="row">{name}</Table.HeaderCell>
              <Table.DataCell>
                {fnr.substring(0, 6)} {fnr.substring(6)}
              </Table.DataCell>
              <Table.DataCell>
                {format(new Date(start), "dd.MM.yyyy")}
              </Table.DataCell>
            </Table.ExpandableRow>
          ))}
        </Table.Body>
      </Table>
    </div>
  );
};

TableExpandAllSandbox.args = {
  props: {},
  background: BgColors.WHITE,
};

export default TableExpandAllSandbox;
