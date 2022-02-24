import { Table } from "@navikt/ds-react";
import React from "react";
import { OverflowDetector } from "../..";
import { Table as TableT } from "../../../lib";
import { withErrorBoundary } from "../../ErrorBoundary";
import { TableBlockContent } from "./TableBlockContent";

const TableComponent = ({ node }: { node: TableT }): JSX.Element => {
  if (!node || !node.rows || node.rows.length < 2) {
    return null;
  }

  const Alignment = ({
    children,
    align,
  }: {
    children: any;
    align: "left" | "center" | "right";
  }) => {
    switch (align) {
      case "left":
        return <>{children}</>;
      case "center":
        return <span className="flex justify-center">{children}</span>;
      case "right":
        return <span className="flex justify-end">{children}</span>;
      default:
        return <>{children}</>;
    }
  };

  return (
    <div className="mb-8">
      <OverflowDetector>
        <Table>
          {node.header_direction === "row" && (
            <Table.Header>
              <Table.Row>
                {node.rows[0].cells.map((cell) => (
                  <Table.HeaderCell className="text-text-muted" key={cell._key}>
                    <Alignment align={cell.alignment}>
                      <TableBlockContent blocks={cell.body} />
                    </Alignment>
                  </Table.HeaderCell>
                ))}
              </Table.Row>
            </Table.Header>
          )}

          <Table.Body>
            {node.rows.slice(1).map((row) => (
              <Table.Row key={row._key}>
                {row.cells.map((cell, i) =>
                  i === 0 && node.header_direction === "column" ? (
                    <Table.HeaderCell key={cell._key}>
                      <Alignment align={cell.alignment}>
                        <TableBlockContent blocks={cell.body} />
                      </Alignment>
                    </Table.HeaderCell>
                  ) : (
                    <Table.DataCell key={cell._key}>
                      <Alignment align={cell.alignment}>
                        <TableBlockContent blocks={cell.body} />
                      </Alignment>
                    </Table.DataCell>
                  )
                )}
              </Table.Row>
            ))}
          </Table.Body>
        </Table>
      </OverflowDetector>
    </div>
  );
};
export default withErrorBoundary(TableComponent, "Tabell");
