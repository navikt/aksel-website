import { BodyShort, Detail, Table } from "@navikt/ds-react";
import styled from "styled-components";
import { DsColor } from "../../../lib/autogen-types";
import Color from "color";

const ScColorRoles = styled.ul`
  padding: 0;
  margin: 0;

  li {
    list-style-type: none;
  }
`;

const ScDataCell = styled(Table.DataCell)`
  vertical-align: top;
  min-width: fit-content;
`;

const ScTableRow = styled(Table.Row)`
  font-size: 1rem;
  width: 100%;

  :focus {
    outline: none;
    box-shadow: inset var(--navds-shadow-focus);
    border-color: red;
    z-index: 1;
  }
`;

const ScColorBox = styled.div<{ background: string; dark: boolean }>`
  background-color: ${(props) => props.background};
  color: var(--navds-semantic-color-text);
  color: ${(props) =>
    props.dark && "var(--navds-semantic-color-text-inverted);"};
  height: 66px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  border-radius: 4px;
  padding: 0 1rem;
  min-width: 10rem;
`;

const WhiteColorBox = styled(ScColorBox)`
  border: 1px solid var(--navds-semantic-color-divider);
`;

const ScGlobalBlock = styled.button`
  white-space: nowrap;
  vertical-align: top;
  padding: 0.5rem 1rem 0.5rem 1rem;
  margin: 0 -1rem;
  background: none;
  border: none;
  appearance: none;
  text-align: left;
  max-width: var(--text-max-width);

  :hover {
    background-color: var(--navds-semantic-color-canvas-background);
  }

  :focus {
    outline: none;
    box-shadow: var(--navds-shadow-focus);
    z-index: 1;
  }
`;

const ColorBox = ({ prop }: { prop: DsColor }): JSX.Element => {
  const color = Color(prop.color_value);
  const Box = color.luminosity() > 0.8 ? WhiteColorBox : ScColorBox;
  if (prop.color_type === "global") {
    return (
      <Box background={color.hex()} dark={color.isDark()}>
        <BodyShort>{prop.title}</BodyShort>
        <Detail size="small">{color.hex()}</Detail>
      </Box>
    );
  }
  return (
    <Box background={color.hex()} dark={color.isDark()}>
      {prop.title}
    </Box>
  );
};

export const GlobalTableRow = ({
  prop,
  ...rest
}: {
  prop: DsColor;
  onClick: (c: any) => void;
}) => {
  return (
    <ScGlobalBlock {...rest}>
      <ColorBox prop={prop} />
    </ScGlobalBlock>
  );
};

export const SemanticTableRow = ({
  prop,
  ...rest
}: {
  prop: DsColor;
  onClick: (c: any) => void;
}) => {
  return (
    <ScTableRow tabIndex={0} forwardedAs="button" {...rest}>
      <Table.DataCell>
        <ColorBox prop={prop} />
      </Table.DataCell>
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
