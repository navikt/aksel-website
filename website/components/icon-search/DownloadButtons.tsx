import { Download } from "@navikt/ds-icons";
import { Button, Heading, Loader, Popover } from "@navikt/ds-react";
import React, { useRef, useState } from "react";
import styled from "styled-components";
import { downloadAllSvg, downloadPngInSize } from "./downloads";

export const ScDownloadButtons = styled.div`
  display: flex;
  align-self: flex-end;
  gap: 1rem;
  margin-top: 0.5rem;
  margin-bottom: 2rem;
  width: 200px;

  > * {
    flex: 1 1;
  }
`;

const ScContent = styled(Popover.Content)`
  display: flex;
  gap: 0.5rem;
`;

const ScHeading = styled(Heading)`
  padding: 0.5rem 1rem;
  border-bottom: 1px solid var(--navds-semantic-color-border);
`;

export const ScButton = styled.button`
  background: none;
  border: none;
  display: flex;
  gap: 0.5rem;
  padding: 0;
  justify-self: center;
  justify-content: center;
  color: var(--navds-semantic-color-interaction-primary);
  padding: calc(0.75rem + 2px) 0.75rem;
  align-items: center;

  > svg {
    font-size: 1.25rem;
  }

  :hover {
    text-decoration: underline;
  }

  :focus {
    outline: none;
    color: var(--navds-semantic-color-text-inverted);
    background-color: var(--navds-semantic-color-focus);
  }
`;

const DownloadButtons = () => {
  const [isDownloadingSvg, setIsDownloadingSvg] = useState(false);
  const [isDownloadingPng, setIsDownloadingPng] = useState(false);
  const [openPopover, setOpenPopover] = useState(false);

  const buttonRef = useRef(null);

  const handleSvgDownload = async () => {
    if (isDownloadingSvg) return;
    setIsDownloadingSvg(true);
    await downloadAllSvg();
    setIsDownloadingSvg(false);
  };

  const handlePngDownload = async (size: number) => {
    setOpenPopover(false);
    if (isDownloadingPng) return;
    setIsDownloadingPng(true);
    await downloadPngInSize(size);
    setIsDownloadingPng(false);
  };

  return (
    <div>
      <Heading level="3" size="xsmall">
        Last ned alle ikoner
      </Heading>
      <ScDownloadButtons>
        <ScButton onClick={() => handleSvgDownload()}>
          {isDownloadingSvg ? (
            <>
              <Loader
                size="small"
                variant="interaction"
                title="Genererer fil for nedlastning"
              />
            </>
          ) : (
            <>
              <Download aria-label="Last ned alle ikoner i svg-format" />
              SVG
            </>
          )}
        </ScButton>
        <ScButton ref={buttonRef} onClick={() => setOpenPopover((x) => !x)}>
          {isDownloadingPng ? (
            <>
              <Loader
                size="small"
                variant="interaction"
                title="Genererer fil for nedlastning"
              />
            </>
          ) : (
            <>
              <Download aria-label="Last ned alle ikoner i png-format" />
              PNG
            </>
          )}
        </ScButton>

        <Popover
          anchorEl={buttonRef.current}
          open={openPopover && !isDownloadingPng}
          onClose={() => setOpenPopover(false)}
          placement="bottom"
        >
          <ScHeading size="xsmall" level="4">
            Størrelser
          </ScHeading>
          <ScContent>
            <Button onClick={() => handlePngDownload(16)}>16px</Button>
            <Button onClick={() => handlePngDownload(24)}>24px</Button>
            <Button onClick={() => handlePngDownload(128)}>128px</Button>
            <Button onClick={() => handlePngDownload(256)}>256px</Button>
          </ScContent>
        </Popover>
      </ScDownloadButtons>
    </div>
  );
};

export default DownloadButtons;
