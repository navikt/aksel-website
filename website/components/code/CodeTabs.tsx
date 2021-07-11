import { Copy, ExternalLink, Ruler, Sight } from "@navikt/ds-icons";
import React, { useContext, useRef } from "react";
import styled from "styled-components";
import { Button, CodeContext, copyCode, StyledPopover } from "./Code";

const Tabs = styled.div`
  border-bottom: 1px solid var(--navds-color-gray-60);
  background-color: var(--navds-color-darkgray);
  padding: 1px 1px 0 1px;
  width: calc(100% - 2px);
  display: flex;
  justify-content: space-between;
`;

const Ul = styled.ul`
  padding: 0;
  margin: 0;
  display: flex;
`;

const Li = styled.li`
  list-style: none;
`;

const A = styled.a`
  color: rgba(255, 255, 255, 0.85);
  padding: 0.75rem 0.5rem;
  display: flex;
  align-items: center;
  column-gap: 0.5rem;
  text-decoration: none;

  :hover {
    background-color: rgba(255, 255, 255, 0.15);
    text-decoration: underline;
  }

  :focus {
    outline: 2px solid white;
    outline-offset: -2px;
    text-decoration: underline;
  }
`;

const CopyWrapper = styled.div`
  display: flex;
`;

const ToggleButton = styled.button`
  border: none;
  color: rgba(255, 255, 255, 0.85);
  padding: 0.75rem 0.75rem;
  display: flex;
  align-items: center;
  column-gap: 0.5rem;
  background-color: transparent;

  :hover {
    background-color: rgba(255, 255, 255, 0.15);
  }

  :focus {
    outline: 2px solid white;
    outline-offset: -2px;
  }

  &[aria-selected="true"] {
    box-shadow: inset 0 -4px 0 0 white;
    color: white;
  }
`;

const CodeTabs = (): JSX.Element => {
  const {
    node,
    tabs: tmpTabs,
    previewToggles: tmpPreviewToggles,
    popover: tmpPopover,
  } = useContext(CodeContext);
  const [tabs, setTabs] = tmpTabs;
  const [previewToggles, setPreviewToggles] = tmpPreviewToggles;
  const [popover, setPopover] = tmpPopover;
  const buttonRef = useRef(null);

  const handleTab = (tab) => {
    const newTabs = [...tabs];
    newTabs[tab].active = true;
    setTabs([...newTabs]);
  };

  const handleCopy = (text: string) => {
    copyCode(text);
    setPopover(true);
  };

  const toggleRuler = () => {
    setPreviewToggles({
      ...previewToggles,
      ruler: !previewToggles.ruler,
    });
  };

  const toggleOutline = () => {
    setPreviewToggles({
      ...previewToggles,
      outline: !previewToggles.outline,
    });
  };

  return (
    <>
      <Tabs>
        <Ul role="tablist">
          {tabs.map((tab, i) => (
            <Li key={tab.title} role="presentation">
              <Button
                role="tab"
                className="navds-body-short navds-body--s"
                onClick={() => handleTab(i)}
                aria-selected={tab.active}
              >
                {tab.title}
              </Button>
            </Li>
          ))}
        </Ul>

        <CopyWrapper>
          <ToggleButton
            aria-selected={previewToggles.ruler}
            onClick={toggleRuler}
          >
            <span className="sr-only">Toggle ruler for kode-eksempel</span>
            <Ruler focusable="false" role="presentation" />
          </ToggleButton>
          <ToggleButton
            aria-selected={previewToggles.outline}
            onClick={toggleOutline}
          >
            <span className="sr-only">Toggle outlines for kode-eksempel</span>
            <Sight focusable="false" role="presentation" />
          </ToggleButton>
          {node.github && (
            <A className="navds-body-short navds-body--s" href={node.github}>
              Github <ExternalLink aria-label="Boks med pil ut ikon" />
            </A>
          )}
          <Button
            ref={(node) => (buttonRef.current = node)}
            className="navds-body-short navds-body--s"
            onClick={() =>
              handleCopy(
                node.tabs[tabs.find((tab) => tab.active).index].example.code
              )
            }
          >
            Copy
            <Copy focusable="false" role="presentation" />
          </Button>
        </CopyWrapper>
      </Tabs>

      <StyledPopover
        role="alert"
        aria-atomic="true"
        anchorEl={buttonRef.current}
        open={popover}
        onClose={() => setPopover(false)}
        placement="right"
        arrow={false}
      >
        Kopiert
      </StyledPopover>
    </>
  );
};

export default CodeTabs;
