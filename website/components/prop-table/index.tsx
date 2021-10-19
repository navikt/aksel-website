import { Table } from "@navikt/ds-react";
import React from "react";
import { withErrorBoundary } from "..";
import {
  PropTable as PropTableT,
  PropTableProp as PropTablePropT,
} from "../../lib/autogen-types";
import { StyledCode } from "../SanityBlockContent";
import * as S from "./prop-table.styles";

const PropTable = ({ node }: { node: PropTableT }): JSX.Element => {
  if (!node.props || node.props.length === 0) {
    return null;
  }

  return (
    <S.PropTable>
      <Table size="small">
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Navn</Table.HeaderCell>
            <Table.HeaderCell>value</Table.HeaderCell>
            <Table.HeaderCell>default</Table.HeaderCell>
            <Table.HeaderCell>description</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {node.props.map((prop: PropTablePropT) => (
            <Table.Row key={prop.type}>
              <Table.HeaderCell>{`${prop.name}${
                prop.required && "*"
              }`}</Table.HeaderCell>
              <Table.DataCell>
                <pre style={{ margin: 0 }}>
                  <StyledCode>{prop.type.replaceAll("| ", "|\n")}</StyledCode>
                </pre>
              </Table.DataCell>
              <Table.DataCell>
                {prop.default ? prop.default : <span>-</span>}
              </Table.DataCell>
              <Table.DataCell>
                {prop.description ? prop.description : <span>-</span>}
              </Table.DataCell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
    </S.PropTable>
  );
};

export default withErrorBoundary(PropTable, "Proptable komponent");
