import { Detail, Table } from "@navikt/ds-react";
import styled from "styled-components";
import { DsColor } from "../../../lib/autogen-types";
import Color from "color";

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

const ScDataCell = styled(Table.DataCell)`
  vertical-align: top;
`;

const ScTableRow = styled(Table.Row)`
  font-size: 16px;
`;

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

const WhiteColorBox = styled(ScColorBox)`
  border: 1px solid var(--navds-semantic-color-divider);
`;

const ColorBox = ({ prop }: { prop: DsColor }): JSX.Element => {
  const color = Color(prop.color_value);
  const Box = color.luminosity() > 0.8 ? WhiteColorBox : ScColorBox;
  if (prop.color_type === "global") {
    return (
      <Box background={color.hex()} dark={color.isDark()}>
        <p>{prop.title}</p>
        <Detail size="small">{color.hex()}</Detail>
      </Box>
    );
  }
  return (
    <Box background={color.hex()} dark={color.isDark()}>
      <p>{prop.title}</p>
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
    <ScTableRow {...rest}>
      <ScColorCell>
        <ColorBox prop={prop} />
      </ScColorCell>
    </ScTableRow>
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
    <ScTableRow {...rest}>
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
