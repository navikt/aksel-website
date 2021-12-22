import { BodyLong, Link, Tag } from "@navikt/ds-react";
import React from "react";
import styled from "styled-components";
import {
  PropTable as PropTableT,
  PropTableProp as PropTablePropT,
} from "../../../lib/autogen-types";
import { ScCode } from "../../SanityBlockContent";
import { withErrorBoundary } from "../../website-features/error-boundary";
import * as S from "./prop-table.styles";

export const TypeCode = styled.code`
  color: var(--navds-global-color-lightblue-800);
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
              <TypeCode>{prop.type}</TypeCode>
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
      <BodyLong as="ul">
        {node.overridable && (
          <li>
            Komponenten er implementert med{" "}
            <Link href="/designsystem/side/overridablecomponent">
              OverridableComponent
            </Link>
          </li>
        )}
        {node.refplacement && (
          <li>
            <ScCode>ref</ScCode> er plassert på {node.refplacement}
          </li>
        )}
        {node.extends && (
          <li>
            Props extender <ScCode>{node.extends}</ScCode>
          </li>
        )}
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
            description:
              "Legger til egne klassenavn på elementet Props ekstender",
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
