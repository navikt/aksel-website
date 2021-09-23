import { ExternalLink, Ruler, Sight } from "@navikt/ds-icons";
import React, { useContext } from "react";
import styled from "styled-components";
import { Button, CodeContext } from "./Code";

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
    tabs,
    showPreview,
    activeTab,
    setActiveTab,
    previews,
    setPreviews,
  } = useContext(CodeContext);

  return (
    <>
      <Tabs>
        <Ul role="tablist">
          {tabs.map((tab, i) => (
            <Li key={tab.content.toString()} role="presentation">
              <Button
                role="tab"
                className="navds-body-short navds-body--small"
                onClick={() =>
                  i === activeTab ? setActiveTab(-1) : setActiveTab(i)
                }
                aria-selected={i === activeTab}
              >
                {tab.name}
              </Button>
            </Li>
          ))}
        </Ul>

        <CopyWrapper>
          {showPreview && (
            <>
              <ToggleButton
                aria-selected={previews.ruler}
                onClick={() =>
                  setPreviews({
                    ...previews,
                    ruler: !previews.ruler,
                  })
                }
              >
                <span className="sr-only">Toggle ruler for kode-eksempel</span>
                <Ruler focusable="false" role="presentation" />
              </ToggleButton>
              <ToggleButton
                aria-selected={previews.outlines}
                onClick={() =>
                  setPreviews({
                    ...previews,
                    outlines: !previews.outlines,
                  })
                }
              >
                <span className="sr-only">
                  Toggle outlines for kode-eksempel
                </span>
                <Sight focusable="false" role="presentation" />
              </ToggleButton>
            </>
          )}
          {node.github && (
            <A className="navds-body-short navds-body--s" href={node.github}>
              Github <ExternalLink aria-label="Boks med pil ut ikon" />
            </A>
          )}
        </CopyWrapper>
      </Tabs>
    </>
  );
};

export default CodeTabs;
