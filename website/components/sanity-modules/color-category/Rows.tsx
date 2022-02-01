import { BodyShort, Detail, Table } from "@navikt/ds-react";
import styled from "styled-components";
import { DsColor } from "../../../lib";
import Color from "color";
import cl from "classnames";

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

  :hover {
    cursor: pointer;
  }

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
  padding: 0;
  margin: 0;
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

const ColorBox = ({
  prop,
  first,
  last,
}: {
  prop: DsColor;
  first?: boolean;
  last?: boolean;
}): JSX.Element => {
  const color = Color(prop.color_value);
  const Box = color.luminosity() > 0.8 ? WhiteColorBox : ScColorBox;
  if (prop.color_type === "global") {
    return (
      <div
        style={{ backgroundColor: color.hex() }}
        className={cl(
          "border-none h-16 flex flex-col justify-center px-4 min-w-[10rem] w-full",
          {
            "text-text": !color.isDark(),
            "text-text-inverted": color.isDark(),
            "rounded-b": last,
            "rounded-t": first,
          }
        )}
      >
        <BodyShort>{prop.title}</BodyShort>
        <Detail size="small">{color.hex()}</Detail>
      </div>
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
  first,
  last,
  ...rest
}: {
  prop: DsColor;
  onClick: (c: any) => void;
  first?: boolean;
  last?: boolean;
}) => {
  return (
    <ScGlobalBlock {...rest} className="first:rounded-t last:rounded-b">
      <ColorBox prop={prop} first={first} last={last} />
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
