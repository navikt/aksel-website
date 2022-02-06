import { BodyLong, Heading, Link, Tag } from "@navikt/ds-react";
import React from "react";
import styled from "styled-components";
import {
  PropTable as PropTableT,
  PropTableProp as PropTablePropT,
} from "../../../lib";
import { InlineCode } from "../../SanityBlockContent";
import { withErrorBoundary } from "../../ErrorBoundary";
import * as S from "./prop-table.styles";
import NextLink from "next/link";

export const TypeCode = styled.code`
  color: var(--navds-global-color-lightblue-800);
  font-size: 1rem;
`;

const PropTable = ({ node }: { node: PropTableT }): JSX.Element => {
  const Table = ({ prop }: { prop: PropTablePropT }) => (
    <S.Table>
      <S.Caption>
        {prop.required && <S.Required>Required</S.Required>}
        <Tag variant="info" size="small">
          {prop.name}
        </Tag>
      </S.Caption>
      <S.Tbody>
        <tr>
          <S.Th className="navds-label navds-label--small">Description</S.Th>
          <S.Td className="navds-body-short navds-body-short">
            {prop.description ? prop.description : <span>-</span>}
          </S.Td>
        </tr>
        <tr>
          <S.Th className="navds-label navds-label--small">Type</S.Th>
          <S.Td className="navds-body-short">
            <pre style={{ margin: 0 }}>
              <TypeCode>{prop.type}</TypeCode>
            </pre>
          </S.Td>
        </tr>
        <tr>
          <S.Th className="navds-label navds-label--small">Default</S.Th>
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
    <details className="index-ignore">
      {node.title ? (
        <Heading
          size="small"
          as="summary"
          className="mb-2 cursor-pointer p-2 hover:bg-interaction-primary-hover-subtle focus:shadow-focus focus:outline-none"
        >
          {node.title}
        </Heading>
      ) : (
        <summary>Props</summary>
      )}

      <S.PropTable>
        <BodyLong as="ul">
          {node.overridable && (
            <li>
              Komponenten er implementert med{" "}
              <NextLink href="/designsystem/side/overridablecomponent" passHref>
                <Link>OverridableComponent</Link>
              </NextLink>
            </li>
          )}
          {node.refplacement && (
            <li>
              <InlineCode>ref</InlineCode> er plassert på {node.refplacement}
            </li>
          )}
          {node.extends && (
            <li>
              Props extender <InlineCode>{node.extends}</InlineCode>
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
    </details>
  );
};

export default withErrorBoundary(PropTable, "Proptable komponent");
