import { BodyLong, Link, Tag } from "@navikt/ds-react";
import React from "react";
import { withErrorBoundary } from "..";
import {
  PropTable as PropTableT,
  PropTableProp as PropTablePropT,
} from "../../lib/autogen-types";
import * as S from "./prop-table.styles";
import NextLink from "next/link";
import styled from "styled-components";
import { StyledCode } from "../SanityBlockContent";

export const TypeCode = styled.code`
  color: var(--navds-color-lightblue-80);
  font-size: 1rem;
`;

const PropTable = ({ node }: { node: PropTableT }): JSX.Element => {
  const Table = ({ prop }: { prop: PropTablePropT }) => (
    <S.Table>
      <S.Caption>
        {prop.required && <S.Required>Required</S.Required>}
        <Tag variant="info">{prop.name}</Tag>
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
              <TypeCode>{prop.type.replaceAll("| ", "|\n")}</TypeCode>
            </pre>
          </S.Td>
        </tr>
        <tr>
          <S.Th className="navds-heading navds-heading--xsmall">Default</S.Th>
          <S.Td className="navds-body-short">
            {prop.default ? (
              <TypeCode>{prop.default}</TypeCode>
            ) : (
              <span>-</span>
            )}
          </S.Td>
        </tr>
      </S.Tbody>
    </S.Table>
  );

  return (
    <S.PropTable>
      <BodyLong>
        <ul>
          {node.overridable && (
            <li>
              Komponenten er implementert med{" "}
              <NextLink href="#" passHref>
                <Link>OverridableComponent</Link>
              </NextLink>
            </li>
          )}
          {node.refplacement && (
            <li>
              <StyledCode>ref</StyledCode> er plassert på {node.refplacement}
            </li>
          )}
          {node.extends && (
            <li>
              Props extends <StyledCode>{node.extends}</StyledCode>
            </li>
          )}
        </ul>
      </BodyLong>

      {node.preset_children && (
        <Table
          prop={{
            _type: "prop_table_prop",
            name: "children",
            type: "React.ReactNode",
            required: true,
          }}
        />
      )}
      {node.preset_classname && (
        <Table
          prop={{
            _type: "prop_table_prop",
            name: "className",
            type: "string",
            required: false,
          }}
        />
      )}

      {node?.props?.map((prop: PropTablePropT) => (
        <Table key={prop.name} prop={prop} />
      ))}
    </S.PropTable>
  );
};

export default withErrorBoundary(PropTable, "Proptable komponent");
