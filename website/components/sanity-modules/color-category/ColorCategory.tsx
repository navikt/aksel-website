import React, { useCallback, useEffect, useState } from "react";
import { withErrorBoundary } from "../../website-features/error-boundary";
import { DsColorCategories, DsColor } from "../../../lib/autogen-types";
import styled from "styled-components";
import { Table, BodyShort, Detail, Modal } from "@navikt/ds-react";
import Color from "color";
import { SanityBlockContent } from "../../SanityBlockContent";
import { useRouter } from "next/router";
import ColorModal from "./ColorModal";

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
  margin-bottom: var(--navds-spacing-7);
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
  const Box = color.luminosity() === 1.0 ? WhiteColorBox : ScColorBox;
  if (prop.color_type === "global") {
    return (
      <Box background={color.hex()} dark={color.isDark()}>
        <p>{prop.title}</p>
        <ScHexColor size="small">{color.hex()}</ScHexColor>
      </Box>
    );
  }
  return (
    <Box background={color.hex()} dark={color.isDark()}>
      <p>{prop.title}</p>
    </Box>
  );
};

const ColorCategory = ({ node }: { node: DsColorCategories }): JSX.Element => {
  const [open, setOpen] = useState(false);
  const [selectedColor, setSelectedColor] = useState<any>(null);
  const router = useRouter();

  const setQuery = useCallback((color: string) => {
    const query = router.query;
    query.color = color;
    router.replace(
      {
        pathname: router.pathname,
        query,
      },
      undefined,
      { shallow: true }
    );
  }, []);

  const handleSelect = useCallback((c: any) => {
    console.log(c);
    if (!c) {
      return;
    }
    /* const logIconClick = (icon: string) => {
      logAmplitudeEvent(AmplitudeEvents.ikonklikk, {
        ikon: icon,
      });
    };

    logIconClick(icon); */
    setSelectedColor(c);
    setOpen(true);
    setQuery(c.full_title.slice(2));
  }, []);

  const handleClose = () => {
    setOpen(false);
    setSelectedColor(null);

    const query = router.query;
    delete query["color"];

    router.replace(
      {
        pathname: router.pathname,
        query,
      },
      undefined,
      { shallow: true }
    );
  };

  useEffect(() => {
    Modal.setAppElement("#__next");

    router.query.color &&
      handleSelect(
        node.colors.find((x) => x.full_title === `--${router.query.color}`)
      );
  }, []);

  const SemanticTableRow = ({
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

  const GlobalTableRow = ({
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

  node.colors.sort(compare);

  return (
    <ScSection>
      {node?.description && <SanityBlockContent blocks={node?.description} />}
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
              <SemanticTableRow
                onClick={() => handleSelect(color)}
                prop={color}
                key={color._key}
              />
            ) : (
              <GlobalTableRow
                onClick={() => handleSelect(color)}
                prop={color}
                key={color._key}
              />
            )
          )}
        </Table.Body>
      </ScTable>
      <Modal open={open} onClose={() => handleClose()}>
        <Modal.Content>
          {selectedColor && <ColorModal color={selectedColor} />}
        </Modal.Content>
      </Modal>
    </ScSection>
  );
};

export default withErrorBoundary(ColorCategory, "Fargekategori");
