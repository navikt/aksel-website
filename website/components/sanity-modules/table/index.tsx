import { Table } from "@navikt/ds-react";
import React from "react";
import styled from "styled-components";
import { OverflowDetector } from "../..";
import { Table as TableT } from "../../../lib";
import { withErrorBoundary } from "../../ErrorBoundary";
import { TableBlockContent } from "./TableBlockContent";

const ScWrapper = styled.div`
  margin-bottom: var(--navds-spacing-8);
`;

const ScHeaderCell = styled(Table.HeaderCell)`
  color: var(--navds-semantic-color-text-muted);

  > span,
  > * > span {
    font-size: 1rem;
  }
`;

const ScCenter = styled.span`
  display: flex;
  justify-content: center;
`;

const ScRight = styled.span`
  display: flex;
  justify-content: flex-end;
`;

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
        return <ScCenter>{children}</ScCenter>;
      case "right":
        return <ScRight>{children}</ScRight>;
      default:
        return <>{children}</>;
    }
  };

  return (
    <ScWrapper>
      <OverflowDetector>
        <Table>
          {node.header_direction === "row" && (
            <Table.Header>
              <Table.Row>
                {node.rows[0].cells.map((cell) => (
                  <ScHeaderCell key={cell._key}>
                    <Alignment align={cell.alignment}>
                      <TableBlockContent blocks={cell.body} />
                    </Alignment>
                  </ScHeaderCell>
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
    </ScWrapper>
  );
};
export default withErrorBoundary(TableComponent, "Tabell");
