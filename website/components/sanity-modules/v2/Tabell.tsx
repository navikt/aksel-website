import { Table } from "@navikt/ds-react";
import React from "react";
import { Tabell as TabellT } from "@/lib";
import { withErrorBoundary } from "@/error-boundary";
import { SanityBlockContent } from "../../SanityBlockContent";

const TableComponent = ({ node }: { node: TabellT }): JSX.Element => {
  if (!node || !node.powerTable || node.powerTable?.rows?.length < 2) {
    return null;
  }

  return (
    <div className="mb-8 overflow-x-auto">
      <Table>
        <Table.Header>
          <Table.Row>
            {node.powerTable?.rows[0].cells?.map((cell) => (
              <Table.HeaderCell key={cell?._key} className="text-text-muted">
                <SanityBlockContent blocks={cell?.data?.body} noLastMargin />
              </Table.HeaderCell>
            ))}
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {node.powerTable?.rows?.slice?.(1)?.map((row) => (
            <Table.Row key={row?._key}>
              {row?.cells?.map((cell) => (
                <Table.DataCell
                  key={cell?._key}
                  rowSpan={cell?.rowSpan}
                  colSpan={cell?.colSpan}
                >
                  <SanityBlockContent blocks={cell?.data?.body} noLastMargin />
                </Table.DataCell>
              ))}
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
    </div>
  );
};

export default withErrorBoundary(TableComponent, "Tabell");
