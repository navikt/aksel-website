import { BodyShort, Modal, Table } from "@navikt/ds-react";
import { useRouter } from "next/router";
import React, { useCallback, useEffect, useState } from "react";
import styled from "styled-components";
import { AmplitudeEvents, OverflowDetector, useAmplitude } from "../..";
import { DsColorCategories } from "../../../lib";
import { SanityBlockContent } from "../../SanityBlockContent";
import { withErrorBoundary } from "../../ErrorBoundary";
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
  min-width: 400px;
`;

const ScGlobalWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const ColorCategory = ({ node }: { node: DsColorCategories }): JSX.Element => {
  const [open, setOpen] = useState(false);
  const [selectedColor, setSelectedColor] = useState<any>(null);
  const router = useRouter();
  const { logAmplitudeEvent } = useAmplitude();

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

  const logColorClick = useCallback((c: any) => {
    logAmplitudeEvent(AmplitudeEvents.fargeklikk, {
      farge: c.full_title,
    });
  }, []);

  const handleSelect = useCallback(
    (c: any) => {
      if (!c) {
        return;
      }

      logColorClick(c);
      setSelectedColor(c);
      setOpen(true);
      setQuery(c.full_title.slice(2));
    },
    [logColorClick]
  );

  const handlePageEntry = useCallback(
    (c: any) => {
      if (!c) {
        return;
      }
      setSelectedColor(c);
      setOpen(true);
    },
    [logColorClick]
  );

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
      {node.colors[0].color_type === "global" ? (
        <ScGlobalWrapper className="w-auto max-w-[calc(var(--text-max-width)-2rem)] rounded shadow-[0_0_0_1px] shadow-border-muted">
          {node.colors?.map((color, i) => (
            <GlobalTableRow
              onClick={() => handleSelect(color)}
              prop={color}
              key={color._key}
              first={i === 0}
              last={i === node.colors.length - 1}
            />
          ))}
        </ScGlobalWrapper>
      ) : (
        <OverflowDetector>
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
              {node.colors?.map((color) => (
                <SemanticTableRow
                  onClick={() => handleSelect(color)}
                  prop={color}
                  key={color._key}
                />
              ))}
            </Table.Body>
          </ScTable>
        </OverflowDetector>
      )}
      <Modal open={open} onClose={() => handleClose()}>
        <Modal.Content>
          {selectedColor && <ColorModal color={selectedColor} />}
        </Modal.Content>
      </Modal>
    </ScSection>
  );
};

export default withErrorBoundary(ColorCategory, "Fargekategori");
