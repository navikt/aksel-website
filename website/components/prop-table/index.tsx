import { Tag } from "@navikt/ds-react";
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
      {node.props.map((prop: PropTablePropT) => (
        <S.Table key={prop.name}>
          <S.Caption>
            <Tag variant="info">{`${prop.name}${
              prop.required ? "*" : ""
            }`}</Tag>
          </S.Caption>
          <S.Tbody>
            <tr>
              <S.Th className="navds-heading navds-heading--xsmall">
                Description
              </S.Th>
              <S.Td className="navds-body-short">
                {prop.description ? prop.description : <span>-</span>}
              </S.Td>
            </tr>
            <tr>
              <S.Th className="navds-heading navds-heading--xsmall">Type</S.Th>
              <S.Td className="navds-body-short">
                <pre style={{ margin: 0 }}>
                  <StyledCode>{prop.type.replaceAll("| ", "|\n")}</StyledCode>
                </pre>
              </S.Td>
            </tr>
            <tr>
              <S.Th className="navds-heading navds-heading--xsmall">
                Default
              </S.Th>
              <S.Td className="navds-body-short">
                {prop.default ? prop.default : <span>-</span>}
              </S.Td>
            </tr>
          </S.Tbody>
        </S.Table>
      ))}
    </S.PropTable>
  );
};

export default withErrorBoundary(PropTable, "Proptable komponent");
