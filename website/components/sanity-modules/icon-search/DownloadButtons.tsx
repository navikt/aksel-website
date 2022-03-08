import { Download } from "@navikt/ds-icons";
import { Button, Heading, Popover } from "@navikt/ds-react";
import React, { useRef, useState } from "react";
import { AmplitudeEvents, logAmplitudeEvent } from "../..";
import { downloadAllSvg, downloadPngInSize } from "./downloads";

const DownloadButtons = () => {
  const [isDownloadingSvg, setIsDownloadingSvg] = useState(false);
  const [isDownloadingPng, setIsDownloadingPng] = useState(false);
  const [openPopover, setOpenPopover] = useState(false);

  const buttonRef = useRef(null);

  const logDownload = (format) => {
    logAmplitudeEvent(AmplitudeEvents.ikonnedlastning, {
      all: true,
      format,
    });
  };

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
      <div className="mt-2 -ml-3">
        <Button
          variant="tertiary"
          onClick={() => {
            handleSvgDownload();
            logDownload("svg");
          }}
          loading={isDownloadingSvg}
        >
          <Download aria-label="Last ned alle ikoner i svg-format" />
          SVG
        </Button>
        <Button
          variant="tertiary"
          ref={buttonRef}
          onClick={() => setOpenPopover((x) => !x)}
          loading={isDownloadingPng}
        >
          <Download aria-label="Last ned alle ikoner i png-format" />
          PNG
        </Button>

        <Popover
          anchorEl={buttonRef.current}
          open={openPopover && !isDownloadingPng}
          onClose={() => setOpenPopover(false)}
          placement="bottom"
        >
          <Heading
            className="border-b border-solid border-border-muted py-2 px-4"
            size="xsmall"
            level="4"
          >
            Størrelser
          </Heading>
          <Popover.Content className="flex gap-2">
            <Button
              onClick={() => {
                handlePngDownload(16);
                logDownload("png");
              }}
            >
              16px
            </Button>
            <Button
              onClick={() => {
                handlePngDownload(24);
                logDownload("png");
              }}
            >
              24px
            </Button>
            <Button
              onClick={() => {
                handlePngDownload(128);
                logDownload("png");
              }}
            >
              128px
            </Button>
            <Button
              onClick={() => {
                handlePngDownload(256);
                logDownload("png");
              }}
            >
              256px
            </Button>
          </Popover.Content>
        </Popover>
      </div>
    </div>
  );
};

export default DownloadButtons;
