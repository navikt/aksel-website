import { BodyShort, Modal, Table } from "@navikt/ds-react";
import { useRouter } from "next/router";
import React, { useCallback, useEffect, useState } from "react";
import styled from "styled-components";
import { DsColorCategories } from "../../../lib/autogen-types";
import { SanityBlockContent } from "../../SanityBlockContent";
import { withErrorBoundary } from "../../website-features/error-boundary";
import ColorModal from "./modal/ColorModal";
import { GlobalTableRow, SemanticTableRow } from "./Rows";
import { compare } from "./sort";

const ScHeaderCell = styled(BodyShort)`
  color: var(--navds-semantic-color-text-muted);
`;

const ScSection = styled.div`
  margin-bottom: var(--navds-spacing-7);
`;

const ScTable = styled(Table)`
  table-layout: fixed;
`;

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

  const handlePageEntry = useCallback((c: any) => {
    if (!c) {
      return;
    }
    setSelectedColor(c);
    setOpen(true);
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
  }, []);

  useEffect(() => {
    router.query.color &&
      handlePageEntry(
        node.colors.find((x) => x.full_title === `--${router.query.color}`)
      );
  }, [router.query]);

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
