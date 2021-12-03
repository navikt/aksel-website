import React from "react";
import { withErrorBoundary } from "../error-boundary";
import { DsColorCategories, DsColor } from "../../lib/autogen-types";
import styled from "styled-components";
import { Heading, Table, BodyShort } from "@navikt/ds-react";
import { Text } from "@sanity/ui";
import Color from "color";

const capitalize = (s) => (s && s[0].toUpperCase() + s.slice(1)) || "";

const ScMutedText = styled(BodyShort)`
  color: var(--navds-semantic-color-text-muted);
`;

const ScColorBox = styled.div<{ background: string; dark: boolean }>`
  background-color: ${(props) => props.background};
  color: var(--navds-semantic-color-text-default);
  color: ${(props) =>
    props.dark && "var(--navds-semantic-color-text-inverted)"};
  width: 248px;
  height: 72px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border-radius: 4px;

  p {
    margin: 0;
  }
`;

const ScColorRoles = styled.ul`
  padding: 0;
  margin: 0;
  li {
    list-style-type: none;
  }
`;

const ScHeaderCell = styled(Table.HeaderCell)`
  width: 248px;
  font-weight: inherit;
  vertical-align: top;
`;

const ScDataCell = styled(Table.DataCell)`
  vertical-align: top;
`;

const ColorBox = ({ prop }: { prop: DsColor }): JSX.Element => {
  const color = Color(prop.color_value);
  console.log(color.isDark());
  return (
    <ScColorBox background={color.hex()} dark={color.isDark()}>
      <p>{prop.title}</p>
      {prop.color_type === "global" && <p>{color.hex()}</p>}
    </ScColorBox>
  );
};

const ColorCategory = ({ node }: { node: DsColorCategories }): JSX.Element => {
  const SemanticTableRow = ({ prop }: { prop: DsColor }) => {
    return (
      <Table.Row>
        <ScHeaderCell>
          <ColorBox prop={prop} />
        </ScHeaderCell>
        <ScDataCell>
          <ScMutedText>Bruker:</ScMutedText>
          {prop.color_name}
        </ScDataCell>
        <ScDataCell>
          <ScMutedText>Rolle:</ScMutedText>
          {prop.color_roles && (
            <ScColorRoles>
              {prop.color_roles.map((role) => (
                <li key={role}>{role}</li>
              ))}
            </ScColorRoles>
          )}
        </ScDataCell>
      </Table.Row>
    );
  };

  const GlobalTableRow = ({ prop }: { prop: DsColor }) => {
    const color = Color(prop.color_value);
    const targetText = color.isDark() ? Color("#ffffff") : Color("#262626");

    return (
      <Table.Row>
        <ScHeaderCell>
          <ColorBox prop={prop} />
        </ScHeaderCell>
        <ScDataCell>WCAG {color.contrast(targetText).toFixed(2)}</ScDataCell>
      </Table.Row>
    );
  };

  return (
    <div>
      <Heading size="small" as="h2" id={node._id}>
        {capitalize(node.title)}
      </Heading>
      {node.description ? <Text size={2}>{node.description}</Text> : null}
      <Table>
        {node.colors?.map((color) =>
          color.color_type === "semantic" ? (
            <SemanticTableRow prop={color} key={color._key} />
          ) : (
            <GlobalTableRow prop={color} key={color._key} />
          )
        )}
      </Table>
    </div>
  );
};

export default withErrorBoundary(ColorCategory, "Fargekategori");
