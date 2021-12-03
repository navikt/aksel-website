import React from "react";
import { withErrorBoundary } from "../error-boundary";
import { DsColorCategories, DsColor } from "../../lib/autogen-types";
import styled from "styled-components";
import { Heading, Table, BodyShort } from "@navikt/ds-react";
import { Text } from "@sanity/ui";
import Color from "color";
import {
  NavdsSemanticColorTextDefault,
  NavdsSemanticColorTextInverted,
} from "@navikt/ds-tokens";

const capitalize = (s) => (s && s[0].toUpperCase() + s.slice(1)) || "";

const ScColorBox = styled.div<{ background: string; dark: boolean }>`
  background-color: ${(props) => props.background};
  color: var(--navds-semantic-color-text-default);
  color: ${(props) =>
    props.dark && "var(--navds-semantic-color-text-inverted)"};
  width: 128px;
  height: 66px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  border-radius: 4px;

  p {
    margin: 0 1rem;
  }
`;

const ScColorCell = styled(Table.DataCell)`
  white-space: nowrap;
  width: 0;
`;

const ScColorRoles = styled.ul`
  padding: 0;
  margin: 0;
  li {
    list-style-type: none;
  }
`;

const ScHeaderCell = styled(BodyShort)`
  color: var(--navds-semantic-color-text-muted);
`;

const ScDataCell = styled(Table.DataCell)`
  vertical-align: top;
`;

const ScTableRow = styled(Table.Row)`
  font-size: 16px;
`;

const ScHexColor = styled.p`
  font-size: 14px;
`;

const ColorBox = ({ prop }: { prop: DsColor }): JSX.Element => {
  const color = Color(prop.color_value);
  console.log(color.isDark());
  return (
    <ScColorBox background={color.hex()} dark={color.isDark()}>
      <p>{prop.color_name}</p>
      <ScHexColor>{color.hex()}</ScHexColor>
    </ScColorBox>
  );
};

const ColorCategory = ({ node }: { node: DsColorCategories }): JSX.Element => {
  const SemanticTableRow = ({ prop }: { prop: DsColor }) => {
    return (
      <ScTableRow>
        <ScColorCell>
          <ColorBox prop={prop} />
        </ScColorCell>
        <ScDataCell>{prop.title}</ScDataCell>
        <ScDataCell>
          {prop.color_roles && (
            <ScColorRoles>
              {prop.color_roles.map((role) => (
                <li key={role}>{role}</li>
              ))}
            </ScColorRoles>
          )}
        </ScDataCell>
      </ScTableRow>
    );
  };

  const GlobalTableRow = ({ prop }: { prop: DsColor }) => {
    const color = Color(prop.color_value);
    const targetText = color.isDark()
      ? Color(NavdsSemanticColorTextInverted)
      : Color(NavdsSemanticColorTextDefault);

    return (
      <ScTableRow>
        <ScColorCell>
          <ColorBox prop={prop} />
        </ScColorCell>
        <ScDataCell>{prop.title}</ScDataCell>
        <ScDataCell>WCAG {color.contrast(targetText).toFixed(2)}</ScDataCell>
      </ScTableRow>
    );
  };

  return (
    <div>
      <Heading size="small" as="h2" id={node._id}>
        {capitalize(node.title)}
      </Heading>
      {node.description ? <Text size={2}>{node.description}</Text> : null}
      <Table>
        <Table.Header>
          <Table.Row>
            <ScHeaderCell size="small" forwardedAs={Table.HeaderCell}>
              Eksempel
            </ScHeaderCell>
            <ScHeaderCell size="small" forwardedAs={Table.HeaderCell}>
              Token
            </ScHeaderCell>
            <ScHeaderCell size="small" forwardedAs={Table.HeaderCell}>
              Rolle
            </ScHeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {node.colors?.map((color) =>
            color.color_type === "semantic" ? (
              <SemanticTableRow prop={color} key={color._key} />
            ) : (
              <GlobalTableRow prop={color} key={color._key} />
            )
          )}
        </Table.Body>
      </Table>
    </div>
  );
};

export default withErrorBoundary(ColorCategory, "Fargekategori");
