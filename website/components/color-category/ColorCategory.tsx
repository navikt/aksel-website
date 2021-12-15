import React from "react";
import { withErrorBoundary } from "../error-boundary";
import { DsColorCategories, DsColor } from "../../lib/autogen-types";
import styled from "styled-components";
import { Table, BodyShort, BodyLong, Detail } from "@navikt/ds-react";
import Color from "color";

const ScColorBox = styled.div<{ background: string; dark: boolean }>`
  background-color: ${(props) => props.background};
  color: var(--navds-semantic-color-text-default);
  color: ${(props) =>
    props.dark && "var(--navds-semantic-color-text-inverted)"};
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

const ScHexColor = styled(Detail)`
  /* font-size: 14px; */
`;

const ScSection = styled.div`
  margin-bottom: 2rem;
`;

const ScTable = styled(Table)`
  table-layout: fixed;
`;

const TwoBeforeOne = 1;
const OneBeforeTwo = -1;

function compare(one: DsColor, two: DsColor): number {
  if (one.color_index === undefined && two.color_index === undefined) {
    return one.title?.localeCompare(two.title, "no", { numeric: true });
  }
  if (one.color_index === undefined) {
    return TwoBeforeOne;
  }
  if (two.color_index === undefined) {
    return OneBeforeTwo;
  }
  if (one.color_index == two.color_index) {
    return one.title?.localeCompare(two.title, "no", { numeric: true });
  }
  return one.color_index > two.color_index ? TwoBeforeOne : OneBeforeTwo;
}

const ColorBox = ({ prop }: { prop: DsColor }): JSX.Element => {
  const color = Color(prop.color_value);
  if (prop.color_type === "global") {
    return (
      <ScColorBox background={color.hex()} dark={color.isDark()}>
        <p>{prop.title}</p>
        <ScHexColor size="small">{color.hex()}</ScHexColor>
      </ScColorBox>
    );
  }
  return (
    <ScColorBox background={color.hex()} dark={color.isDark()}>
      <p>{prop.title}</p>
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
    return (
      <ScTableRow>
        <ScColorCell>
          <ColorBox prop={prop} />
        </ScColorCell>
      </ScTableRow>
    );
  };

  node.colors.sort(compare);

  return (
    <ScSection>
      {node.description ? <BodyLong>{node.description}</BodyLong> : null}
      <ScTable>
        <Table.Header>
          <Table.Row>
            <ScHeaderCell size="small" forwardedAs={Table.HeaderCell}>
              Token
            </ScHeaderCell>
            {node.colors[0].color_type === "semantic" && (
              <ScHeaderCell size="small" forwardedAs={Table.HeaderCell}>
                Rolle
              </ScHeaderCell>
            )}
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
      </ScTable>
    </ScSection>
  );
};

export default withErrorBoundary(ColorCategory, "Fargekategori");
