import { Heading } from "@navikt/ds-react";
import React from "react";
import { PropTableType, PropType } from "../../lib";
import { StyledCode } from "../SanityBlockContent";
import * as S from "./prop-table.styles";

const PropTable = ({ node }: { node: PropTableType }): JSX.Element => {
  if (!node.props || node.props.length === 0) {
    return null;
  }

  const table = (prop: PropType) => {
    return (
      <table
        key={prop.name}
        className="tabell"
        summary="Oversikt over react-props komponenten bruker"
      >
        <thead>
          <tr>
            <th>
              <Heading as="span" size="xsmall">
                {`${prop.name}${prop.required ? "*" : ""}`}
              </Heading>
            </th>
            <td />
          </tr>
        </thead>
        <tbody>
          <tr>
            <th>Type</th>
            <td>
              <pre style={{ margin: 0 }}>
                <StyledCode>{prop.type.split("| ").join("|\n")}</StyledCode>
              </pre>
            </td>
          </tr>
          {prop.description && (
            <tr>
              <th>Description</th>
              <td>{prop.description}</td>
            </tr>
          )}
          {prop.default && (
            <tr>
              <th>Default</th>
              <td>{prop.default}</td>
            </tr>
          )}
        </tbody>
      </table>
    );
  };
  return (
    <S.PropTable>
      <S.TableWrapper>{node.props.map((prop) => table(prop))}</S.TableWrapper>
    </S.PropTable>
  );
};

export default PropTable;
